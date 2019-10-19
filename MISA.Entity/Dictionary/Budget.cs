using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entity.Dictionary
{
    public class Budget
    {
        public Guid BudgetID { get; set; }
        public string BudgetName { get; set; }
        public int BudgetType{ get; set; }
    }
}
