namespace Fanex.Athena.Module.PlayerAdmin.MetaModel
{
    public class PlayerListCommandBaseDbParam
    {
        public int LicenseeId { get; set; }

        public int UserId { get; set; }

        public int CustId { get; set; }

        public string Ip { get; set; }

        public string Language { get; set; }

        public string AgentListXml { get; set; }
    }
}