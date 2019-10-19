using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entity.Dictionary
{
    public class RefTarget
    {
        public Guid RefTargetID { get; set; }
        public string RefTargetCode { get; set; }
        public string RefTargetName { get; set; }
        public int RefTargetType { get; set; }
    }
}
