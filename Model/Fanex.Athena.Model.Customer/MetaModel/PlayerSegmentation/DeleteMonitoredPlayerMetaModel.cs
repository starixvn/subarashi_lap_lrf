using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Model.Customer.MetaModel
{
    public class DeleteMonitoredPlayerMetaModel : IMetaModelValidation, IMetaModelAgent, IMetaModelUserId, IMetaModelIp
    {
        public string CustIds { get; set; }

        public string AgentListXml { get; set; }

        public bool IsExcludedTestData { get; set; }

        public int UserId { get; set; }

        public string Ip { get; set; }

        public bool IsValid => !string.IsNullOrWhiteSpace(CustIds);
    }
}