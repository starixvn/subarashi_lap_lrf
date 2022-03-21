using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Athena.Model.BetList.ViewModel
{
    public class SportProductViewModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public IEnumerable<int> LeagueGroupIds { get; set; } = new List<int> { 0 };
    }
}
