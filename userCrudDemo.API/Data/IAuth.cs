using System.Threading.Tasks;
using userCrudDemo.API.Models;

namespace userCrudDemo.API.Data
{
    public interface IAuth
    {
         Task<Visitor> Register(Visitor visitor, string password);
         Task<Visitor> Login(string email, string password);
         Task<bool> UserExists(string email);
    }
}