using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entity.Base
{
    /// <summary>
    /// Quan lý kết quả trả về
    /// </summary>
    public class AjaxResult
    {
        #region Properties
        public bool Success { get; set; }
        public string Message { get; set; }
        public object Data { get; set; }
        #endregion

        public AjaxResult()
        {
            Success = true;
        }
        
    }
}
