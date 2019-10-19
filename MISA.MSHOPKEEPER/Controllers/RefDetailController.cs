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
    [RoutePrefix("refdetails")]
    public class RefDetailController : ApiController
    {
        private RefDetailBL _refDetailBL = new RefDetailBL();

        /// <summary>
        /// Lấy RefDetail theo id của Ref
        /// </summary>
        /// <param name="id">ID của Ref</param>
        /// <returns></returns>
        /// Author: NDANH 30/8/2019
        [Route("{id}")]
        public AjaxResult Get(Guid id)
        {
            AjaxResult result = new AjaxResult();
            try
            {
                result.Data = _refDetailBL.GetDataByID(id);
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
