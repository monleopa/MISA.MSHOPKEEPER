using MISA.DL.Dictionary;
using MISA.Entity.Dictionary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.BL.Dictionary
{
    public class EmployeeBL
    {
        private EmployeeDL _employeeDL;
        public EmployeeBL ()
        {
            _employeeDL = new EmployeeDL();
        }

        /// <summary>
        /// Gọi DL lấy danh sách Employee
        /// </summary>
        /// <returns>Danh sách Employee</returns>
        public IEnumerable<Employee> GetAllData()
        {
            string storeName = "[dbo].[Proc_GetAllEmployee]";
            return _employeeDL.GetData<Employee>(storeName);
        }
    }
}
