using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using userCrudDemo.API.Data;
using userCrudDemo.API.Dtos;

namespace userCrudDemo.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class VisitorController : ControllerBase
    {
        private readonly IVisitors _repo;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public VisitorController(DataContext context, IVisitors repo, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            _repo = repo;
        }

        public async Task<IActionResult> GetAll()
        {
            //throw new System.Exception("The Shit has hit the fan");
            var visitors = await _repo.GetAll();
            var listToReturn = _mapper.Map<IEnumerable<VisitorForListDto>>(visitors);

            return Ok(listToReturn);
        }

        [HttpGet("{id}", Name="GetVisitor")]
        public async Task<IActionResult> GetVisitor(int id)
        {
            var visitor = await _repo.GetVisitor(id);
            var visitorToReturn = _mapper.Map<VisitorForListDto>(visitor);
            //throw new System.Exception("NO!");
            return Ok(visitorToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVisitor(int id, VisitorForUpdateDto visitorForUpdateDto)
        {
            if(id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var visitorFromRepo = await _repo.GetVisitor(id);
            _mapper.Map(visitorForUpdateDto, visitorFromRepo);
            
            if(await _repo.SaveAll())
            {
                return NoContent();
            }

            throw new System.Exception("Problem While updating data");
        }
    }
}