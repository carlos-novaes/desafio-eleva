using System.Collections.Generic;

namespace SistemaEleva.API.Models
{
    public class Class
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Year { get; set; }
        public int SchoolId { get; set; }
        public ICollection<Student> Students { get; set; }
    }
}