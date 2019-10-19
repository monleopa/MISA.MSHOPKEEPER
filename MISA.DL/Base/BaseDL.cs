using MISA.Entity.Base;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.DL.Base
{
    /// <summary>
    /// Lớp dùng chung để thao tác với cơ sở dữ liệu
    /// </summary>
    public class BaseDL
    {
        /// <summary>
        /// Lấy bản ghi của 1 thực thể trong DB
        /// </summary>
        /// <typeparam name="T">Thực thể muốn lấy</typeparam>
        /// <param name="storeName">Tên store procedure</param>
        /// <returns>Danh sách bản ghi</returns>
        /// Author: NDANH (28/8/2019)
        public IEnumerable<T> GetData<T>(string storeName)
        {
            using (DataAccess dataAccess = new DataAccess())
            {
                // Khởi tạo đối tượng SqlDataReader để hứng kết quả trả về
                SqlDataReader sqlDataReader = dataAccess.ExecuteReader(storeName);
                while (sqlDataReader.Read())
                {
                    var entity = Activator.CreateInstance<T>();
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
        /// Lấy bản ghi của 1 thực thể trong DB theo loại
        /// </summary>
        /// <typeparam name="T">Thực thể muốn lấy</typeparam>
        /// <param name="paramName">Tên tham số</param>
        /// <param name="paramValue">Giá trị tham số</param>
        /// <param name="storeName">Tên storeprocedure</param>
        /// <returns>Danh sách bản ghi tương ứng</returns>
        /// Author: DNANH 28/8/2019
        public IEnumerable<T> GetDataByType<T>(string paramName, object paramValue, string storeName)
        {
            using (DataAccess dataAccess = new DataAccess())
            {
                dataAccess.CommandText(storeName);
                dataAccess.MappingParameter(paramName, paramValue);
                SqlDataReader sqlDataReader = dataAccess.ExecuteReader();
                var entity = Activator.CreateInstance<T>();
                while (sqlDataReader.Read())
                {
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
        /// Lấy bản ghi của 1 thực thể trong DB theo id
        /// </summary>
        /// <typeparam name="T">Thực thể muốn lấy</typeparam>
        /// <param name="paramName">Tên tham số</param>
        /// <param name="paramValue">Giá trị tham số</param>
        /// <param name="storeName">Tên storeprocedure</param>
        /// <returns>Bản ghi tương ứng</returns>
        /// Author: DNANH 28/8/2019
        public T GetDataByID<T>(string paramName, object paramValue, string storeName)
        {
            using (DataAccess dataAccess = new DataAccess())
            {
                dataAccess.CommandText(storeName);
                dataAccess.MappingParameter(paramName, paramValue);
                SqlDataReader sqlDataReader = dataAccess.ExecuteReader();
                var entity = Activator.CreateInstance<T>();
                if (sqlDataReader.Read())
                {
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
                }

                return entity;
            }
        }

        /// <summary>
        /// Lưu dữ liệu vào trong DB
        /// </summary>
        /// <typeparam name="T">Thực thể muốn lưu</typeparam>
        /// <param name="entity">Đối tượng</param>
        /// <param name="storeName">Tên storeprocedure</param>
        /// <returns>Danh sách bản ghi bị ảnh hưởng</returns>
        public virtual int SaveData<T>(T entity, string storeName)
        {
            var result = 0;
            using (DataAccess dataAccess = new DataAccess())
            {
                try
                {
                    dataAccess.Transaction();
                    dataAccess.MappingParameters<T>(entity, storeName);
                    result += dataAccess.ExecuteNonQuery();
                    dataAccess.Commit();
                }
                catch (Exception)
                {
                    dataAccess.RollBack();
                    result = 0;
                }

            }

            return result;
        }

        /// <summary>
        /// Thêm mới bản ghi vào trong DB
        /// </summary>
        /// <typeparam name="T">Thực thể muốn thêm</typeparam>
        /// <param name="entity">Đối tượng muốn thêm</param>
        /// <param name="storeName">Tên storeprocedure</param>
        /// <returns>Số bản ghi ảnh thưởng</returns>
        /// Author: DNANH 28/8/2019
        public int Insert<T>(T entity, string storeName)
        {
            return SaveData(entity, storeName);
        }

        /// <summary>
        /// Thêm mới bản ghi vào trong DB
        /// </summary>
        /// <typeparam name="T">Thực thể muốn thêm</typeparam>
        /// <param name="entity">Đối tượng muốn thêm</param>
        /// <param name="storeName">Tên storeprocedure</param>
        /// <returns>Số bản ghi ảnh thưởng</returns>
        /// Author: DNANH 28/8/2019
        public int Update<T>(T entity, string storeName)
        {
            return SaveData(entity, storeName);
        }

        /// <summary>
        /// Thực hiện xóa dữ liệu
        /// </summary>
        /// <param name="storeName">Tên storeprocedure</param>
        /// <param name="listId">danh sách id của bản ghi muốn xóa</param>
        /// <returns>Số bản ghi xóa thành công</returns>
        /// Author: NDANH 28/8/2019
        public int Delete(string storeName, IEnumerable<string> listId)
        {
            using (DataAccess dataAccess = new DataAccess())
            {
                return dataAccess.ExecuteNonQuery(storeName);
            }
        }

        /// <summary>
        /// Check mã trùng
        /// </summary>
        /// <param name="storeName">Tên storeprocedure</param>
        /// <param name="parameterNameID">Tên tham số của ID</param>
        /// <param name="parameterNameCode">Tên tham số mã</param>
        /// <param name="parameterValueID">Giá trị ID</param>
        /// <param name="parameterValueCode">Giá trị mã check</param>
        /// <param name="actionType">Loại hành động check thêm/sửa</param>
        /// <returns>true = trùng | false = không trùng</returns>
        /// Author: NDANH 29/8/2019
        public bool CheckCodeExisted(string storeName,string parameterNameID, string parameterNameCode, Guid? parameterValueID, string parameterValueCode, Enumeration.ActionType actionType)
        {
            var check = new object();
            using (DataAccess dataAccess = new DataAccess())
            {
                dataAccess.CommandText(storeName);
                if (actionType == Enumeration.ActionType.Insert)
                {
                    dataAccess.MappingParameter(parameterNameID, DBNull.Value.ToString());
                    dataAccess.MappingParameter(parameterNameCode, parameterValueCode);
                }
                else
                {
                    dataAccess.MappingParameter(parameterNameID, parameterValueID);
                    dataAccess.MappingParameter(parameterNameCode, parameterValueCode);
                }

                check = dataAccess.ExecuteScalar();
            }

            if (check != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// Lấy giá trị gần nhất của columnName trong tableName
        /// </summary>
        /// <param name="tableName">Tên bảng</param>
        /// <param name="columnName">Tên cột</param>
        /// <returns>Giá trị gần nhất</returns>
        public object GetCodeLastest(string tableName, string columnName, string condition)
        {
            var storeName = "[dbo].[Proc_GetCodeLastest]";
            object codeLastes;

            using (DataAccess dataAccess = new DataAccess())
            {
                dataAccess.CommandText(storeName);
                dataAccess.MappingParameter("@TableName", tableName);
                dataAccess.MappingParameter("@ColumnName", columnName);
                dataAccess.MappingParameter("@Condition", condition);
                codeLastes = dataAccess.ExecuteScalar();
            }

            return codeLastes;
        }

        /// <summary>
        /// Lấy mã mới
        /// </summary>
        /// <param name="tableName">Tên bảng</param>
        /// <param name="columnName">Tên cột</param>
        /// <param name="prefix">Tiền tố mã</param>
        /// <returns>mã mới</returns>
        public object GetNewCode(string tableName, string columnName, string prefix)
        {
            var storeName = "[dbo].[Proc_GetNewCode]";
            object newCode;

            using (DataAccess dataAccess = new DataAccess())
            {
                dataAccess.CommandText(storeName);
                dataAccess.MappingParameter("@TableName", tableName);
                dataAccess.MappingParameter("@ColumnName", columnName);
                dataAccess.MappingParameter("@Prefix", prefix);
                newCode = dataAccess.ExecuteScalar();
            }

            return newCode;
        }
    }
}
