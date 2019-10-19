using MISA.DL.Dictionary;
using MISA.Entity.Dictionary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.BL.Dictionary
{
    public class RefDetailBL
    {
        private RefDetailDL _refDetailDL;
        public RefDetailBL()
        {
            _refDetailDL = new RefDetailDL();
        }

        /// <summary>
        /// Gọi đến RefDetailDL để lấy danh sách RefDetail tương ứng với RefID
        /// </summary>
        /// <param name="refID">RefID</param>
        /// <returns></returns>
        /// Author: NDANH 28/8/2019
        public IEnumerable<RefDetail> GetDataByID(Guid refID)
        {
            string storeName = "[dbo].[Proc_GetRefDetailsByID]";
            return _refDetailDL.GetDataByID(storeName, refID);
        }
    }
}
