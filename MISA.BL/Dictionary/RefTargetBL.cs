using MISA.DL.Dictionary;
using MISA.Entity.Dictionary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.BL.Dictionary
{
    public class RefTargetBL
    {
        private RefTargetDL _refTargetDL;
        public RefTargetBL()
        {
            _refTargetDL = new RefTargetDL();
        }

        /// <summary>
        /// Gọi DL lấy danh sách Employee
        /// </summary>
        /// <returns>Danh sách Employee</returns>
        public IEnumerable<RefTarget> GetAllData()
        {
            string storeName = "[dbo].[Proc_GetAllRefTarget]";
            return _refTargetDL.GetData<RefTarget>(storeName);
        }
    }
}
