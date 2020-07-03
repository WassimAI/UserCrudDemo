using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using userCrudDemo.API.Models;

namespace userCrudDemo.API.Data
{
    public class Seed
    {
        public static void SeedUsers(DataContext context)
        {
            if(!context.Visitors.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/VisitorSeedData.json");
                var visitors = JsonConvert.DeserializeObject<List<Visitor>>(userData);
                foreach(var visitor in visitors)
                {
                    byte[] passwordHash, passwordSalt;
                    CreatePasswordHash("password", out passwordHash, out passwordSalt);

                    visitor.PasswordHash = passwordHash;
                    visitor.PasswordSalt = passwordSalt;
                    context.Visitors.Add(visitor);
                }

                context.SaveChanges();
            }
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
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