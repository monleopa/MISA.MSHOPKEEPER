using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entity.Dictionary
{
    public class RefDetail
    {
        public Guid RefDetailID { get; set; }
        public Guid? RefID { get; set; }
        public Guid? BudgetID { get; set; }

        [MaxLength(255, ErrorMessage = "Diễn giải không được quá 255 ký tự")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Số tiền phải lớn hơn 0")]
        public decimal AmountMoney { get; set; }

        public string BudgetName { get; set; }
    }
}
