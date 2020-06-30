using System.Linq;
using AutoMapper;
using SistemaEleva.API.Dtos;
using SistemaEleva.API.Models;

namespace SistemaEleva.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<School, SchoolForListDto>();
            // .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<School, SchoolForDetailedDto>();
            // .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<SchoolForUpdateDto, School>();
        }
    }
}