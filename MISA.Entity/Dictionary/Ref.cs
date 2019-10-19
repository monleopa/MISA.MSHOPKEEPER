using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using MISA.Entity.Properties;

namespace MISA.Entity.Dictionary
{
    public class Ref
    {
        public Guid? RefID { get; set; }
        public int RefType { get; set; }

        [Required(ErrorMessage = "Số chứng từ không được để trống")]
        [MaxLength(20, ErrorMessage = "Mã chứng từ không được quá 20 ký tự")]
        public string RefNo { get; set; }

        [Required(ErrorMessage = "Ngày chứng từ không được để trống")]
        public DateTime RefDate { get; set; }

        [Required(ErrorMessage = "Tổng tiền phải lớn hơn 0")]
        public decimal TotalAmount { get; set; }

        [MaxLength(255, ErrorMessage = "Lý do không được quá 255 ký tự")]
        public string Note { get; set; }

        [MaxLength(100, ErrorMessage = "Tên người nhập không được quá 100 ký tự")]
        public string PersonImple { get; set; }

        [MaxLength(255, ErrorMessage = "Địa chỉ không được quá 255 ký tự")]
        public string Address { get; set; }

        public Guid? EmployeeID { get; set; }

        public string EmployeeName { get; set; }

        public string EmployeeCode { get; set; }

        public Guid? RefTargetID { get; set; }

        [MaxLength(255, ErrorMessage = "Tên đối tượng không không được quá 100 ký tự")]
        public string RefTargetName { get; set; }

        [MaxLength(255, ErrorMessage = "Tên đối tượng không được quá 100 ký tự")]
        public string RefObjectName { get; set; }

        public string RefTargetCode { get; set; }

        public long TotalRecord { get; set; }

        [Required(ErrorMessage = "Phải có ít nhất 1 dòng chi tiết")]
        public List<RefDetail> ListRefDetail { get; set; }
    }
}
