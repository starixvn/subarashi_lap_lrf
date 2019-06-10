// -----------------------------------------------------------------------
// <copyright file="MatchWinLossMetaModel.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Model.Report.MetaModel
{
    using Fanex.Athena.Model.Core.DataDomain;
    using System;
    using System.Linq;

    /// <summary>
    /// MatchWinLossMetaModel class.
    /// </summary>
    public class MatchWinLossMetaModel : BaseReportMetaModel
    {
        public MatchWinLossMetaModel()
        {
            Date = DateTime.Now;
        }

        public string BalanceUpDay { get; set; }

        public int MatchId { get; set; }

        public int LeagueId { get; set; }

        public DateTime Date { get; set; }

        public bool IsValidDetailRequest => !string.IsNullOrEmpty(ProductCodeList) && MatchId > 0 && LeagueId > 0
            && SystemConstants.BaseCurrencyList.Any(x => x.Value.Equals(BaseCurrency, StringComparison.OrdinalIgnoreCase));

    }
}