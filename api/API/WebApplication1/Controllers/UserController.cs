using Database;
using Database.Database;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System;
using WebApplication1.Models;
using Microsoft.AspNetCore.Authorization;

namespace WebApplication1.Controllers
{
    public class UserController : Controller
    {
        private DataContext dbContext = new DataContext();
        [HttpGet("/getUsers")]
        public async Task<ActionResult<List<User>>> GetAllUsers()
        {
            
            return Ok(await dbContext.Users.ToListAsync());
        }

        [HttpGet("/getUserDataByEmail")]
        public async Task<ActionResult<User>> GetUserDataByEmail(string email)
        {
            var user = dbContext.Users.FirstOrDefault(u => u.Email == email);
            return Ok(user);
        }

        [HttpPost("/CreateUser")]
        public async Task<ActionResult> CreateUser([FromBody]RegForm user)
        {
            Console.WriteLine(user.Name, user.Email);
            User _user = new User();
            _user.Email = user.Email;
            _user.SurName = user.SurName;
            _user.Name = user.Name;
            _user.Password = user.Password;
            _user.LastName = user.LastName;
            _user.Id = Guid.NewGuid();
            await dbContext.Users.AddAsync(_user);
            await dbContext.SaveChangesAsync();
            return Ok();
        }
        [HttpPost("/Login")]
        public async Task<ActionResult> Login([FromBody]LoginForm loginData)
        {
            User user = await dbContext.Users.FirstOrDefaultAsync(u => u.Email == loginData.Email && u.Password == loginData.Password);
            if (user == null) { Console.WriteLine(user); return Ok("unauthorized"); }

            var claims = new List<Claim> { new Claim(ClaimTypes.Name, user.Email) };
            var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                claims: claims,
                expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(2)),  // действие токена истекает через 2 минуты
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            var response = new
            {
                access_token = encodedJwt,
                username = user.Email
            };
            Console.WriteLine(response);

            return Ok(response);
        }

        [HttpGet("/Encrypt")]
        public async Task<ActionResult> Encrypt([FromQuery]string data)
        {
            return Ok(Crypt.Encrypt(data));
        }
[HttpGet("/Decrypt")]
        public async Task<ActionResult> Decrypt([FromQuery]string data)
        {
            return Ok(Crypt.Decrypt(data));
        }

        [HttpGet("/Auth")]
        [Authorize]
        public async Task<ActionResult> Auth()
        {
            return Ok();
        }
        
        
        [HttpPost("Orders/")]
        //[Authorize]
        public async Task<ActionResult<int>> Orders([FromBody] GetOrders email)
        {
            List<OrderWithPrice> orders = new List<OrderWithPrice>();
                var dbOrders = (await dbContext.Orders.FirstOrDefaultAsync(o => o.User.Email == email.Email && email.PriceId ==o.PriceId));
            if (dbOrders != null)
            {
                var quantity = new Quantity();
                quantity.q = dbOrders.Quantity;

                return Ok(quantity);
            }

            else return Ok();
        }
        [HttpPost("AllOrders/")]
        //[Authorize]
        public async Task<ActionResult<List<Order>>> AllOrders([FromBody] EmailOnly email)
        {
            List<Order> orders = await dbContext.Orders.Where(o => o.User.Email == email.Email).ToListAsync();
            List<OrderRequest> ordersRequest = new List<OrderRequest>();
            

            if (orders != null)
            {
                for (int i = 0; i < orders.Count; i++)
                {

                    var tour = await dbContext.Tours.FirstOrDefaultAsync(t => t.Id == orders[i].Price.TourId);
                    var request = new OrderRequest();
                    request.Tour = tour;
                    request.Quantity = orders[i].Quantity;
                    request.Price = orders[i].Price;
                    ordersRequest.Add(request);
                    
                }
                return Ok(ordersRequest);
            }

            else return Ok();
        }
        [HttpPost("AddToTray/")]
        public ActionResult AddToTray([FromBody] AddOrder order )
        {
            var Order = dbContext.Orders.FirstOrDefault(o => o.PriceId == order.PriceId && o.User.Email ==order.email);
            if (Order == null)
            {
                var newOrder = new Order();
                newOrder.Status = "Prepare";
                newOrder.Quantity = 1;
                newOrder.PriceId = order.PriceId;
                newOrder.User = dbContext.Users.FirstOrDefault(u => u.Email == order.email);
                dbContext.Orders.Add(newOrder);
            }
            else
            {
                Order.Quantity++;
            }
            dbContext.SaveChanges();
            return Ok(); 
        }
        [HttpPost("DeleteOrder/")]
        public async Task<ActionResult> DeleteOrder([FromBody] AddOrder order)
        {
            var Order = await dbContext.Orders.FirstOrDefaultAsync(o => o.PriceId == order.PriceId && o.User.Email == order.email && o.Status == "Prepare");
            if (Order != null)
            {
                    dbContext.Orders.Remove(Order);
                    await dbContext.SaveChangesAsync();
            }
            return Ok();
        }
        [HttpPost("ChangeQuantity/")]
        public async Task<ActionResult> ChangeQuantity([FromBody]ChangeQuantity changeQuantity)
        {
            var Order = await dbContext.Orders.FirstOrDefaultAsync(a => a.User.Email == changeQuantity.email && a.PriceId == changeQuantity.PriceId && a.Status=="Prepare");
            if(Order == null)
            {
                Order = new Order();
                Order.PriceId= changeQuantity.PriceId;
                Order.User = await dbContext.Users.FirstOrDefaultAsync(x => x.Email == changeQuantity.email);
                Order.Quantity = changeQuantity.quantity;
                Order.Status = "Prepare";
            }
            Order.Quantity = changeQuantity.quantity;
            if (changeQuantity.quantity == 0)
            {
                dbContext.Orders.Remove(Order);
            }
            else
            {
                Order.Quantity = changeQuantity.quantity;
            }

            await dbContext.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("OrdersCost/")]
        public async Task<ActionResult<int>> GetOrdersSum([FromBody]EmailOnly email)
        {
           
            var orders = await dbContext.Orders.Where(o => o.User.Email == email.Email).ToListAsync();
            int sum = 0;
            foreach (var order in orders)
            {
                Console.WriteLine(order.Quantity);
                sum += (order.Quantity) * order.Price.Cost;
            }
            return sum;
        }
        [HttpPost("SendFeedback/")]
        public async Task<ActionResult> SendFeedback([FromBody] FeedbackQuery qFeedback)
        {
            Feedback feedback = new Feedback();
            feedback.User = await dbContext.Users.FirstOrDefaultAsync(u => u.Email == qFeedback.Email); 
            feedback.Content = qFeedback.Content;
            dbContext.Feedbacks.Add(feedback);
            await dbContext.SaveChangesAsync();
            return Ok();
        }
        [HttpPost("SumOrder/")]
        public async Task<ActionResult<int>> SumOrder([FromBody]EmailOnly email)
        {
            var orders = await dbContext.Orders.Where(o => o.User.Email == email.Email).ToListAsync();
            int sum = 0;
            foreach (var order in orders)
            {
                sum += (order.Quantity);
            }
            return Ok(sum);
        }

    }
}
