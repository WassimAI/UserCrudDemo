using System.ComponentModel.DataAnnotations;

namespace userCrudDemo.API.Dtos
{
    public class VisitorForLoginDto
    {
        [Required(ErrorMessage="Email is required for login")]
        [EmailAddress(ErrorMessage="This is not a valid email address")]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}