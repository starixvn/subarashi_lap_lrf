// -----------------------------------------------------------------------
// <copyright file="WinLossByBetTypeMetaModel.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Model.Report.MetaModel
{
    using Fanex.Athena.Model.Core.DataDomain;
    using System;
    using System.Linq;

    /// <summary>
    /// WinLossByBetTypeMetaModel class.
    /// </summary>
    public class WinLossByBetTypeMetaModel : BaseReportMetaModel
    {
        public WinLossByBetTypeMetaModel()
        {
            FromDate = DateTime.Today;
            ToDate = DateTime.Today;
            SortDirection = "ASC";
            SortColumn = "BetTypeName";
        }

        public string SortDirection { get; set; }

        public string SortColumn { get; set; }

        public override bool IsValid
        {
            get
            {
                return FromDate <= ToDate
                    && SystemConstants.BaseCurrencyList.Any(i => i.Value.Equals(BaseCurrency, StringComparison.OrdinalIgnoreCase));
            }
        }
    }
}