using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Database.Database;
using Microsoft.EntityFrameworkCore;

namespace Database
{
    public class DataContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=pegast;Username=postgres;Password=admin").UseLazyLoadingProxies();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Tour>().HasKey(t => t.Id);
            modelBuilder.Entity<User>().HasKey(t => t.Id);
            modelBuilder.Entity<Order>().HasKey(t => new { t.UserId, t.PriceId });
            modelBuilder.Entity<Price>().HasKey(t => t.Id);
            modelBuilder.Entity<Feedback>().HasKey(t => t.Id);
        }

        public DbSet<Tour> Tours { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Price> Prices { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
    }
}
