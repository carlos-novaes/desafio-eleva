using System.Collections.Generic;
using System.Threading.Tasks;
using SistemaEleva.API.Models;

namespace SistemaEleva.API.Data
{
    public interface IClassRepository
    {
        Task<Class> CreateClass(Class classroom);
        Task<bool> ClassExists(Class classroom);
        Task<IEnumerable<Class>> GetClasses(int schoolId);
        Task<Class> GetClass(int id);
        Task<bool> SaveAll();
    }
}