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
    public class ClassesController : ControllerBase
    {
        private readonly IClassRepository _classRepository;
        public ClassesController(IClassRepository classRepository)
        {
            _classRepository = classRepository;
        }

        [HttpGet("getClasses")]
        public async Task<IActionResult> GetClasses(int schoolId)
        {
            var classes = await _classRepository.GetClasses(schoolId);

            return Ok(classes);
        }

        [HttpPost("createClass")]
        public async Task<IActionResult> CreateClass(Class classToCreate)
        {
            if (await _classRepository.ClassExists(classToCreate))
                return BadRequest("School already exists");

            var createdClass = await _classRepository.CreateClass(classToCreate);
            if (await _classRepository.SaveAll())
                return StatusCode(201);

            throw new Exception($"Creating school {classToCreate.Name} failed on save");
        }

        [HttpPut("editClass")]
        public async Task<IActionResult> UpdateSchools(Class classForUpdate)
        {
            var classFromDb = await _classRepository.GetClass(classForUpdate.Id);

            classFromDb.Name = classForUpdate.Name;
            classFromDb.Students = classForUpdate.Students;
            classFromDb.Year = classForUpdate.Year;


            if (await _classRepository.SaveAll())
                return NoContent();

            throw new Exception($"Updating school {classForUpdate.Name} failed on save");
        }
    }
}