using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SistemaEleva.API.Data;
using SistemaEleva.API.Models;

namespace SistemaEleva.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController : ControllerBase
    {
        private readonly IStudentRepository _studentRepository;
        public StudentsController(IStudentRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }

        [HttpGet("getStudents")]
        public async Task<IActionResult> GetStudents(int classId)
        {
            var students = await _studentRepository.GetStudents(classId);

            return Ok(students);
        }
        [HttpGet("getStudentById")]
        public async Task<IActionResult> GetStudent(int id)
        {
            var student = await _studentRepository.GetStudent(id);

            return Ok(student);
        }

        [HttpGet("createStudent")]
        public async Task<IActionResult> CreateStudent(Student studentToCreate)
        {
            studentToCreate.Name = studentToCreate.Name.ToLower();

            if (await _studentRepository.StudentExists(studentToCreate))
                return BadRequest("School already exists");

            var createdSchool = await _studentRepository.CreateStudent(studentToCreate);
            if (await _studentRepository.SaveAll())
                return StatusCode(201);

            throw new Exception($"Creating school {studentToCreate.Name} failed on save");
        }

        [HttpPut("editStudent")]
        public async Task<IActionResult> UpdateStudent(Student studentForUpdate)
        {
            var studentFromDb = await _studentRepository.GetStudent(studentForUpdate.Id);

            studentFromDb.Name = studentForUpdate.Name;
            studentFromDb.DateOfBirth = studentForUpdate.DateOfBirth;
            studentFromDb.Father = studentForUpdate.Father;
            studentFromDb.Mother = studentForUpdate.Mother;
            studentFromDb.PhoneNumber = studentForUpdate.PhoneNumber;


            if (await _studentRepository.SaveAll())
                return NoContent();

            throw new Exception($"Updating school {studentForUpdate.Name} failed on save");
        }
    }
}