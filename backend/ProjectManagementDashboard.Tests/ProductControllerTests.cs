using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectManagementDashboard.Context;
using ProjectManagementDashboard.Controllers;
using ProjectManagementDashboard.Models;

namespace ProjectManagementDashboard.Tests;

public class ProductsControllerTests
{
    private readonly DbContextOptions<ProductContext> _options;

    public ProductsControllerTests()
    {
        _options = new DbContextOptionsBuilder<ProductContext>()
            .UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;
    }

    [Fact]
    public void Get_ReturnsAllProducts()
    {
        using (var context = new ProductContext(_options))
        {
            var moqProduct1 = new Product
            {
                ProductCode = "JITET",
                Name = "White top",
                Category = Enums.ProductCategory.Clothes,
                Price = 2.3M,
                StockQuantity = 108,
                DateAdded = DateTime.Now 
            };

            var moqProduct2 = new Product
            {
                ProductCode = "99ABS",
                Name = "Phone Charger",
                Category = Enums.ProductCategory.Electronics,
                Price = 12.95M,
                StockQuantity = 1070,
                DateAdded = DateTime.Now
            };

            context.Products.Add(moqProduct1);
            context.Products.Add(moqProduct2);
            context.SaveChanges();

            var controller = new ProductsController(context);
            var result = controller.Get();

            var actionResult = Assert.IsType<ActionResult<IEnumerable<Product>>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var products = Assert.IsAssignableFrom<IEnumerable<Product>>(okResult.Value);
            Assert.Equal(2, products.Count());
        }
    }

    [Fact]
    public void RegisterProduct_ValidProduct_ReturnsOk()
    {
        using (var context = new ProductContext(_options))
        {
            var controller = new ProductsController(context);
            var productToRegister = new Product
            {
                ProductCode = "8897",
                Name = "White top",
                Category = Enums.ProductCategory.Clothes,
                Price = 2.3M,
                StockQuantity = 108,
                DateAdded = DateTime.Now
            };

            var result = controller.RegisterProduct(productToRegister);

            var actionResult = Assert.IsType<ActionResult<Product>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var registeredProduct = Assert.IsType<Product>(okResult.Value);
            Assert.Equal("White top", registeredProduct.Name);
            Assert.Equal(108, registeredProduct.StockQuantity);
            Assert.True(registeredProduct.DateAdded > DateTime.MinValue);
        }
    }

    [Fact]
    public void RegisterProduct_InvalidProduct_ReturnsBadRequest()
    {
        using (var context = new ProductContext(_options))
        {
            var controller = new ProductsController(context);
            var productToRegister = new Product
            {
                ProductCode = "KSOFD",
                Category = Enums.ProductCategory.Household,
                Price = 2.0M,
                StockQuantity = 19908,
                DateAdded = DateTime.Now
            };
            controller.ModelState.AddModelError("Name", "Required");

            var result = controller.RegisterProduct(productToRegister);

            Assert.IsType<BadRequestResult>(result.Result);
        }
    }
}