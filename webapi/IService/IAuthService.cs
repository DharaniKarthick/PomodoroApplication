using webapi.Entitites;

namespace webapi.IService
{
    public interface IAuthService
    {
        Task<LoginResponse> AuthenticateAsync(User credentials);
        Task<string> SignupUser(User crendentials);
    }
}
