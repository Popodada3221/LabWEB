using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Database
{
    public class Order
    {
    
        public Guid UserId { get; set; }
        public virtual User? User { get; set; }
        public Guid PriceId { get; set; }
        public virtual Price? Price { get; set; }
        public int Quantity { get; set; }
        public string Status { get; set; }
    }
}
