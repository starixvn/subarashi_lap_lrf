namespace Fanex.Athena.Model.Report.MetaModel
{
    using Fanex.Athena.Model.Core.Helper;
    using Fanex.Athena.Model.Core.MetaModel;
    using System;

    public class SubsidiaryPerformanceMetaModel: IMetaModelValidation, IMetaModelProductCodeList
    {
        public string AgentListXml { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public string ProductCodeList { get; set; }

        public string SubsidiaryList { get; set; } = string.Empty;

        public string WhiteLabelList { get; set; } = string.Empty;

        public string SubsidiaryId { get; set; }

        public string BaseCurrency { get; set; }

        public bool ConvertAll { get; set; }

        public string LicenseeName { get; set; }

        public bool IncludeRaw { get; set; }

        public bool IsExcludeTest { get; set; }

        public bool IsValid => FromDate <= ToDate &&
                                !string.IsNullOrEmpty(ProductCodeList) &&
                                MetaModelValidationHelper.ValidateBaseCurrency(BaseCurrency, false);
    }
}