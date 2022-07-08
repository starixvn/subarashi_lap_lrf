using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Model.Customer.MetaModel
{
    public class InsertMonitoredPlayerMetaModel : IMetaModelValidation, IMetaModelAgent, IMetaModelUserId, IMetaModelIp
    {
        public string SystemId { get; set; }
        public string ExternalId { get; set; }

        public decimal WinningThreshold { get; set; }

        public string AgentListXml { get; set; }
        public bool IsExcludedTestData { get; set; }

        public int UserId { get; set; }
        public string Ip { get; set; }

        public bool IsValid => WinningThreshold > 0 && (!string.IsNullOrWhiteSpace(SystemId) || !string.IsNullOrWhiteSpace(ExternalId));
    }
}
