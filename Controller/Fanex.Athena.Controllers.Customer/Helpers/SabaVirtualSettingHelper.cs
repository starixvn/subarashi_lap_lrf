using Fanex.Athena.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Athena.Controllers.Customer.Helpers
{
    public static class SabaVirtualSettingHelper
    {
        public static IDictionary<int, string> GenerateDangerLevelList(bool includeNone = false)
        {
            var result = new Dictionary<int, string>();
            const int beginLevel = 1;
            const int endLevel = 15;

            if (includeNone)
            {
                result.Add(0, ViewResources.None);
            }

            for (int i = beginLevel; i <= endLevel; i++)
            {
                result.Add(i, i.ToString());
            }

            return result;
        }
    }
}