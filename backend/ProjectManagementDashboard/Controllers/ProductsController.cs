using Microsoft.AspNetCore.Mvc;
using ProjectManagementDashboard.Context;
using ProjectManagementDashboard.Models;

namespace ProjectManagementDashboard.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController(ProductContext context) : ControllerBase
{
    [HttpGet]
    public ActionResult<IEnumerable<Product>> Get()
    {
        var products = context.Products;
        return Ok(products);
    }

    [HttpPost]
    public ActionResult<Product> RegisterProduct([FromBody] Product productToRegister)
    {
        if (!ModelState.IsValid || productToRegister == null)
        {
            return BadRequest();
        }

        var currentDate = DateTime.Now;
        var product = productToRegister;
        product.DateAdded = currentDate;

        context.Products.Add(product);
        context.SaveChanges();
        return Ok(product);
    }
}