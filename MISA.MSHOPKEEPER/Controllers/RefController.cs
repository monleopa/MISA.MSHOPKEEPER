using MISA.BL.Dictionary;
using MISA.Entity.Base;
using MISA.Entity.Dictionary;
using MISA.MSHOPKEEPER.Properties;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MISA.MSHOPKEEPER.Controllers
{
    [RoutePrefix("refs")]
    public class RefController : ApiController
    {
        private RefBL _refBL = new RefBL();
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        /// <summary>
        /// Lấy đầy đủ thông tin Ref theo id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{id}")]
        public AjaxResult Get(Guid id)
        {
            var result = new AjaxResult();
            try
            {
                result.Data = _refBL.GetRefByID(id);
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Data = ex;
                result.Message = Resources.FailUnknown;
            }

            return result;
        }

        /// <summary>
        /// Lấy mã ref tiếp theo
        /// </summary>
        /// <returns>Mã mới</returns>
        [HttpGet]
        [Route("newcode/{type}")]
        public AjaxResult GetNewCode(int type)
        {
            var result = new AjaxResult();
            try
            {
                result.Data = _refBL.GetNewCode(type);
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Data = ex;
                result.Message = Resources.FailUnknown;
            }

            return result;
        }

        /// <summary>
        /// Lấy bản ghi ref theo điều kiện phân trang, filter
        /// </summary>
        /// <param name="dataCondition">Điều kiện phân trang, filter</param>
        /// <returns></returns>
        /// Author: NDANH (28/8/2019)
        [HttpPost]
        [Route("filter")]
        public AjaxResult PostDataFilter([FromBody]DataCondition dataCondition)
        {
            AjaxResult result = new AjaxResult();
            try
            {
                result.Data = _refBL.GetData(dataCondition);
                result.Message = Resources.SuccessGetData;
            }
            catch(Exception ex)
            {
                result.Success = false;
                result.Data = ex;
                result.Message = Resources.FailUnknown;
            }

            return result;
        }

        /// <summary>
        /// Thêm mới Ref  bao gồm cả RefDetail
        /// </summary>
        /// <param name="ref">Bản ghi mới</param>
        /// Author: NDANH 29/8/2019
        [HttpPost]
        [Route("")]
        public AjaxResult Post([FromBody]Ref @ref)
        {
            var result = new AjaxResult();
            if(ModelState.IsValid)
            {
                try
                {
                    result = _refBL.InsertRef(@ref);
                }
                catch (Exception ex)
                {
                    result.Success = false;
                    result.Data = ex;
                    result.Message = Resources.FailCreated;
                }
            } else
            {
                result.Success = false;
                var errors = ModelState.Select(x => x.Value.Errors)
                      .Where(y => y.Count > 0)
                      .ToList();

                var listErrorMessage = new List<string>();
                errors.ForEach(x =>
                {
                    listErrorMessage.Add(x[0].ErrorMessage);
                });
                result.Data = listErrorMessage;
                result.Message = listErrorMessage.ElementAt(0);
            }


            return result;
        }

        /// <summary>
        /// Sửa Ref bao gồm cả RefDetail
        /// </summary>
        /// <param name="ref">Bản ghi sửa</param>
        /// <returns></returns>
        /// Author: NDANH 29/8/2019
        [HttpPut]
        [Route("")]
        public AjaxResult Put([FromBody]Ref @ref)
        {
            var result = new AjaxResult();
            if(ModelState.IsValid)
            {
                try
                {
                    result = _refBL.UpdateRef(@ref);
                }
                catch (Exception ex)
                {
                    result.Success = false;
                    result.Data = ex;
                    result.Message = Resources.FailUpdated;
                }
            }
            else
            {
                result.Success = false;
                var errors = ModelState.Select(x => x.Value.Errors)
                      .Where(y => y.Count > 0)
                      .ToList();

                var listErrorMessage = new List<string>();
                errors.ForEach(x =>
                {
                    listErrorMessage.Add(x[0].ErrorMessage);
                });
                result.Data = listErrorMessage;
                result.Message = listErrorMessage.ElementAt(0);
            }

            return result;
        }

        /// <summary>
        /// Thực hiện xóa Ref theo id gửi lên
        /// </summary>
        /// <param name="listID">Danh sách id muốn xóa</param>
        /// <returns></returns>
        [HttpPut]
        [Route("deletion")]
        public AjaxResult PutDeleteRef([FromBody]List<string> listID)
        {
            var result = new AjaxResult();
            try
            {
                result = _refBL.DeleteRef(listID);
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Data = ex;
                result.Message = Resources.FailDeleted;
            }

            return result;

        }

    }
}
