using Microsoft.AspNetCore.Components.Server.ProtectedBrowserStorage;
using Microsoft.EntityFrameworkCore;

namespace TaskManagerWebApplication.Models
{
    public class TaskManagerContext: DbContext
    {
        public virtual DbSet<Assignment> Assignments { get; set; }
        public virtual DbSet<Performer> Performers { get; set; }
        public TaskManagerContext(DbContextOptions<TaskManagerContext> options)
            : base(options)
        {
            
        }
        /*protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }*/

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // For model Assignment 
            modelBuilder.Entity<Assignment>().Property(a => a.Id).HasColumnName("Id");
            modelBuilder.Entity<Assignment>().Property(a => a.Name).HasColumnName("Name");
            modelBuilder.Entity<Assignment>().Property(a => a.Description).HasColumnName("Description");
            modelBuilder.Entity<Assignment>().Property(a => a.DeadLineTime).HasColumnName("DeadLineTime");
            modelBuilder.Entity<Assignment>().Property(a => a.Status).HasColumnName("Status");

            // For model Performer 
            modelBuilder.Entity<Performer>().Property(p => p.ID).HasColumnName("ID");
            modelBuilder.Entity<Performer>().Property(p => p.FirstName).HasColumnName("Firstname");
            modelBuilder.Entity<Performer>().Property(p => p.LastName).HasColumnName("Lastname");
            modelBuilder.Entity<Performer>().Property(p => p.Assignments).HasColumnName("Assignments");
            modelBuilder.Entity<Performer>()
       .Ignore(p => p.Assignments);

        }

        /* public TaskManagerContext(DbContextOptions<TaskManagerContext> options):base(options) 
         {
             Database.EnsureCreated();
         }*/
    }
}
