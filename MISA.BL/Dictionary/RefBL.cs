using MISA.Common.Filter;
using MISA.DL.Base;
using MISA.DL.Dictionary;
using MISA.Entity.Base;
using MISA.Entity.Dictionary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace MISA.BL.Dictionary
{
    public class RefBL
    {
        private RefDL _refDL;
        public RefBL()
        {
            _refDL = new RefDL();
        }

        /// <summary>
        /// Lấy bản ghi Ref theo điều kiện phân trang, lọc
        /// </summary>
        /// <param name="storeName">Tên storeprocedure</param>
        /// <param name="dataCondition">Điều kiện phân trang, lọc</param>
        /// <returns>Danh sách Ref tương ứng</returns>
        /// Author: NDANH 28/8/2019
        public IEnumerable<Ref> GetData(DataCondition dataCondition)
        {
            FilterHelper filterHelper = new FilterHelper();
            dataCondition.FilterQuery = filterHelper.BuildConditionSQL(dataCondition.ListFilter);
            string storeName = "[dbo].[Proc_GetAllData]";
            var listRef = new List<Ref>();
            listRef = _refDL.GetData(storeName, dataCondition).ToList();
            foreach (var refs in listRef)
            {
                if(refs.RefTargetName == null)
                {
                    refs.RefTargetName = refs.RefObjectName;
                }
            }
            return listRef;
        }

        /// <summary>
        /// Lấy chứng từ theo id tương tứng
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Ref GetRefByID(Guid id)
        {
            var @ref = new Ref();
            @ref = _refDL.GetRefByID(id);
            if (@ref.RefTargetName == null)
            {
                @ref.RefTargetName = @ref.RefObjectName;
            }
            return @ref;
        }

        /// <summary>
        /// Gọi DL để thực hiện thêm mới
        /// </summary>
        /// <param name="ref">Đối tượng bản ghi mới</param>
        /// <returns>Số dòng ảnh hưởng, -10 nếu bị trùng mã</returns>
        /// Author: NDANH (28/8/2019)
        public AjaxResult InsertRef(Ref @ref)
        {
            var result = new AjaxResult();

            var check = _refDL.CheckCodeExisted("[dbo].[Proc_CheckCodeExisted]", "@RefID", "@RefNo", @ref.RefID, @ref.RefNo, Enumeration.ActionType.Insert);
            if (check == true)
            {
                var duplicate = new CodeDuplicate();
                duplicate.NewCode = GetNewCode(@ref.RefType);
                duplicate.DataCode = -10;
                result.Data = duplicate;
                result.Success = false;
                result.Message = "Số chứng từ không được trùng. Hãy thay đổi số chứng từ khác";
                return result;
            }
            else
            {
                return _refDL.InsertRef(@ref);
            }
            
        }

        /// <summary>
        /// Gọi DL để thực hiện sửa
        /// </summary>
        /// <param name="ref">Đối tượng bản ghi mới</param>
        /// <returns>Số dòng ảnh hưởng, -10 nếu bị trùng mã</returns>
        /// Author: NDANH (28/8/2019)
        public AjaxResult UpdateRef(Ref @ref)
        {
            var result = new AjaxResult();
            var check = _refDL.CheckCodeExisted("[dbo].[Proc_CheckCodeExisted]", "@RefID", "@RefNo", @ref.RefID, @ref.RefNo, Enumeration.ActionType.Update);
            if (check == true)
            {
                var duplicate = new CodeDuplicate();
                duplicate.NewCode = GetNewCode(@ref.RefType);
                duplicate.DataCode = -10;
                result.Data = duplicate;
                result.Success = false;
                result.Message = "Số chứng từ không được trùng. Hãy thay đổi số chứng từ khác";
                return result;
            }
            else
            {
                return _refDL.UpdateRef(@ref);
            }
        }

        /// <summary>
        /// Xóa Ref
        /// </summary>
        /// <param name="listId">Danh sách ID</param>
        /// <returns></returns>
        public AjaxResult DeleteRef(List<string> listId)
        {
            string strListId = String.Join(",", listId.ToArray());
            return _refDL.DeleteRef(strListId);
        }

        /// <summary>
        /// Sinh mã code mới
        /// </summary>
        /// <returns>Mã code mới</returns>
        /// Author: NDANH 31/8/2019
        public object GetNewCode(int type)
        {
            string condition = "RefType < 4";
            if(type == 1)
            {
                condition = "RefType < 4";
            } else
            {
                condition = "RefType >= 4";
            }
            object codeLastest = _refDL.GetCodeLastest("Ref", "RefNo", condition);
            var myCode = codeLastest.ToString();
            var strRegex = "[0-9]+$";

            Regex myRegex = new Regex(strRegex);
            var newPrefix = Regex.Replace(myCode, strRegex, "");

            var newCode = _refDL.GetNewCode("Ref", "RefNo", newPrefix);
            return newCode;
        }

    }
}
