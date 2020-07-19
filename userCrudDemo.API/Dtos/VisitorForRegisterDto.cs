using System;
using System.ComponentModel.DataAnnotations;

namespace userCrudDemo.API.Dtos
{
    public class VisitorForRegisterDto
    {
        [Required]
        [EmailAddress(ErrorMessage="This is not a valid email address")]
        public string Email { get; set; }
        [Required]
        [StringLength(8, MinimumLength=3)]
        public string Password { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public DateTime LastLogin { get; set; }

        public VisitorForRegisterDto()
        {
            LastLogin = DateTime.Now;
        }
    }
}