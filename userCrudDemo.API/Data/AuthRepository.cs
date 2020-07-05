using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using userCrudDemo.API.Models;

namespace userCrudDemo.API.Data
{
    public class AuthRepository : IAuth
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context = context;

        }
        public Task<Visitor> Login(string email, string password)
        {
            throw new System.NotImplementedException();
        }

        public async Task<Visitor> Register(Visitor visitor, string password)
        {
            byte[] passwordHash, passwordSalt;
            createPasswordHash(password, out passwordHash, out passwordSalt);

            visitor.PasswordHash = passwordHash;
            visitor.PasswordSalt = passwordSalt;

            await _context.Visitors.AddAsync(visitor);
            await _context.SaveChangesAsync();

            return visitor;

        }

        public async Task<bool> UserExists(string email)
        {
            if(await _context.Visitors.AnyAsync(x=>x.Email==email))
            {
                return true;
            }

            return false;
        }

        private void createPasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            //The salt here is like a key to the hash
            using(var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }            
        }
    }
}