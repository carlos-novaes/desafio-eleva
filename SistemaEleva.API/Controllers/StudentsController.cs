using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SistemaEleva.API.Data;

namespace SistemaEleva.API.Controllers
{
    [ApiController]
    [Route("api/schools/{schoolId}/[controller]")]
    public class StudentsController : ControllerBase
    {
        private readonly ISchoolRepository _schoolRepository;
        private readonly IMapper _mapper;
        public StudentsController(ISchoolRepository schoolRepository, IMapper mapper)
        {
            _mapper = mapper;
            _schoolRepository = schoolRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetStudents(int schoolId)
        {
            var school = await _schoolRepository.GetSchool(schoolId);

            var students = school.Students.ToList();

            return Ok(students);
        }
    }
}