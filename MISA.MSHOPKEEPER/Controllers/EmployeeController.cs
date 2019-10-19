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
    [RoutePrefix("employees")]
    public class EmployeeController : ApiController
    {
        private EmployeeBL _employeeBL = new EmployeeBL();
        /// <summary>
        /// Gọi BL lấy danh sách Employee
        /// </summary>
        /// <returns></returns>
        /// Author: NDANH 29/8/2019
        [Route("")]
        public AjaxResult Get()
        {
            var result = new AjaxResult();
            try
            {
                result.Data = _employeeBL.GetAllData();
            }
            catch(Exception ex)
            {
                result.Success = false;
                result.Data = ex;
                result.Message = Resources.FailUnknown;
            }

            return result;
        }

    }
}
