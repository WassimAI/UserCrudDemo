using System.Linq;
using AutoMapper;
using userCrudDemo.API.Dtos;
using userCrudDemo.API.Models;

namespace userCrudDemo.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Visitor, VisitorForListDto>();
            CreateMap<VisitorForUpdateDto, Visitor>();
            CreateMap<Photo, PhotoForReturnDto>();//Source then destination!
            CreateMap<PhotoForCreationDto, Photo>();
        }
    }
}