using MISA.BL.Dictionary;
using MISA.Entity.Base;
using MISA.MSHOPKEEPER.Properties;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MISA.MSHOPKEEPER.Controllers
{
    [RoutePrefix("reftargets")]
    public class RefTargetController : ApiController
    {
        private RefTargetBL _refTargetBL = new RefTargetBL();

        /// <summary>
        /// Gọi BL Lấy danh sách RefTarget
        /// </summary>
        /// <returns>Danh sách Reftarget</returns>
        [Route("")]
        public AjaxResult Get()
        {
            var result = new AjaxResult();
            try
            {
                result.Data = _refTargetBL.GetAllData();
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Data = ex;
                result.Message = Resources.FailUnknown;
            }

            return result;
        }


    }
}
