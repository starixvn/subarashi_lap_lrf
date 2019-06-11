using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.MetaModel;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Fanex.Athena.Model.BetList.MetaModel
{
    public class LastBetsMonitoringMetaModel : IMetaModelValidation
    {
        private const int DefaultPageSize = 10;

        public LastBetsMonitoringMetaModel()
        {
            PageSize = DefaultPageSize;
        }

        public int SportId { get; set; }

        public int LeagueId { get; set; }

        public int MatchId { get; set; }

        public string BetType { get; set; }

        public string Level { get; set; }

        public int LiveStatus { get; set; }

        public string OddsType { get; set; }

        public int TimeZone { get; set; }

        public string Currency { get; set; }

        public string BasedCurrency { get; set; }

        public int StakeFrom { get; set; }

        public int StakeTo { get; set; }

        public int PageSize { get; set; }

        public long TransId { get; set; }

        public int BetFrom { get; set; }

        public string AgentListXml { get; set; }

        public IDictionary<int, string> UserCurrencyList { get; set; }
        public bool IsValid => SystemConstants.BaseCurrencyList
            .Any(x => x.Value.Equals(BasedCurrency, StringComparison.OrdinalIgnoreCase));
    }
}