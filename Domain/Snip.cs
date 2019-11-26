using System;

namespace Domain
{
    //When you want to create a class that maps using entity framework you first need to define the properties of the object.
    public class Snip
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Language { get; set; }
        public string Code { get; set; }
    }

    /*You can now go to the DataContext.cs file under the Persistence folder to create the context that will map tese properties
    into a table
    */
}