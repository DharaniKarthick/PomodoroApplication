using Microsoft.EntityFrameworkCore;
using webapi.Entitites;
using webapi.Repository.IPomodoroRepo;

namespace webapi.Repository.PomodoroRepo
{
    public class TimerRepo : ITimerRepo
    {
        private readonly DatabaseContext _dbContext;
        public TimerRepo(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<int> Add(PomodoroSession entity, int taskId)
        {
            entity.TaskId=taskId;
            var sessionDetails = await _dbContext.PomodoroSessions.Where(s => s.TaskId==taskId && s.Type==entity.Type).FirstOrDefaultAsync();
            if (sessionDetails != null)
            {
                sessionDetails.Status=entity.Status;
                await _dbContext.SaveChangesAsync();
                return sessionDetails.Id;
            }
            else
            {
                _dbContext.PomodoroSessions.Add(entity);
                await _dbContext.SaveChangesAsync();
            }
            
            return entity.Id;
        }

        public async Task<int> Delete(int taskId, int sessionId)
        {
            
                var taskdetails = await Get(sessionId,taskId);
                if (taskdetails != null)
                {
                    _dbContext.PomodoroSessions.Remove(taskdetails);
                    _dbContext.SaveChanges();
                    return taskdetails.Id;
                }
                return 0;
            
        }

        public async Task<PomodoroSession> Get(int id, int taskId)
        {
            return  await _dbContext.PomodoroSessions.Where(x=>x.TaskId == taskId).FirstOrDefaultAsync(e => e.Id == id); 
        }

        public async Task<IEnumerable<PomodoroSession>> GetAll(int taskId)
        {
            return await _dbContext.PomodoroSessions.Where(x => x.TaskId == taskId).ToListAsync();
        }

        public void Update(PomodoroSession dbEntity, PomodoroSession entity, int taskId)
        {
            throw new NotImplementedException();
        }
    }
}
