using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Database
{
    public class Price
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public Guid Id { get; set; }
        public Guid TourId { get; set; }
        public string Type { get; set; }
        public int Cost { get; set; }
        public string Date { get; set; }
        public int Duration { get; set; }
    }
}
