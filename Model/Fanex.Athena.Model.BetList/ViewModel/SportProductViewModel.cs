using System.Collections.Generic;

namespace Fanex.Athena.Model.BetList.ViewModel
{
    public class SportProductViewModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public IEnumerable<int> LeagueGroupIds { get; set; } = new List<int> { 0 };
    }
}