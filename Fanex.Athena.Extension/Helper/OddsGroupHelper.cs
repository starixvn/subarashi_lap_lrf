using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Athena.Extension.Helper
{
    public static class OddsGroupHelper
    {
        public static IEnumerable<string> GetOddsGroups()
        {
            return new List<string>
            {
                "A", "B", "C", "D", "E", "F", "I", "M", "Q"
            };
        }
    }
}
