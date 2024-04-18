using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using webapi.Entitites;
using webapi.IService;

namespace webapi.Service
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly DatabaseContext _databaseContext;
        public AuthService(IConfiguration configuration, DatabaseContext databaseContext)
        {
            _configuration = configuration;
            _databaseContext = databaseContext; 
        }

        public async Task<LoginResponse> AuthenticateAsync(User credentials)
        {
            var user = await _databaseContext.Users.SingleOrDefaultAsync(u => u.Username == credentials.Username);
            LoginResponse res = new LoginResponse();
            // Validate user credentials (You should implement your own logic here)
            if (IsValidUser(credentials.Username, credentials.Password))
            {
                //Create token
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_configuration["JwtSettings:Secret"]);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Name, credentials.Username)
                    }),
                    Expires = DateTime.UtcNow.AddHours(1), // Token expires in 1 hour
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                res.Token= tokenHandler.WriteToken(token);

                res.UserId = user.Id;
                return res;
            }

            return res;
        }

       
        private bool IsValidUser(string username, string password)
        {
            var user = _databaseContext.Users.SingleOrDefault(u => u.Username == username);

            // If user not found or password does not match, return false
            if (user == null || password != user.Password)
            {
                return false;
            }

            return true;
        }

        public async Task<string> SignupUser(User user)
        {
            if (!IsValidUser(user.Username,user.Password))
            {
                _databaseContext.Add(user);
                await _databaseContext.SaveChangesAsync();
            }
            return user.Username;
        }
    }
}
