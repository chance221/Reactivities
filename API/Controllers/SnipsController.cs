using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Snips;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    /*
    Every API controller need a couple of things
    1) It requires a route
    2) It needs an API attribute
    3)It needs to derive from MVC controller base class

    Notice a couple of things about this file. Though it inherits from the MVC patterning we will only use it to access the controller
    base class. This is because it does not handle any views, we only take the part ov MVC patterning to implement our controller IT WILL ONLY
    OPERATE AS AN API.
    */

    [Route("api/[controller]")]
    [ApiController]
    public class SnipsController : ControllerBase
    {
        //we now need to impliment the controllers methods by pulling in the request from the handler. In this case we are using mediatR
        //Because we are using emdiatR we need to create a field that holds that object, then pass it into each method that will use the handler
        private readonly IMediator _mediator;
        public SnipsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Snip>>> List()
        {
            return await _mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Snip>> Details(Guid id)
        {
            return await _mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await _mediator.Send(new Delete.Command{Id = id});
        }

    }
}