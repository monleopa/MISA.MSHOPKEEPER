using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entity.Base
{
    /// <summary>
    /// Điều kiện để phân trang, filter
    /// </summary>
    public class DataCondition
    {
        #region Properties
        //Số lượng bản ghi muốn lấy
        public int PageSize { get; set; }
        //Vị trí bắt đầu muốn lấy
        public int OffsetRow { get; set; }
        //Danh sách dữ liệu cần Filter
        public List<FilterEntity> ListFilter { get; set; }
        //Câu điều kiện để filter
        public string FilterQuery { get; set; }
        public string OrderQuery { get; set; }
        #endregion
    }
}
