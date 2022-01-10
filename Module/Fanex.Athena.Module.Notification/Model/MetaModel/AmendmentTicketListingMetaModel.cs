namespace Fanex.Athena.Module.Notification.MetaModel
{
    using Fanex.Athena.Model.Core.MetaModel;

    public class AmendmentTicketListingMetaModel : IMetaModelAgent
    {
        public string SessionId { get; set; }
        public string AgentListXml { get; set; }
        public bool IsExcludedTestData { get; set; }
    }
}
