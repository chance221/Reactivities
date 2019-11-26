using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Snips
{
    public class List
    {
        /*MediatR will handle the queries so we need for first create a class that inherits from its request methods
        We are doing this below. The query class handles sending queries. The Handler Class will handle responses
        
        Break it down like this. In the query class we need to say what we are requesting. In the case below we are requesting a 
        list of Snips. In the request handler Handler it is inheriting all methods from the MediatR library housed in IRequestHandler 
        method. The Handler needs the query that was made, and what is expected back. In this case a list of snips. 

        We impliment the interface by creating a task. All info from the query is included in ther request object. 

        
        */
        public class Query : IRequest<List<Snip>> { }

        public class Handler : IRequestHandler<Query, List<Snip>>
        {
            //We also need to pass in the data context. This is done with a class constructor. We create a field that instantiates the data context
            //We also need to create a class constructor that reference the context field. 
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            //We impliment the interface by creating a task. All info from the query is included in ther request object.As this is a
            //request that handles API calls we must make this method async
            public async Task<List<Snip>> Handle(Query request, CancellationToken cancellationToken)
            {
                var snips = await _context.Snips.ToListAsync();

                return snips;
            }
        }
    }
}