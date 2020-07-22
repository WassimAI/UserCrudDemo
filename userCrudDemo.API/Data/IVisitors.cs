using System.Collections.Generic;
using System.Threading.Tasks;
using userCrudDemo.API.Helpers;
using userCrudDemo.API.Models;

namespace userCrudDemo.API.Data
{
    public interface IVisitors
    {
         Task<PagedList<Visitor>> GetAll(VisitorParams visitorParams);
         Task<Visitor> GetVisitor(int id);
         Task<Photo> GetPhoto(int id);
         Task<bool> SaveAll();
    }
}