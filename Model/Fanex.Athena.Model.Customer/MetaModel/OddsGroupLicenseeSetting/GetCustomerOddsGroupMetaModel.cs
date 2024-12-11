using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Model.Customer.MetaModel.OddsGroupLicenseeSetting
{
    public class GetCustomerOddsGroupMetaModel : IMetaModelValidation, IMetaModelSubsidiarySearch, IMetaModelAgent, IMetaModelCurrencyIdList
    {
        public int LicenseeId { get; set; }

        public string CurrencyIdList { get; set; }

        public string AgentListXml { get; set; }

        public string SubsidiaryList { get; set; }

        public bool SubsidiarySearch { get; set; }

        public bool IsExcludedTestData { get; set; }

        public bool IsValid => true;
    }
}