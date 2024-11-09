using Microsoft.EntityFrameworkCore;
using ProjectManagementDashboard.Models;

namespace ProjectManagementDashboard.Context;

public class ProductContext : DbContext
{
    public ProductContext(DbContextOptions<ProductContext> options) : base(options) { }

    public DbSet<Product> Products { get; set; }
}
