using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Persistence;

namespace API
{

    /*
        I had to change it around to make it work for my version of dotnet core
        
        Here is where I found the code https://stackoverflow.com/questions/57745481/unable-to-create-an-object-of-type-mycontext-for-the-different-patterns-suppo
        
        Also had to add a reference to Microsoft.EntityFrameworkCore.Design to the API project 
    */
    public class Program
    {
        public static void Main(string[] args)
        {   /*Create a variable that holds the host. We dont need to build it here as we 
            are building it using the IWebHost interface and why build is commented out*/
            var host = BuildWebHost(args);

           // WebHostBuilder now need to include the Dependency injection to create the scope. We need to import Microsoft.Extensions.DependencyInjection
            using(var scope = host.Services.CreateScope())
            {
                //we now need to define the service for our scope
                var services = scope.ServiceProvider;
                
                //we now use a try catch block to attempt to get our connection to our database context and then migrate our database
                try
                {
                    var context = services.GetRequiredService<DataContext>();

                    /*
                        this imports any required migrations to the database. If there is no databse, this creates one based off of the migrations file created when we ran
                        dotnet ef migrations add InitialCreate -p Persistence/ -s API 
                     */
                    context.Database.Migrate();
                    Seed.SeedData(context);
                }
                catch(Exception ex) //if something goes wrong with the try block do this. 
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred during migration");
                }
            }

            host.Run(); 
        }

        
        public static IWebHost BuildWebHost(string[] args) =>
        WebHost.CreateDefaultBuilder(args)
            .UseStartup<Startup>()
            .Build();

        

    }
}
