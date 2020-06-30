using Microsoft.EntityFrameworkCore;
using SistemaEleva.API.Models;

namespace SistemaEleva.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<School> Schools { get; set; }
        public DbSet<Class> Class { get; set; }
        public DbSet<Student> Students { get; set; }
    }
}