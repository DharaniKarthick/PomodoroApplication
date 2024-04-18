namespace webapi.Entitites
{
    public class PomodoroSession
    {
        public int Id { get; set; }
        public int TaskId { get; set; } // Foreign key
        public string Type { get; set; }
        public TaskToDo? Task { get; set; } // Navigation property
        public int Status { get; set; }
        public string? timer { get; set; }
    }
}
