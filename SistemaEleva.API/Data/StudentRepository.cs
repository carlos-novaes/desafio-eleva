using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SistemaEleva.API.Models;

namespace SistemaEleva.API.Data
{
    public class StudentRepository : IStudentRepository
    {
        private readonly DataContext _context;
        public StudentRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<Student> CreateStudent(Student student)
        {
            await _context.Students.AddAsync(student);

            return student;
        }

        public async Task<Student> GetStudent(int id)
        {
            var student = await _context.Students.FirstOrDefaultAsync(s => s.Id == id);

            return student;
        }

        public async Task<IEnumerable<Student>> GetStudents()
        {
            var students = await _context.Students.ToListAsync();

            return students;
        }

        public async Task<IEnumerable<Student>> GetStudentsByClassId(int classId)
        {
            var students = await _context.Students.Where(s => s.ClassId == classId).ToListAsync();

            return students;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> StudentExists(Student student)
        {
            if (await _context.Students.AnyAsync(s => (s.Name.ToLower() == student.Name.ToLower() && s.ClassId == student.ClassId)))
                return true;

            return false;
        }
    }
}