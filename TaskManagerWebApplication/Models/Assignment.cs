using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;

namespace TaskManagerWebApplication.Models
{
    public class Assignment
    {
        [Key]
        public int Id { get; set; }
        [DataType(DataType.MultilineText)]
        [StringLength(100)]
        [Required(ErrorMessage = "Поле не повинно бути порожнім")]
        [Display(Name = "Назва завдання")]
        public string Name { get; set; }
        [DataType(DataType.MultilineText)]
        [StringLength(1000)]
        [Required(ErrorMessage = "Поле не повинно бути порожнім")]
        [Display(Name = "Опис завдання")]
        public string Description { get; set; }
        [DataType(DataType.DateTime)]
        [Display(Name = "Термін виконання")]
        public DateTime DeadLineTime { get; set; }
        [DataType(DataType.MultilineText)]
        [StringLength(75)]
        [Display(Name = "Статус завдання")]
        public string Status { get; set; }
        [Display(Name = "ID виконавця")]
        [Required(ErrorMessage = "Поле не повинно бути порожнім")]
        public int PerformerID { get; set; }
        
        public virtual Performer Performer { get; set; }
    }
}
