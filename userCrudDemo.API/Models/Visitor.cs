using System;

namespace userCrudDemo.API.Models
{
    public class Visitor
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public DateTime LastActive { get; set; }
        public string ImageUrl { get; set; }
    }
}