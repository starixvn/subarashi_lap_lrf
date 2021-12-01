using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.MetaModel;
using System;
using System.Linq;

namespace Fanex.Athena.Model.Report.MetaModel
{
    public class CustomerPendingFundsMetaModel : BaseReportMetaModel, IMetaModelValidation
    {
        public CustomerPendingFundsMetaModel()
        {
            PageIndex = 1;
            PageSize = DefaultPageSize;
            OrderItem = 0;
            IsAscSort = true;
        }

        public int OrderItem { get; set; }

        public bool IsAscSort { get; set; }

        public override bool IsValid
        {
            get
            {
                return string.IsNullOrEmpty(BaseCurrency) || SystemConstants.BaseCurrencyList
            .Any(x => x.Value.Equals(BaseCurrency, StringComparison.OrdinalIgnoreCase));
            }
        }
    }
}