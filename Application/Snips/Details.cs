using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Snips
{
    public class Details
    {
        //In this case the query class object does need some information in it as it will require the ID to form the query
        public class Query : IRequest<Snip>
        {
            public Guid Id { get; set; }
        }

        //We then pass the Query Object to the handler. We create a field to hold the context. The context can then be passed to the 
        //handler constructor, wihch is setting the field value equal to the DataContext. That data context is then used in the Handle
        //method that accepts the Query object(that houses the id). It then makes the connection to the database via _context, then runs
        //the FindAsync method that looks for the id that was in the query
        public class Handler : IRequestHandler<Query, Snip>
        {
            private readonly DataContext _context;
            
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Snip> Handle(Query request, CancellationToken cancellationToken)
            {
                var snip = await _context.Snips.FindAsync(request.Id);
                return snip;
            }
        }
    }
}