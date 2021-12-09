namespace Fanex.Athena.Model.Report.MetaModel
{
    using Fanex.Athena.Model.Core.MetaModel;

    public class CustomerSupportTaskMetaModel : IMetaModelAgent, IMetaModelCurrencyIdList, IMetaModelValidation
    {
        const int ReportTypeMaxValue = 3;

        public string AgentListXml { get; set; }
        public bool IsExcludedTestData { get; set; }
        public string CurrencyIdList { get; set; }

        public byte SupportTask { get; set; }

        public bool IsValid => !string.IsNullOrEmpty(CurrencyIdList) && SupportTask >= 0 && SupportTask <= ReportTypeMaxValue;
    }
}