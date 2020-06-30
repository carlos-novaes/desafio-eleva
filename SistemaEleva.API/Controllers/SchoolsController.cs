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
            var schoolsToReturn = schools.ToList();

            return Ok(schoolsToReturn);
        }

        [HttpPost("create")]
        public async Task<IActionResult> RegisterSchool([FromBody] string name)
        {
            name = name.ToLower();

            if (await _repo.SchoolExists(name))
                return BadRequest("School already exists");

            var schoolToCreate = new School
            {
                Name = name
            };

            var createdSchool = await _repo.CreateSchool(schoolToCreate);
            if (await _repo.SaveAll())
                return StatusCode(201);

            throw new Exception($"Creating school {name} failed on save");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSchool(int id)
        {
            var school = await _repo.GetSchool(id);

            return Ok(school);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSchools(int id, School schoolForUpdate)
        {
            var schoolFromRepo = await _repo.GetSchool(id);

            schoolFromRepo.Name = schoolForUpdate.Name;
            schoolFromRepo.Address = schoolForUpdate.Address;
            schoolFromRepo.City = schoolForUpdate.City;
            schoolFromRepo.Classes = schoolForUpdate.Classes;
            schoolFromRepo.Headmaster = schoolForUpdate.Headmaster;
            schoolFromRepo.PhoneNumber = schoolForUpdate.PhoneNumber;

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating school {id} failed on save");
        }
    }
}