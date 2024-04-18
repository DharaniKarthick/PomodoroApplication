using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using webapi.Entitites;
using webapi.IService;

namespace webapi.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(User credentials)
        {
            LoginResponse response = await _authService.AuthenticateAsync(credentials);
            if (response.Token == null)
                return Unauthorized("Invalid username or password");

            return Ok(new { Token = response.Token , UserId= response.UserId});
        }

        [HttpPost("signup")]
        public async Task<ActionResult<string>> Signup(User credentials)
        {
            var response = await _authService.SignupUser(credentials);      

            return Ok(response);
        }
    }
}
