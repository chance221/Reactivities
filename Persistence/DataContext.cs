using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        //beliw notice how the DataContext Constructor inherits from the base DbContext by using the syntax : base(options)
        public DataContext(DbContextOptions options) : base(options) 
        {
        }

        //You are basically setting up a property that will make the connection to the class object you are mapping to in the Domain. Make sure you reference this in your using statement at the top. 
        public DbSet<Value> values { get; set; }

        //we now can use entity framework to query this in our database.

        //Be sure to add this as a service to the startup class (dependency injection) in the ConfigureServices container
    }
}
