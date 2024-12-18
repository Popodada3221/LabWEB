using Database.Database;

namespace WebApplication1.Models
{
    
    public class OrderWithPrice
    {
        public Price Price { get; set; }
        public int Quantity { get; set; }
    }
}
