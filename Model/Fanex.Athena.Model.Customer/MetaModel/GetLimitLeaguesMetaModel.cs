using System.Collections.Generic;
using Fanex.Athena.Model.Core.DTO.Common;

namespace Fanex.Athena.Model.Customer.MetaModel
{
    public class GetLimitLeaguesMetaModel
    {
        public int SportType { get; set; }

        public IEnumerable<LeagueGroup> LeagueGroups { get; set; }
    }
}