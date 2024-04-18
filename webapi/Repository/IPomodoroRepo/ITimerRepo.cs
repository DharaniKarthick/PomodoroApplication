using webapi.Entitites;

namespace webapi.Repository.IPomodoroRepo
{
    public interface ITimerRepo
    {
        Task<IEnumerable<PomodoroSession>> GetAll(int taskId);
        Task<PomodoroSession> Get(int id, int taskId);
        Task<int> Add(PomodoroSession entity, int taskId);
        void Update(PomodoroSession dbEntity, PomodoroSession entity, int taskId);
        Task<int> Delete(int taskId, int sessionId);
    }
}
