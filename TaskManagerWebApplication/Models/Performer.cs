using Microsoft.Extensions.Primitives;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManagerWebApplication.Models
{
    public class Performer
    {
       
        [Key]
        public int ID { get; set; }
        [Display(Name = "Ім'я")]
        [Required(ErrorMessage = "Поле не повинно бути порожнім")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Поле не повинно бути порожнім")]
        [Display(Name = "Прізвище")]
        public string LastName { get; set; }
        [Display(Name = "Завдання")]
        public virtual ICollection<Assignment> Assignments { get; set; }
    }
}
