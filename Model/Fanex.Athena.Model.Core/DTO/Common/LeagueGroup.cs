using System.Collections.Generic;
using Fanex.Athena.Model.Core.DTO.External;

namespace Fanex.Athena.Model.Core.DTO.Common
{
    public class LeagueGroup
    {
        public int LeagueGroupId { get; set; }

        public string LeagueGroupName { get; set; }

        public IEnumerable<PortalApiLeagueResponse> LimitLeagues { get; set; }
    }
}