using Fanex.Athena.Model.Core.Helper;
using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Model.Report.MetaModel
{
    public class ExchangeWinLossMetaModel : BaseReportMetaModel, IMetaModelValidation
    {
        public byte ReportBy { get; set; }

        public int CustId { get; set; }

        public int Level { get; set; }

        public override bool IsValid
        {
            get
            {
                return FromDate <= ToDate && MetaModelValidationHelper
                    .ValidateBaseCurrency(BaseCurrency);
            }
        }

        public string DefaultBaseCurrency { get; set; }
    }
}