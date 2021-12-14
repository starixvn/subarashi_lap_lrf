namespace Fanex.Athena.Model.Report.MetaModel
{
    using Fanex.Athena.Model.Core.Helper;
    using Fanex.Athena.Model.Core.MetaModel;
    using System;

    public class WinLossByBetTypeMetaModel : BaseReportMetaModel, IMetaModelValidation, IMetaModelSubsidiarySearch
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

        public string SubsidiaryList { get; set; }

        public bool SubsidiarySearch { get; set; }

        public override bool IsValid
        {
            get
            {
                return FromDate <= ToDate && MetaModelHelper
                    .ValidateBaseCurrency(BaseCurrency);
            }
        }
    }
}