using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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
        public async Task<IEnumerable<Visitor>> GetAll()
        {
            var visitors = await _context.Visitors.ToListAsync();
            
            return visitors;
        }

        public async Task<Visitor> GetVisitor(int id)
        {
            var visitor = await _context.Visitors.FirstOrDefaultAsync(x=>x.Id == id);

            return visitor;
        }
    }
}