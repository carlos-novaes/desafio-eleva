using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SistemaEleva.API.Models;

namespace SistemaEleva.API.Data
{
    public class ClassRepository : IClassRepository
    {
        private readonly DataContext _context;
        public ClassRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Class> CreateClass(Class classroom)
        {
            await _context.Class.AddAsync(classroom);

            return classroom;
        }

        public async Task<bool> ClassExists(Class classroom)
        {
            if (await _context.Class.AnyAsync(c => (c.SchoolId == classroom.SchoolId && c.Name.ToLower() == classroom.Name.ToLower() && c.Year == classroom.Year)))
                return true;

            return false;
        }

        public async Task<Class> GetClass(int id)
        {
            var classroom = await _context.Class.FirstOrDefaultAsync(c => c.Id == id);

            return classroom;
        }

        public async Task<IEnumerable<Class>> GetClasses(int schoolId)
        {
            var classes = await _context.Class.Where(c => c.SchoolId == schoolId).ToListAsync();

            return classes;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}