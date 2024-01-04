namespace Fanex.Athena.Model.Report.MetaModel
{
    using System;
    using Fanex.Athena.Model.Core.MetaModel;

    public class PromotionPrizeMetaModel : IMetaModelValidation, IMetaModelCurrency, IMetaModelAgent, IMetaModelSubsidiarySearch
    {
        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public int CurrencyId { get; set; }

        public string CurrencyName { get; set; }

        public string UserName { get; set; }

        public string AgentListXml { get; set; }

        public bool IsExcludedTestData { get; set; }

        public int AgentId { get; set; }

        public bool IsValid => FromDate <= ToDate;

        public bool IsVIPPlayerOnly { get; set; }

        public bool HasVIPManagementPermission { get; set; }

        public string SubsidiaryList { get; set; }

        public bool SubsidiarySearch { get; set; }
    }
}