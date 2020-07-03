using System;

namespace userCrudDemo.API.Dtos
{
    public class VisitorForListDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public DateTime LastActive { get; set; }
        public string ImageUrl { get; set; }
    }
}