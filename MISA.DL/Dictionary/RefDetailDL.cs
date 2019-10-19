using MISA.DL.Base;
using MISA.Entity.Dictionary;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.DL.Dictionary
{
    public class RefDetailDL
    {
        /// <summary>
        /// Lấy RefDetail theo RefID
        /// </summary>
        /// <param name="storeName">Tên storeprocedure</param>
        /// <param name="refID">RefID</param>
        /// <returns>Danh sách RefDetail tương ứng</returns>
        /// Author: NDANH 28/8/2019
        public IEnumerable<RefDetail> GetDataByID(string storeName, Guid refID)
        {
            using (DataAccess dataAccess = new DataAccess())
            {
                // Khởi tạo đối tượng SqlDataReader để hứng kết quả trả về
                dataAccess.CommandText(storeName);
                dataAccess.MappingParameter("@RefID", refID);
                SqlDataReader sqlDataReader = dataAccess.ExecuteReader();
                while (sqlDataReader.Read())
                {
                    var refDetail = new RefDetail();
                    for (int i = 0; i < sqlDataReader.FieldCount; i++)
                    {
                        // Lấy ra tên propertyName dựa vào tên cột hiện tại
                        var propertyName = sqlDataReader.GetName(i);

                        // Lấy ra giá trị của field hiện tại
                        var propertyValue = sqlDataReader.GetValue(i);
                        var propertyInfor = refDetail.GetType().GetProperty(propertyName);
                        if (propertyInfor != null && propertyValue != DBNull.Value)
                        {
                            propertyInfor.SetValue(refDetail, propertyValue);
                        }
                    }

                    yield return refDetail;
                }
            }

        }
    }
}
