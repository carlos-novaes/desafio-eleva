using System.Collections.Generic;

namespace SistemaEleva.API.Models
{
    public class School
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Headmaster { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string PhoneNumber { get; set; }
        public ICollection<Student> Students { get; set; }
        public ICollection<Class> Classes { get; set; }
    }
}