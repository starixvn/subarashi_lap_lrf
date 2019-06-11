// -----------------------------------------------------------------------
// <copyright file="MatchWinLossMetaModel.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Model.Report.MetaModel
{
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.MetaModel;
    using System;
    using System.Linq;

    /// <summary>
    /// MatchWinLossMetaModel class.
    /// </summary>
    public class MatchWinLossMetaModel : BaseReportMetaModel, IMetaModelValidation
    {
        public MatchWinLossMetaModel()
        {
            Date = DateTime.Now;
        }

        public string BalanceUpDay { get; set; }

        public int MatchId { get; set; }

        public int LeagueId { get; set; }

        public DateTime Date { get; set; }
        private bool IsValidBaseCurrency => string.IsNullOrEmpty(BaseCurrency) || SystemConstants.BaseCurrencyList
           .Any(x => x.Value.Equals(BaseCurrency, StringComparison.OrdinalIgnoreCase));
        public bool IsValidDetailRequest => !string.IsNullOrEmpty(ProductCodeList) && MatchId > 0 && LeagueId > 0
            && IsValidBaseCurrency;
        public override bool IsValid => base.IsValid && IsValidBaseCurrency;

    }
}