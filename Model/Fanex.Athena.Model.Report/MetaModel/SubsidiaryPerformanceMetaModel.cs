namespace Fanex.Athena.Model.Report.MetaModel
{
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.MetaModel;
    using System;
    using System.Linq;

    public class SubsidiaryPerformanceMetaModel: IMetaModelValidation
    {
        public string AgentListXml { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public string ProductCodeList { get; set; }

        public string SubsidiaryList { get; set; } = string.Empty;

        public string SubsidiaryId { get; set; }

        public string BaseCurrency { get; set; }

        public bool ConvertAll { get; set; }

        public string LicenseeName { get; set; }

        public bool IncludeRaw { get; set; }

        public bool IsExcludeTest { get; set; }

        public bool IsValid => FromDate <= ToDate &&
                                !string.IsNullOrEmpty(ProductCodeList) &&
                                !string.IsNullOrEmpty(BaseCurrency)
            && SystemConstants.BaseCurrencyList.Any(
                i => i.Value.Equals(BaseCurrency, StringComparison.OrdinalIgnoreCase));
    }
}