namespace Fanex.Athena.Model.Core.DTO.Common
{
    using System.Collections.Generic;
    using External;

    public class LeagueGroup
    {
        public int LeagueGroupId { get; set; }

        public string LeagueGroupName { get; set; }

        public IEnumerable<PortalApiLeagueResponse> LimitLeagues { get; set; }

        public IEnumerable<League> LimitLeaguesFromSP { get; set; }
    }
}