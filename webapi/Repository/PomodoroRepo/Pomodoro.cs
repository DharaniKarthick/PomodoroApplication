using Microsoft.EntityFrameworkCore;
using System;
using webapi.Entitites;
using webapi.Repository.IPomodoroRepo;

namespace webapi.Repository.PomodoroRepo
{
    public class Pomodoro:IPomodoro<TaskToDo>
    {
        private readonly DatabaseContext _context;

        public Pomodoro(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TaskToDo>> GetAll(int UserId)
        {
            return await _context.Tasks.Where(x=> x.UserId==UserId).ToListAsync();
        }

        public async Task<TaskToDo> Get(int id, int UserId)
        {
            return await _context.Tasks.Where(x=>x.UserId==UserId)
                  .FirstOrDefaultAsync(e => e.Id == id);
        }
        public async Task<int> Add(TaskToDo entity,int UserId)
        {
            entity.UserId=UserId;
            if (entity.Id == 0)
            {
                _context.Tasks.Add(entity);
            }
            else
            {
                var taskdetails = await Get(entity.Id, UserId);
                taskdetails.Title=entity.Title;
                taskdetails.Description = entity.Description;
                taskdetails.Status = entity.Status;
            }
            await _context.SaveChangesAsync();
            return entity.Id;
            
        }
        public void Update(TaskToDo initial, TaskToDo entity,int UserId)
        {
            initial.Title 
                = entity.Title;
            initial.Description = entity.Description;
            initial.Status = entity.Status;
            initial.UserId=UserId;
            _context.SaveChanges();
        }
        public async Task<int> Delete(int task, int UserId)
        {
            var taskdetails = await Get(task, UserId);
            if (taskdetails != null)
            {
                _context.Tasks.Remove(taskdetails);
                _context.SaveChanges();
                return taskdetails.Id;
            }
            return 0;
        }

    }
}
