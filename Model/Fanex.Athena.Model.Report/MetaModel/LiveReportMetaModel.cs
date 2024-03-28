namespace Fanex.Athena.Model.Report.MetaModel
{
    using System;
    using System.Linq;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.MetaModel;

    [Serializable]
    public class LiveReportMetaModel : BaseReportMetaModel, IMetaModelSubsidiarySearch
    {
        public int LiveIndicator { get; set; }

        public override bool IsValid
        {
            get
            {
                return FromDate <= ToDate
                   && (string.IsNullOrEmpty(BaseCurrency) || SystemConstants.BaseCurrencyList
                   .Any(x => x.Value.Equals(BaseCurrency, StringComparison.OrdinalIgnoreCase)));
            }
        }

        public string SubsidiaryList { get; set; }

        public bool SubsidiarySearch { get; set; }
    }
}