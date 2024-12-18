using Database;
using Database.Database;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MainController : ControllerBase
    {
        private DataContext dbContext = new DataContext();
                        
       

        private readonly ILogger<MainController> _logger;

        [EnableCors("AllowPolicy")]
        [HttpGet("/GetAllTours")]
        public async Task<ActionResult< List<Tour>>> GetTours()
        {
            return Ok(await dbContext.Tours.ToListAsync());
        }

        [HttpGet("/ClearDB")]
        public ActionResult ReCreateDatabase()
        {
            dbContext.Database.EnsureDeleted();
            dbContext.Database.EnsureCreated();
            return Ok();
        }

        [HttpPost("/AddTour")]
        public async Task<ActionResult> AddTour(string name, string imagePath, string location, string description, string cathegory)
        {
Tour tour = new Tour();
            tour.Id = Guid.NewGuid();
            tour.Name = name;
            tour.ImagePath = imagePath;
            tour.Location = location;
            tour.Description = description;
                tour.Cathegory = cathegory;
           await dbContext.Tours.AddAsync(tour);
                await dbContext.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("/AddPrice")]
        public async Task<ActionResult> AddPrice(Guid tourId, string type, int cost, string date, int duration)
        {
            Price price = new Price();
            price.Id = Guid.NewGuid();
            price.TourId = tourId;
            price.Type = type;
            price.Cost = cost;
            price.Date = date;
            price.Duration = duration;
            await dbContext.Prices.AddAsync(price);
            await dbContext.SaveChangesAsync();

            return Ok();
        }

        public MainController(ILogger<MainController> logger)
        {
            _logger = logger;
        }

        [HttpGet("/get{Id}")]
        public async Task<ActionResult<List<Tour>>> GetTourById(Guid Id)
        {
            return Ok(await dbContext.Tours.FirstOrDefaultAsync(t => t.Id == Id));
        }
        [HttpGet("/GetAllToursWithPrices")]
        public async Task<ActionResult<List<TourWithPrices>>> GetAllToursWithPrices()
        {
            List<TourWithPrices> toursWithPrices = new List<TourWithPrices>();

            var tours = await dbContext.Tours.ToListAsync();

            foreach (var item in tours) { 
                var tourWithPrices = new TourWithPrices();
                tourWithPrices.Id = item.Id;
                tourWithPrices.Name = item.Name;
                tourWithPrices.ImagePath = item.ImagePath;
                tourWithPrices.Location = item.Location;
                tourWithPrices.Description = item.Description;
                tourWithPrices.Cathegory = item.Cathegory;
                tourWithPrices.Prices = await dbContext.Prices.Where(x => x.TourId == item.Id).ToListAsync();
                toursWithPrices.Add(tourWithPrices);
            }

            return toursWithPrices;
        }

    }
}
