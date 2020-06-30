using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SistemaEleva.API.Data;
using SistemaEleva.API.Dtos;
using SistemaEleva.API.Models;

namespace SistemaEleva.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SchoolsController : ControllerBase
    {
        private readonly ISchoolRepository _repo;
        private readonly IMapper _mapper;
        public SchoolsController(ISchoolRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetSchools()
        {
            var schools = await _repo.GetSchools();

            var schoolsToReturn = _mapper.Map<IEnumerable<SchoolForListDto>>(schools);

            return Ok(schoolsToReturn);
        }

        [HttpPost("create")]
        public async Task<IActionResult> RegisterSchool(SchoolForRegisterDto schoolForRegisterDto)
        {
            schoolForRegisterDto.Name = schoolForRegisterDto.Name.ToLower();

            if (await _repo.SchoolExists(schoolForRegisterDto.Name))
                return BadRequest("School already exists");

            var schoolToCreate = new School
            {
                Name = schoolForRegisterDto.Name
            };

            var createdSchool = await _repo.CreateSchool(schoolToCreate);
            if (await _repo.SaveAll())
                return StatusCode(201);

            throw new Exception($"Creating school {schoolForRegisterDto.Name} failed on save");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSchool(int id)
        {
            var school = await _repo.GetSchool(id);

            var schoolToReturn = _mapper.Map<SchoolForDetailedDto>(school);

            return Ok(school);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSchools(int id, SchoolForUpdateDto schoolForUpdateDto)
        {
            var schoolFromRepo = await _repo.GetSchool(id);

            _mapper.Map(schoolForUpdateDto, schoolFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating school {id} failed on save");
        }
    }
}