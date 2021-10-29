using System.Collections.Generic;

namespace Fanex.Athena.Model.Report.MetaModel
{
    public class LeagueWinLossMetaModel : BaseDrilldownReportMetaModel
    {
        public int LeagueId { get; set; }

        public int MatchId { get; set; }

        public int BettypeId { get; set; }

        public int EventType { get; set; }

        public string MatchName { get; set; }

        public string LeagueName { get; set; }

        public string BetTypeIdList { get; set; }

        public string StatusIdList { get; set; }

        public string SportIdList { get; set; }

        public string DrillDownCurrencyName { get; set; }

        public string SortBy { get; set; }

        public string SortOrder { get; set; }

        public IDictionary<int, string> UserCurrencyList { get; set; }

        public string CurrencyIdList { get; set; }

        public bool IsGroupInOriginalCurrency { get; set; }

        public string BaseCurrencyName { get; set; }

        public bool ShowBA { get; set; }
    }
}