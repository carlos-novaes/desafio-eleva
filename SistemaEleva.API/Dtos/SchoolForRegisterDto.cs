using System.ComponentModel.DataAnnotations;

namespace SistemaEleva.API.Dtos
{
    public class SchoolForRegisterDto
    {
        [Required]
        public string Name { get; set; }
    }
}