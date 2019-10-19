using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entity.Base
{
    /// <summary>
    /// Quản lý các loại
    /// </summary>
    public class Enumeration
    {
        #region Loại hình thức Filter
        public enum FilterType
        {
            Equal = 0,
            Less = 1,
            LessOrEqual = 2,
            Greater = 3,
            GreaterOrEqual = 4,
            Contain = 5,
            NotContain = 6,
            BeginWith = 7,
            EndWith = 8,
            Date = 9,
            FromDate = 10, // Lớn hơn ngày
            ToDate = 11, // Nhỏ hơn ngày
            FromGreaterDate = 12, //  Lớn hơn hoặc bằng ngày
            ToLessDate = 13, // Nhỏ hơn hoặc bằng ngày
        }
        #endregion

        #region Loại hành động: thêm, sửa, xóa, lấy dữ liệu
        public enum ActionType
        {
            Insert = 1,
            Update = 2,
            Delete = 3,
            Get = 4
        }
        #endregion
    }
}
