namespace webapi.Entitites
{
    public class TaskToDo
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Status { get; set; }
        public int UserId { get; set; } // Foreign key
        public User? User { get; set; } // Navigation property
        public PomodoroSession? PomodoroSession { get; set; } // Navigation property
    }



}
