using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.DL.Base
{
    /// <summary>
    /// Class dùng để kết nối với database
    /// </summary>
    /// Author: NDANH (28/08/2019)
    public class DataAccess : IDisposable
    {
        protected SqlConnection _sqlConnection;
        protected SqlCommand _sqlCommand;
        protected string _connectionString;
        protected SqlTransaction _sqlTransaction;

        /// <summary>
        /// Description: Kết nối với database
        /// Author: NDANH (28/08/2019)
        /// </summary>
        public DataAccess()
        {
            //_connectionString = @"Data Source=SQL5046.site4now.net;Initial Catalog=DB_A4D0C4_monleopa;User Id=DB_A4D0C4_monleopa_admin;Password=Youknowher@7897;";
            _connectionString = @"Data Source=DATABASE\SQL2014;Initial Catalog=MISA.MSHOPKEEPER_NDANH_Developer;Integrated Security=True";

            //Khởi tạo kết nối với DB
            _sqlConnection = new SqlConnection(_connectionString);

            // Khởi tạo đối tượng command để thao tác với database
            _sqlCommand = _sqlConnection.CreateCommand();

            // Khai báo kiểu thao tác với DB
            _sqlCommand.CommandType = CommandType.StoredProcedure;

            // Mở kết nối
            _sqlConnection.Open();
        }

        /// <summary>
        /// Clear tất cả các tham số
        /// Author: NDANH (28/08/2019)
        /// </summary>
        public void ClearParam()
        {
            _sqlCommand.Parameters.Clear();
        }

        /// <summary>
        /// Khởi tạo transaction
        /// Author: NDANH (28/08/2019)
        /// </summary>
        public void Transaction()
        {
            _sqlTransaction = _sqlCommand.Connection.BeginTransaction();
            _sqlCommand.Transaction = _sqlTransaction;
        }

        /// <summary>
        /// Lưu thay đổi vào DB
        /// Author: NDANH (28/08/2019)
        /// </summary>
        public void Commit()
        {
            _sqlTransaction.Commit();
        }

        /// <summary>
        /// Không lưu thay đổi vào DB
        /// Author: NDANH (28/08/2019)
        /// </summary>
        public void RollBack()
        {
            _sqlTransaction.Rollback();
        }

        /// <summary>
        /// Khởi tạo tên storeprocedure thực thi
        /// </summary>
        /// <param name="storeName">Tên storeprocedure</param>
        /// Author: NDANH (28/08/2019)
        public void CommandText(string storeName)
        {
            _sqlCommand.CommandText = storeName;
        }

        /// <summary>
        /// Thay đổi giá trị tham số
        /// </summary>
        /// <param name="paramName">Tên tham số</param>
        /// <param name="paramValue">Giá trị tham số</param>
        /// Author: NDANH (28/08/2019)
        public void ChangeValueParameter(string paramName, object paramValue)
        {
            _sqlCommand.Parameters[paramName].Value = paramValue;
        }

        /// <summary>
        /// Map 1 giá trị đối với procedure có 1 tham số
        /// </summary>
        /// <param name="param">Giá trị tham số</param>
        /// <param name="paramName">Tên tham số</param>
        /// <param name="storeName">Tên storeprocedure</param>
        /// Author: NDANH (28/08/2019)
        public void MappingParameter(string paramName, object paramValue)
        {
            _sqlCommand.Parameters.AddWithValue(paramName, paramValue);
        }

        /// <summary>
        /// Thực hiện map nhiều giá trị với nhiều tham số trong storeprocedure
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entity">Đối tượng map</param>
        /// <param name="storeName">Tên procedure</param>
        /// Author: NDANH (28/08/2019)
        public void MappingParameters<T>(T entity, string storeName)
        {
            _sqlCommand.CommandText = storeName;
            SqlCommandBuilder.DeriveParameters(_sqlCommand);
            var sqlParameter = _sqlCommand.Parameters;

            // Mapping từng tham số với từng giá trị tương ứng
            for (int i = 1; i < sqlParameter.Count; i++)
            {
                var parameterName = sqlParameter[i].ParameterName.Replace("@", string.Empty);
                var property = entity.GetType().GetProperty(parameterName);

                if (property != null)
                {
                    sqlParameter[i].Value = property.GetValue(entity) ?? DBNull.Value;
                }
                else
                {
                    sqlParameter[i].Value = DBNull.Value;
                }
            }
        }

        /// <summary>
        /// Thực thi câu lệnh trả về dữ liệu
        /// </summary>
        /// <returns>Table sau khi thực thi câu lệnh hoặc store</returns>
        /// Author: NDANH (28/08/2019)
        public SqlDataReader ExecuteReader()
        {
            return _sqlCommand.ExecuteReader();

        }

        /// <summary>
        /// Thực thi câu lệnh trả về dữ liệu
        /// </summary>
        /// <param name="storeName">Tên storeprodure muốn gọi</param>
        /// <returns>Table sau khi thực thi câu lệnh hoặc store</returns>
        /// Author: NDANH (28/08/2019)
        public SqlDataReader ExecuteReader(string storeName)
        {
            _sqlCommand.CommandText = storeName;
            return _sqlCommand.ExecuteReader();
        }

        /// <summary>
        /// Thực thi câu lệnh lấy dữ liệu
        /// </summary>
        /// <returns>Số bản ghi ảnh hưởng</returns>
        /// Author: NDANH (28/08/2019)
        public int ExecuteNonQuery()
        {
            return _sqlCommand.ExecuteNonQuery();
        }

        /// <summary>
        /// Thực hiện executenonquery ứng với storeName tương ứng
        /// </summary>
        /// <param name="storeName">Tên storeprocedure</param>
        /// <returns>Số bản ghi ảnh hưởng</returns>
        /// Author: NDANH (28/08/2019)
        public int ExecuteNonQuery(string storeName)
        {
            _sqlCommand.CommandText = storeName;
            return _sqlCommand.ExecuteNonQuery();
        }

        /// <summary>
        /// Thực hiện executescalar trong database
        /// </summary>
        /// <returns>Đối tượng mà scalar thực hiện được</returns>
        /// Author: NDANH (28/08/2019)
        public object ExecuteScalar()
        {
            return _sqlCommand.ExecuteScalar();
        }

        /// <summary>
        /// Thực hiện executescalar trong database ứng với storeName tương ứng
        /// </summary>
        /// <param name="storeName">Tên storeprocedure</param>
        /// <returns>Đối tượng mà scalar thực hiện được</returns>
        /// Author: NDANH (28/08/2019)
        public object ExecuteScalar(string storeName)
        {
            _sqlCommand.CommandText = storeName;
            return _sqlCommand.ExecuteScalar();
        }

        /// <summary>
        /// Đóng kết nối khi dừng using
        /// </summary>
        /// Author: NDANH (28/08/2019)
        public void Dispose()
        {
            _sqlConnection.Close();
        }
    }
}
