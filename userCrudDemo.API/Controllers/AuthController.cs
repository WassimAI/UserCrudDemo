using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
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
        private readonly IConfiguration _config;
        public AuthController(DataContext context, IAuth repo, IMapper mapper, IConfiguration config)
        {
            _config = config;
            _repo = repo;
            _mapper = mapper;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(VisitorForRegisterDto visitorForRegisterDto)
        {
            if (await _repo.UserExists(visitorForRegisterDto.Email))
            {
                return BadRequest("User already exists");
            }

            var visitorToCreate = new Visitor
            {
                Email = visitorForRegisterDto.Email,
                Country = visitorForRegisterDto.Country,
                City = visitorForRegisterDto.City,
                LastActive = DateTime.Now
            };

            var createdVisitor = await _repo.Register(visitorToCreate, visitorForRegisterDto.Password);

            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(VisitorForLoginDto visitorForLoginDto)
        {
            var visitor = await _repo.Login(visitorForLoginDto.Email, visitorForLoginDto.Password);
            if (visitor == null)
            {
                return BadRequest("User not found or Login details are wrong");
            }

            visitor.LastActive = DateTime.Now;
            await _context.SaveChangesAsync();

            //Token Building
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, visitor.Id.ToString()),
                new Claim(ClaimTypes.Name, visitor.Email)
            };

            // Get key from app settings
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            //Creatung signing in creds
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            //Create token descriptor
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddMinutes(30),
                SigningCredentials = creds
            };

            //token handler
            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new 
                {
                    token = tokenHandler.WriteToken(token)
                });

        }
    }
}