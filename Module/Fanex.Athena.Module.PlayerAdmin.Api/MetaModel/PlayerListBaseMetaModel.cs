using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Module.PlayerAdmin.Api.MetaModel
{
    public class PlayerListBaseMetaModel : IMetaModelCurrencyIdList, IMetaModelAgent, IMetaModelSiteName
    {
        public string SiteName { get; set; }

        public string CurrencyIdList { get; set; }

        public string AgentListXml { get; set; }

        public bool IsExcludedTestData { get; set; }
    }
}