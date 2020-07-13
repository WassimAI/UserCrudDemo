using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using userCrudDemo.API.Data;
using userCrudDemo.API.Dtos;
using userCrudDemo.API.Helpers;
using userCrudDemo.API.Models;

namespace userCrudDemo.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/visitor/{visitorId}/photos")]
    public class PhotosController : ControllerBase
    {
        private readonly IVisitors _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;
        public PhotosController(IVisitors repo, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;
            _repo = repo;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            //We created the account instance!
            _cloudinary = new Cloudinary(acc);
        }

        [HttpGet("{id}", Name="GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepo = await _repo.GetPhoto(id);

            var photo = _mapper.Map<PhotoForReturnDto>(photoFromRepo);

            return Ok(photo);
        }

        [HttpPost]
        public async Task<IActionResult> AddPhoto(int visitorId, [FromForm]PhotoForCreationDto photoForCreationDto)
        {
            //Check if this userId in URL is that of logged in user in token
            if(visitorId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            //Get the visitor from DB
            var visitorFromRepo = await _repo.GetVisitor(visitorId);

            //Get file name coming from photoForCreationDto
            var file = photoForCreationDto.File;

            //Create the upload result that will hold the result coming from coudinary after upload in complete
            var uploadResult = new ImageUploadResult();

            if(file.Length > 0)
            {
                using(var stream = file.OpenReadStream())
                {
                    var uploadParam = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };

                    uploadResult = _cloudinary.Upload(uploadParam);
                }
            }

            photoForCreationDto.Url = uploadResult.Uri.ToString();
            photoForCreationDto.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map<Photo>(photoForCreationDto);

            if(!visitorFromRepo.Photos.Any(x=> x.IsMain))//Getting error here
            {
                photo.IsMain = true;
            }

            visitorFromRepo.Photos.Add(photo);//Getting error here

            if(await _repo.SaveAll())
            {
                var returnPhoto = _mapper.Map<PhotoForReturnDto>(photo);
                return CreatedAtRoute("GetPhoto", new {visitorId = visitorId, id = photo.Id}, returnPhoto);
            }

            return BadRequest("Could not upload the photo!");
        }
    }
}