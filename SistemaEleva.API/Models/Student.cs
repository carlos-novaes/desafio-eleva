using System;

namespace SistemaEleva.API.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Mother { get; set; }
        public string Father { get; set; }
        public string PhoneNumber { get; set; }
        public int ClassId { get; set; }

    }
}