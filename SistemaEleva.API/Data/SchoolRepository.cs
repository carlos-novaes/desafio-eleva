using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SistemaEleva.API.Models;

namespace SistemaEleva.API.Data
{
    public class SchoolRepository : ISchoolRepository
    {
        private readonly DataContext _context;
        public SchoolRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<School> CreateSchool(School school)
        {
            await _context.Schools.AddAsync(school);

            return school;
        }

        public async Task<bool> SchoolExists(string schoolName)
        {
            if (await _context.Schools.AnyAsync(s => s.Name.ToLower() == schoolName.ToLower()))
                return true;

            return false;
        }

        public async Task<School> GetSchool(int id)
        {
            var school = await _context.Schools.FirstOrDefaultAsync(u => u.Id == id);

            return school;
        }

        public async Task<IEnumerable<School>> GetSchools()
        {
            var schools = await _context.Schools.ToListAsync();

            return schools;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}