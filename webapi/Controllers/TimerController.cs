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
    public class TimerController : ControllerBase
    {
        private readonly ITimerRepo _timer;

        public TimerController(ITimerRepo timer)
        {
            _timer = timer;
        }
        // GET: api/<TimerController>
        [HttpGet]
        public async Task<IEnumerable<PomodoroSession>> GetAll(int taskId)
        {
            return await _timer.GetAll(taskId);
        }

        // GET api/<TimerController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<TimerController>
        [HttpPost]
        public async Task<int> Post([FromBody] PomodoroSession timer, [FromQuery] int taskId)
        {
            return await _timer.Add(timer, taskId);
        }

        // PUT api/<TimerController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<TimerController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
