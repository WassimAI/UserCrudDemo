using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using userCrudDemo.API.Helpers;
using userCrudDemo.API.Models;

namespace userCrudDemo.API.Data
{
    public class VisitorsRepository : IVisitors
    {
        private readonly DataContext _context;
        public VisitorsRepository(DataContext context)
        {
            _context = context;

        }
        public async Task<PagedList<Visitor>> GetAll(VisitorParams visitorParams)
        {
            var visitors = _context.Visitors.Include(x=>x.Photos).OrderByDescending(x=>x.LastActive).AsQueryable();

            //Removing the loggedIn visitor from list:
            visitors = visitors.Where(x=>x.Id != visitorParams.UserId);

            if(!string.IsNullOrEmpty(visitorParams.EmailText))
            {
                visitors = visitors.Where(x=>x.Email.Contains(visitorParams.EmailText));
            }

            if(!string.IsNullOrEmpty(visitorParams.NameText))
            {
                visitors = visitors.Where(x=>x.Email.Contains(visitorParams.NameText));
            }

            if(!string.IsNullOrEmpty(visitorParams.OrderBy))
            {
                switch (visitorParams.OrderBy)
                {
                    case "asc":
                    visitors = visitors.OrderBy(x=>x.LastActive);
                    break;
                    default:
                    visitors = visitors.OrderByDescending(x=>x.LastActive);
                    break;
                }
            }
            
            return await PagedList<Visitor>.CreateAsync(visitors, visitorParams.PageNumber, visitorParams.PageSize);
        }

        public async Task<Visitor> GetVisitor(int id)
        {
            var visitor = await _context.Visitors.Include(x=>x.Photos).FirstOrDefaultAsync(x=>x.Id == id);

            return visitor;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(x=>x.Id == id);

            return photo;
        }
    }
}