using Microsoft.EntityFrameworkCore;
using userCrudDemo.API.Models;

namespace userCrudDemo.API.Data
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> options):base(options){ }
        public DbSet<Visitor> Visitors { get; set; }
    }
}