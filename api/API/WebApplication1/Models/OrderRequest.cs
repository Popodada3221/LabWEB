using Database.Database;

namespace WebApplication1.Models
{
    public class OrderRequest
    {
        public Price Price { get; set; }
        public int Quantity { get; set; }
        public Tour Tour { get; set; }
    }
}
