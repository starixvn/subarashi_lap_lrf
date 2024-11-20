namespace Fanex.Athena.Model.Customer.MetaModel
{
    using System.Collections.Generic;
    using Core.DTO.Common;

    public class GetLimitLeaguesMetaModel
    {
        public int SportType { get; set; }

        public IEnumerable<LeagueGroup> LeagueGroups { get; set; }
    }
}