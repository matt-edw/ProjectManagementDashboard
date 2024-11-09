using ProjectManagementDashboard.Enums;
using System.ComponentModel.DataAnnotations;

namespace ProjectManagementDashboard.Models;

public class Product
{
    [Key]
    public string ProductCode { get; set; }
    public string Name { get; set; }
    public ProductCategory Category { get; set; }
    public decimal Price { get; set; }
    public int StockQuantity { get; set; }
    public DateTime? DateAdded { get; set; }
}
