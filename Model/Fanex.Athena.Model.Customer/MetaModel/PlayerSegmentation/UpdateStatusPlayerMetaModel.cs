using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Model.Customer.MetaModel
{
    public class UpdateStatusPlayerMetaModel : IMetaModelValidation, IMetaModelAgent, IMetaModelUserId, IMetaModelIp
    {
        public string SystemIds { get; set; }
        public string ExternalIds { get; set; }

        public bool IsVip { get; set; }

        public string AgentListXml { get; set; }
        public bool IsExcludedTestData { get; set; }

        public int UserId { get; set; }
        public string Ip { get; set; }

        public bool IsValid => !string.IsNullOrWhiteSpace(SystemIds) || !string.IsNullOrWhiteSpace(ExternalIds);
    }
}