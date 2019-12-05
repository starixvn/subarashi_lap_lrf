namespace Fanex.Athena.Model.Report.MetaModel
{
    using Fanex.Athena.Model.Core.MetaModel;
    using System;

    public class PromotionPrizeMetaModel : IMetaModelValidation, IMetaModelCurrency, IMetaModelAgent
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
    }
}