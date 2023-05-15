using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Athena.Model.Customer.DTO
{
    public class RiskLevel
    {
        public const string Uncategorized = "Uncategorized";

        public string Id { get; set; }

        public String Key { get; set; }

        public String Name { get; set; }

        public IEnumerable<string> CustomerClassList { get; set; } = Enumerable.Empty<string>();
    }
}