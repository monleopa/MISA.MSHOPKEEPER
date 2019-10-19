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
    [RoutePrefix("budgets")]
    public class BudgetController : ApiController
    {
        private BudgetBL _budgetBL = new BudgetBL();

        /// <summary>
        /// Lấy Budget theo loại phiếu thu/chi
        /// </summary>
        /// <param name="id">Loại phiếu thu chi</param>
        /// <returns>Danh sách Budget tương ứng</returns>
        /// Author: NDANH 30/8/2019
        [Route("{id}")]
        public AjaxResult Get(int id)
        {
            var result = new AjaxResult();
            try
            {
                result.Data = _budgetBL.GetAllDataByID(id);
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
