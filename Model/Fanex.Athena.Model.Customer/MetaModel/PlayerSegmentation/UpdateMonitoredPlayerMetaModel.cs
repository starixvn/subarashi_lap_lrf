using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Model.Customer.MetaModel
{
    public class UpdateMonitoredPlayerMetaModel : IMetaModelValidation, IMetaModelAgent, IMetaModelUserId, IMetaModelIp
    {
        public int CustId { get; set; }

        public decimal WinningThreshold { get; set; }

        public string AgentListXml { get; set; }
        public bool IsExcludedTestData { get; set; }

        public int UserId { get; set; }
        public string Ip { get; set; }

        public bool IsValid => CustId > 0 && WinningThreshold > 0;
    }
}
