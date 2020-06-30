using System.Collections.Generic;
using System.Threading.Tasks;
using SistemaEleva.API.Models;

namespace SistemaEleva.API.Data
{
    public interface ISchoolRepository
    {
        Task<School> CreateSchool(School school);
        Task<bool> SchoolExists(string schoolName);
        Task<IEnumerable<School>> GetSchools();
        Task<School> GetSchool(int id);
        Task<bool> SaveAll();
    }
}