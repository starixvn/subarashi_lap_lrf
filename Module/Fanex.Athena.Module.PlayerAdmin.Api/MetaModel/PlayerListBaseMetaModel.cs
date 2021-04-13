using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Module.PlayerAdmin.Api.MetaModel
{
    public class PlayerListBaseMetaModel : LRFFiltersMetaModel, IMetaModelCurrencyIdList, IMetaModelAgent, IMetaModelSiteName
    {
        public string SiteName { get; set; }

        public string CurrencyIdList { get; set; }

        public string AgentListXml { get; set; }

        public bool IsExcludedTestData { get; set; }

        public string CustomerClass { get; set; }

        public string CommGroups { get; set; }

        public int IsDeposited { get; set; }

        public string WhiteLabels { get; set; }

        public string Subsidiaries { get; set; }

        public bool SearchBySubsidiary { get; set; }
    }
}
