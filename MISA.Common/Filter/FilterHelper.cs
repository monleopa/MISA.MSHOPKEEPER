using MISA.Entity.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Common.Filter
{
    /// <summary>
    /// Xây dựng câu truy vấn để lọc dữ liệu
    /// </summary>
    public class FilterHelper
    {
        /// <summary>
        /// Xây dựng câu truy vấn để lọc dữ liệu
        /// </summary>
        /// <param name="listFilter">Danh sách dữ liệu muốn lọc</param>
        /// <returns>Câu truy vấn tương ứng</returns>
        /// Author: NDANH (28/8/2019)
        public string BuildConditionSQL(IEnumerable<FilterEntity> listFilter)
        {
            string condition = "";
            string where = "";
            if (listFilter == null)
            {
                return DBNull.Value.ToString();
            }
            var filters = listFilter.ToList();
            var filterString = new List<string>();
            for (int i = 0; i < filters.Count; i++)
            {
                if(filters[i].FilterValue == "")
                {
                    continue;
                }
                switch (filters[i].FilterType)
                {
                    case Enumeration.FilterType.Equal:
                        where = string.Format("{0} = '{1}'", filters[i].FilterName, filters[i].FilterValue);
                        break;
                    case Enumeration.FilterType.Less:
                        where = string.Format("{0} < '{1}'", filters[i].FilterName, filters[i].FilterValue);
                        break;
                    case Enumeration.FilterType.LessOrEqual:
                        where = string.Format("{0} <= '{1}'", filters[i].FilterName, filters[i].FilterValue);
                        break;
                    case Enumeration.FilterType.Greater:
                        where = string.Format("{0} > '{1}'", filters[i].FilterName, filters[i].FilterValue);
                        break;
                    case Enumeration.FilterType.GreaterOrEqual:
                        where = string.Format("{0} >= '{1}'", filters[i].FilterName, filters[i].FilterValue);
                        break;
                    case Enumeration.FilterType.Contain:
                        where = string.Format("{0} LIKE N'%{1}%'", filters[i].FilterName, filters[i].FilterValue);
                        break;
                    case Enumeration.FilterType.NotContain:
                        where = string.Format("{0} NOT LIKE N'%{1}%'", filters[i].FilterName, filters[i].FilterValue);
                        break;
                    case Enumeration.FilterType.BeginWith:
                        where = string.Format("{0} LIKE N'{1}%'", filters[i].FilterName, filters[i].FilterValue);
                        break;
                    case Enumeration.FilterType.EndWith:
                        where = string.Format("{0} LIKE N'%{1}'", filters[i].FilterName, filters[i].FilterValue);
                        break;
                    case Enumeration.FilterType.Date:
                        var inDate = ConverStringToDate(filters[i].FilterValue);
                        //where = string.Format("{0} > '{1}' AND {2} < dateadd(day, 1, '{3}')", filters[i].FilterName, inDate, filters[i].FilterName, inDate);
                        where = string.Format("{0} = '{1}'", filters[i].FilterName, inDate);
                        break;
                    case Enumeration.FilterType.FromDate:
                        var dateConvertFromDate = ConverStringToDate(filters[i].FilterValue);
                        //where = string.Format("{0} > '{1}'", filters[i].FilterName, dateConvertFromDate);
                        where = string.Format("{0} > '{1}'", filters[i].FilterName, dateConvertFromDate);
                        break;
                    case Enumeration.FilterType.ToDate:
                        var dateConvertToDate = ConverStringToDate(filters[i].FilterValue);
                        //where = string.Format("{0} < dateadd(day, 1, '{1}')", filters[i].FilterName, dateConvertToDate);
                        where = string.Format("{0} < '{1}'", filters[i].FilterName, dateConvertToDate);
                        break;
                    case Enumeration.FilterType.FromGreaterDate:
                        var dateConvertFromGreaterDate = ConverStringToDate(filters[i].FilterValue);
                        //where = string.Format("{0} > dateadd(day, 1, '{1}')", filters[i].FilterName, dateConvertFromGreaterDate);
                        where = string.Format("{0} >= '{1}'", filters[i].FilterName, dateConvertFromGreaterDate);
                        break;
                    case Enumeration.FilterType.ToLessDate:
                        var dateConvertToLessDate = ConverStringToDate(filters[i].FilterValue);
                        //where = string.Format("{0} < '{1}'", filters[i].FilterName, dateConvertToLessDate);
                        where = string.Format("{0} <= '{1}'", filters[i].FilterName, dateConvertToLessDate);
                        break;
                    default:
                        break;
                }

                filterString.Add(where);
            }

            condition = String.Join(" AND ", filterString.ToArray());
            return condition.ToString();
        }

        /// <summary>
        /// Chuyển từ String dạng dd/mm/yyyy sang ngày
        /// </summary>
        /// <param name="date">Ngày tháng năm theo dạng string</param>
        /// <returns>Ngày theo dạng DateTime tương ứng</returns>
        public DateTime ConverStringToDate(string date)
        {
            var dateArray = date.Split('/');
            var dateConverted = new DateTime(Int32.Parse(dateArray[2]), Int32.Parse(dateArray[1]), Int32.Parse(dateArray[0]));

            return dateConverted;
        }
    }
}
