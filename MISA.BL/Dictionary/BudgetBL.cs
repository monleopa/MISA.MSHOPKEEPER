using MISA.DL.Dictionary;
using MISA.Entity.Dictionary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.BL.Dictionary
{
    public class BudgetBL
    {
        private BudgetDL _budgetDL;
        public BudgetBL()
        {
            _budgetDL = new BudgetDL();
        }

        /// <summary>
        /// Gọi DL lấy danh sách Employee
        /// </summary>
        /// <returns>Danh sách Employee</returns>
        public IEnumerable<Budget> GetAllDataByID(int id)
        {
            string storeName = "[dbo].[Proc_GetAllBudgetByType]";

            return _budgetDL.GetDataByType<Budget>("@BudgetType", id, storeName);
        }
    }
}
