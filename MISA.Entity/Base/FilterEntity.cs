using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entity.Base
{
    /// <summary>
    /// Quản lý dữ liệu Filter
    /// </summary>
    public class FilterEntity
    {
        #region Properties
        public string FilterName { get; set; }
        public string FilterValue { get; set; }
        public Enumeration.FilterType FilterType { get; set; }
        #endregion
    }
}
