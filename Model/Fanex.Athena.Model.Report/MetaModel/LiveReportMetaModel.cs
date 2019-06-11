// -----------------------------------------------------------------------
// <copyright file="LiveReportMetaModel.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Model.Report.MetaModel
{
    using Fanex.Athena.Model.Core.DataDomain;
    using System;
    using System.Linq;

    [Serializable]
    public class LiveReportMetaModel : BaseReportMetaModel
    {
        public bool IsViewedHistory { get; set; }

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
    }
}