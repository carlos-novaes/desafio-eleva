using System.Collections.Generic;
using System.Threading.Tasks;
using SistemaEleva.API.Models;

namespace SistemaEleva.API.Data
{
    public interface IStudentRepository
    {
        Task<Student> CreateStudent(Student student);
        Task<bool> StudentExists(Student student);
        Task<IEnumerable<Student>> GetStudents();
        Task<IEnumerable<Student>> GetStudentsByClassId(int classId);
        Task<Student> GetStudent(int id);
        Task<bool> SaveAll();
    }
}