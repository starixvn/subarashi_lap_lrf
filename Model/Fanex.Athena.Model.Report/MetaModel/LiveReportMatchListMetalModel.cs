// -----------------------------------------------------------------------
// <copyright file="LiveReportMatchListMetalModel.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Model.Report.MetaModel
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.MetaModel;

    /// <summary>
    /// LiveReportMatchListMetalModel class.
    /// </summary>
    [Serializable]
    public class LiveReportMatchListMetalModel : BaseReportMetaModel, IMetaModelValidation
    {
        [Required]
        public int SportId { get; set; }

        public string ProductCode { get; set; }

        public int LiveIndicator { get; set; }

        public string SortDirection { get; set; }

        public string SortColumn { get; set; }

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