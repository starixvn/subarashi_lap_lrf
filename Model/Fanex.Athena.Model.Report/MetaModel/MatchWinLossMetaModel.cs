namespace Fanex.Athena.Model.Report.MetaModel
{
    using System;
    using System.Linq;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.MetaModel;

    public class MatchWinLossMetaModel : BaseReportMetaModel, IMetaModelValidation, IMetaModelSubsidiarySearch
    {
        public MatchWinLossMetaModel()
        {
            Date = DateTimeHelper.Now;
        }

        public string BalanceUpDay { get; set; }

        public int MatchId { get; set; }

        public int LeagueId { get; set; }

        public DateTime Date { get; set; }

        public string SubsidiaryList { get; set; }

        public bool SubsidiarySearch { get; set; }

        private bool IsValidBaseCurrency => string.IsNullOrEmpty(BaseCurrency) || SystemConstants.BaseCurrencyList
           .Any(x => x.Value.Equals(BaseCurrency, StringComparison.OrdinalIgnoreCase));

        public bool IsValidDetailRequest => !string.IsNullOrEmpty(ProductCodeList) && MatchId > 0 && LeagueId > 0
            && IsValidBaseCurrency;

        public override bool IsValid => base.IsValid && IsValidBaseCurrency;
    }
}