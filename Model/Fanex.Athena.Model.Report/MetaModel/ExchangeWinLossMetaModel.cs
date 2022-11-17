using Fanex.Athena.Model.Core.Helper;
using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Model.Report.MetaModel
{
    public class ExchangeWinLossMetaModel : BaseReportMetaModel, IMetaModelValidation, IMetaModelSubsidiarySearch
    {
        public byte ReportBy { get; set; }

        public byte DateOptionType { get; set; }

        public int CustId { get; set; }

        public int Level { get; set; }

        public string UserName { get; set; }

        public override bool IsValid
        {
            get
            {
                return FromDate <= ToDate && MetaModelHelper
                    .ValidateBaseCurrency(BaseCurrency);
            }
        }

        public string DefaultBaseCurrency { get; set; }
        public string SubsidiaryList { get; set; }
        public bool SubsidiarySearch { get; set; }
    }
}