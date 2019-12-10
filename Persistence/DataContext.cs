using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        //below notice how the DataContext Constructor inherits from the base DbContext by using the syntax : base(options)
        public DataContext(DbContextOptions<DataContext> options) : base(options) 
        {
        }

        //You are basically setting up a property that will make the connection to the class object you are mapping to in the Domain. Make sure you reference this in your using statement at the top. 
        public DbSet<Snip> Snips { get; set; }

        public DbSet<Value> values {get; set;}

        //we now can use entity framework to query this in our database.

        //Be sure to add this as a service to the startup class (dependency injection) in the ConfigureServices container
    
        //the method below shows how to seed data. We create a method using the .HasData method in the ModelBuilder class that seeds the data
        protected override void OnModelCreating(ModelBuilder builder) //we are overriding the methods inherited from the DbContext method
        {
            builder.Entity<Value>()
                .HasData(
                    new Value {Id = 1, Name = "Value 101"},
                    new Value {Id = 2, Name = "Value 102"},
                    new Value {Id = 3, Name = "Value 103"}
                );
        }
    }
}
