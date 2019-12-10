using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence
{
    //When it comes to related data we can seed data alot more efficiently by creating a list of Snips and then importing that list into
    //the database. 
    public class Seed
    {
        public static void SeedData(DataContext context)
        {   
            //If ther are no snips in Activities
            if(!context.Snips.Any())
            {
                var snips = new List<Snip>
                {
                    new Snip
                    {
                        Title = "My First Snip",
                        Description = "A little code to keep to myself",
                        Category = "Random Number Generation",
                        Language = "JavaScript",
                        Code = "Random rnd = new Randomm();",
                    },
                    new Snip
                    {
                        Title = "Another Snip",
                        Description = "Code to remember me by",
                        Category = "Front End Deveopment",
                        Language = "JavaScript",
                        Code = "jQuery sucks!",
                    },
                    new Snip
                    {
                        Title = "My Tird Snip",
                        Description = "Code is as code does",
                        Category = "Desktop Development",
                        Language = "C#",
                        Code = "Snip Snip",
                    },
                    new Snip
                    {
                        Title = "My Fourth Snip",
                        Description = "Code code CODE",
                        Category = "MDNS",
                        Language = "HTML",
                        Code = "function treasure() {code goes here}",
                    },
                    new Snip
                    {
                        Title = "The FINAL SNIP",
                        Description = "This is the last of the seed data",
                        Category = "FullStack Development",
                        Language = "JavaScript",
                        Code = "This is the code for the practice"
                    }
                };

                context.Snips.AddRange(snips);
                context.SaveChanges();
            }
        }
    }
}