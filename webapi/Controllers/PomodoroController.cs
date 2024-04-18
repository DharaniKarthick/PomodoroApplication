using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Entitites;
using webapi.Repository.IPomodoroRepo;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace webapi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PomodoroController : ControllerBase
    {
        private readonly IPomodoro<TaskToDo> _pomodoro;

        public PomodoroController(IPomodoro<TaskToDo> pomodoro) {
            _pomodoro = pomodoro;
        }

        // GET: api/<PomodoroController>
        [HttpGet("GetTasks")]
        public async Task<IEnumerable<TaskToDo>> GetAll([FromQuery] int UserId)
        {
            return await _pomodoro.GetAll(UserId);
        }

        // GET api/<PomodoroController>/5
        [HttpGet("{id}")]
        public async Task<TaskToDo>  Get(int id, [FromQuery] int UserId)
        {
            return await _pomodoro.Get(id, UserId);
        }

        // POST api/<PomodoroController>
        [HttpPost]
        public async Task<int> Post([FromBody] TaskToDo task)
        {
            return await _pomodoro.Add(task,task.UserId);
        }

        // PUT api/<PomodoroController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PomodoroController>/5
        [HttpDelete]
        public async  Task<IActionResult> Delete([FromQuery] int task,[FromQuery] int userId)
        {
            var res= await _pomodoro.Delete(task,userId);
            return NoContent();
        }
    }
}
