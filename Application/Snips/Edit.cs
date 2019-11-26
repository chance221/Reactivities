using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Snips
{
    public class Edit
    {
        
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public string Language { get; set; }
            public string Code { get; set; }

        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                //handler logic
                var snip = await _context.Snips.FindAsync(request.Id);

                if(snip == null)
                {
                    throw new Exception("Could not find activity");
                }

                snip.Title = request.Title ?? snip.Title;
                snip.Description = request.Description ?? snip.Description;
                snip.Category = request.Category ?? snip.Category;
                snip.Language = request.Language ?? snip.Language;
                snip.Code = request.Code ?? snip.Code;


                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}
