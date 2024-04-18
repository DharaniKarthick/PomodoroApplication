namespace webapi.Repository.IPomodoroRepo
{
    public interface IPomodoro<TEntity>
    {
        Task<IEnumerable<TEntity>> GetAll(int UserId);
        Task<TEntity> Get(int id,int UserId);
        Task<int> Add(TEntity entity, int UserId);
        void Update(TEntity dbEntity, TEntity entity,int UserId);
        Task<int> Delete(int task, int UserId);
    }
}
