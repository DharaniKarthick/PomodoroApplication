using System.ComponentModel.DataAnnotations;

namespace webapi.Entitites
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public ICollection<TaskToDo>? Tasks { get; set; } // Navigation property
    }

    public class LoginResponse
    {
        public string Token { get; set; }
        public int UserId { get; set; }
    }
}
