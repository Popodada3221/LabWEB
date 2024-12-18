using Database.Database;
using System.Net;

namespace WebApplication1.Models
{
    public class TourWithPrices
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string ImagePath { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public string Cathegory { get; set; }
        
        public List<Price> Prices { get; set; }

    }
}
