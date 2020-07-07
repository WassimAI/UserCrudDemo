using System.Collections.Generic;
using System.Threading.Tasks;
using userCrudDemo.API.Models;

namespace userCrudDemo.API.Data
{
    public interface IVisitors
    {
         Task<IEnumerable<Visitor>> GetAll();
         Task<Visitor> GetVisitor(int id);
         Task<bool> SaveAll();
    }
}