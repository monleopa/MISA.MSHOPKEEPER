using MISA.Common.Filter;
using MISA.DL.Base;
using MISA.DL.Properties;
using MISA.Entity.Base;
using MISA.Entity.Dictionary;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.DL.Dictionary
{
    /// <summary>
    /// Quản lý việc thao tác với DB của đối tượng Ref
    /// </summary>
    public class RefDL:BaseDL
    {
        /// <summary>
        /// Lấy bản ghi Ref theo điều kiện phân trang, lọc
        /// </summary>
        /// <param name="storeName">Tên storeprocedure</param>
        /// <param name="dataCondition">Điều kiện phân trang, lọc</param>
        /// <returns>Danh sách Ref tương ứng</returns>
        /// Author: NDANH 28/8/2019
        public IEnumerable<Ref> GetData(string storeName, DataCondition dataCondition)
        {
            using (DataAccess dataAccess = new DataAccess())
            {
                // Khởi tạo đối tượng SqlDataReader để hứng kết quả trả về
                dataAccess.MappingParameters(dataCondition, storeName);
                SqlDataReader sqlDataReader = dataAccess.ExecuteReader(storeName);
                while (sqlDataReader.Read())
                {
                    var entity = new Ref();
                    for (int i = 0; i < sqlDataReader.FieldCount; i++)
                    {
                        // Lấy ra tên propertyName dựa vào tên cột hiện tại
                        var propertyName = sqlDataReader.GetName(i);

                        // Lấy ra giá trị của field hiện tại
                        var propertyValue = sqlDataReader.GetValue(i);
                        var propertyInfor = entity.GetType().GetProperty(propertyName);
                        if (propertyInfor != null && propertyValue != DBNull.Value)
                        {
                            propertyInfor.SetValue(entity, propertyValue);
                        }
                    }

                    yield return entity;
                }
            }

        }

        /// <summary>
        /// Trả về Ref và Ref chi tiết theo RefID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// Author: NDANH 30/8/2019
        public Ref GetRefByID(Guid id)
        {
            var @ref = GetDataByID<Ref>("@RefID", id.ToString(), "Proc_GetRefByID");
            var refDetailDL = new RefDetailDL();
            @ref.ListRefDetail = refDetailDL.GetDataByID("[dbo].[Proc_GetRefDetailsByID]", id).ToList();
            return @ref;
        }

        /// <summary>
        /// Thêm mới Ref
        /// </summary>
        /// <param name="ref"></param>
        /// <returns></returns>
        /// Author: NDANH 29/8/2019
        public AjaxResult InsertRef(Ref @ref)
        {
            var result = new AjaxResult();
            var storeName = "[dbo].[Proc_InsertRef]";
            var storeNameDetail = "[dbo].[Proc_InsertRefDetail]";

            using (DataAccess dataAccess = new DataAccess())
            {
                dataAccess.Transaction();
                try
                {
                    int resultNumber = 0;

                    #region Thêm mới Ref

                    @ref.RefID = Guid.NewGuid();
                    dataAccess.MappingParameters<Ref>(@ref, storeName);
                    resultNumber += dataAccess.ExecuteNonQuery();

                    #endregion

                    #region Thêm mới RefDetail

                    var listDetail = @ref.ListRefDetail;
                    foreach(var detail in listDetail)
                    {
                        dataAccess.ClearParam();
                        detail.RefID = @ref.RefID;
                        dataAccess.MappingParameters<RefDetail>(detail, storeNameDetail);
                        resultNumber += dataAccess.ExecuteNonQuery();
                    }

                    #endregion

                    dataAccess.Commit();
                    result.Data = @ref.RefID;
                    result.Message = Resources.SuccessCreated;
                }
                catch (Exception ex)
                {
                    dataAccess.RollBack();
                    result.Success = false;
                    result.Data = ex;
                    result.Message = Resources.FailCreated;
                }
            }

            return result;
        }

        /// <summary>
        /// Sửa Ref
        /// </summary>
        /// <param name="ref"></param>
        /// <returns></returns>
        /// Author: NDANH 29/8/2019
        public AjaxResult UpdateRef(Ref @ref)
        {
            var result = new AjaxResult();
            var storeName = "[dbo].[Proc_UpdateRef]";
            var storeNameDelete = "[dbo].[Proc_DeleteRefDetail]";
            var storeNameUpdate = "[dbo].[Proc_UpdateRefDetail]";

            using (DataAccess dataAccess = new DataAccess())
            {
                dataAccess.Transaction();
                try
                {
                    #region Thực hiện sửa Ref

                    var resultNumber = 0;
                    dataAccess.MappingParameters<Ref>(@ref, storeName);
                    resultNumber += dataAccess.ExecuteNonQuery();

                    #endregion

                    #region Thực hiện xóa RefDetail không tồn tại

                    var listDetail = @ref.ListRefDetail;
                    var stringID = String.Join(",", listDetail.Select(x => x.RefDetailID));
                    dataAccess.ClearParam();
                    dataAccess.CommandText(storeNameDelete);
                    dataAccess.MappingParameter("@RefID", @ref.RefID.ToString());
                    dataAccess.MappingParameter("@RefDetailID", stringID);
                    resultNumber += dataAccess.ExecuteNonQuery();

                    #endregion

                    #region Thực hiện update hoặc thêm mới RefDetail

                    foreach (var detail in listDetail)
                    {
                        detail.RefID = @ref.RefID;
                        dataAccess.ClearParam();
                        dataAccess.MappingParameters<RefDetail>(detail, storeNameUpdate);

                        if (detail.RefDetailID == default(Guid))
                        {
                            dataAccess.ChangeValueParameter("@RefDetailID", DBNull.Value);
                        }

                        resultNumber += dataAccess.ExecuteNonQuery();
                    }

                    #endregion

                    dataAccess.Commit();
                    result.Data = resultNumber;
                    result.Message = Resources.SuccessUpdated;
                }
                catch (Exception ex)
                {
                    dataAccess.RollBack();
                    result.Success = false;
                    result.Data = ex;
                    result.Message = Resources.FailUpdated;
                }
            }

            return result;
        }

        /// <summary>
        /// Xóa Ref theo listid
        /// </summary>
        /// <param name="strListId"></param>
        /// <returns></returns>
        /// Author: NDANH 1/9/2019
        public AjaxResult DeleteRef(string strListId)
        {
            var result = new AjaxResult();
            var storeName = "[dbo].[Proc_DeleteMultiRef]";

            using (DataAccess dataAccess = new DataAccess())
            {
                dataAccess.Transaction();
                try
                {
                    var resultNumber = 0;
                    dataAccess.CommandText(storeName);
                    dataAccess.MappingParameter("@RefID", strListId);
                    resultNumber += dataAccess.ExecuteNonQuery();

                    dataAccess.Commit();
                    result.Data = resultNumber;
                    result.Message = Resources.SuccessDeleted;
                }
                catch (Exception ex)
                {
                    dataAccess.RollBack();
                    result.Success = false;
                    result.Data = ex;
                    result.Message = Resources.FailDeleted;
                }
            }

            return result;
        }
    }
}
