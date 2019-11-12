using System;

namespace Domain
{
    public class Snip
    {
      public Guid Id { get; set; }  
      public string Title { get; set; }
      public string Description { get; set; }
      public DateTime Date { get; set; }
      public string Language { get; set; }
      public bool Public { get; set; }
    }
}