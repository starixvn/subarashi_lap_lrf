// -----------------------------------------------------------------------
// <copyright file="WinLossByBetTypeMetaModel.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Model.Report.MetaModel
{
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.Helper;
    using Fanex.Athena.Model.Core.MetaModel;
    using System;
    using System.Linq;

    /// <summary>
    /// WinLossByBetTypeMetaModel class.
    /// </summary>
    public class WinLossByBetTypeMetaModel : BaseReportMetaModel, IMetaModelValidation
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
                return FromDate <= ToDate && MetaModelValidationHelper
                    .ValidateBaseCurrency(BaseCurrency);
            }
        }
    }
}