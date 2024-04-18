using Microsoft.EntityFrameworkCore;

namespace webapi.Entitites
{
    public class DatabaseContext:DbContext
    {
        public DatabaseContext(DbContextOptions options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<TaskToDo> Tasks { get; set; }
        public DbSet<PomodoroSession> PomodoroSessions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure Fluent API relationships
            modelBuilder.Entity<User>()
           .HasKey(u => u.Id); // Define primary key

            modelBuilder.Entity<User>()
           .Property(t => t.Id)
           .UseIdentityColumn(1, 1);

            modelBuilder.Entity<User>()
                .Property(u => u.Username)
                .IsRequired()
                .HasMaxLength(50); // Set max length for username

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique(); // Define unique constraint for username

            modelBuilder.Entity<User>()
                .Property(u => u.Password)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<TaskToDo>()
           .HasKey(t => t.Id); // Define primary key

            modelBuilder.Entity<TaskToDo>()
            .Property(t => t.Id)
            .UseIdentityColumn(1, 1);

            modelBuilder.Entity<TaskToDo>()
                .Property(t => t.Title)
                .IsRequired(); // Set Title as required

            modelBuilder.Entity<TaskToDo>()
                .Property(t => t.Description)
                .IsRequired();

            modelBuilder.Entity<PomodoroSession>()
                .HasKey(p => p.Id);

            modelBuilder.Entity<PomodoroSession>()
           .Property(p => p.Id)
           .UseIdentityColumn(1, 1);


            // One User can have many Tasks
            modelBuilder.Entity<TaskToDo>()
                .HasOne(t => t.User)
                .WithMany(u => u.Tasks)
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.Restrict); // Restrict deletion of user if tasks exist

            // One Task can have one PomodoroSession
            modelBuilder.Entity<PomodoroSession>()
                .HasOne(p => p.Task)
                .WithOne(t => t.PomodoroSession)
                .HasForeignKey<PomodoroSession>(p => p.TaskId)
                .OnDelete(DeleteBehavior.Cascade); // Cascade deletion of PomodoroSession if task is deleted
        }

    }
}
