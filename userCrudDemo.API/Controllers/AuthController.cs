using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using userCrudDemo.API.Data;
using userCrudDemo.API.Dtos;
using userCrudDemo.API.Models;

namespace userCrudDemo.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IAuth _repo;
        public AuthController(DataContext context, IAuth repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(VisitorForRegisterDto visitorForRegisterDto)
        {
            if(await _repo.UserExists(visitorForRegisterDto.Email))
            {
                return BadRequest("User already exists");
            }

            var visitorToCreate = new Visitor {
                Email = visitorForRegisterDto.Email,
                Country = visitorForRegisterDto.Country,
                City = visitorForRegisterDto.City,
                LastActive = DateTime.Now
            };

            var createdVisitor = await _repo.Register(visitorToCreate, visitorForRegisterDto.Password);

            return StatusCode(201);
        }
    }
}