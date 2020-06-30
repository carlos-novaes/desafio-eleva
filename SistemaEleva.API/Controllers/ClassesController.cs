using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SistemaEleva.API.Data;
using SistemaEleva.API.Dtos;
using SistemaEleva.API.Models;

namespace SistemaEleva.API.Controllers
{
    [ApiController]
    [Route("api/schools/{schoolId}/[controller]")]
    public class ClassesController : ControllerBase
    {
        private readonly ISchoolRepository _schoolRepository;
        private readonly IMapper _mapper;
        public ClassesController(ISchoolRepository schoolRepository, IMapper mapper)
        {
            _mapper = mapper;
            _schoolRepository = schoolRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetClasses(int schoolId)
        {
            var school = await _schoolRepository.GetSchool(schoolId);

            var classes = school.Classes.ToList();

            return Ok(classes);
        }
    }
}