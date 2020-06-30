using System.Collections.Generic;
using SistemaEleva.API.Models;

namespace SistemaEleva.API.Dtos
{
    public class SchoolForUpdateDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Headmaster { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string PhoneNumber { get; set; }
        public ICollection<Class> Classes { get; set; }
    }
}