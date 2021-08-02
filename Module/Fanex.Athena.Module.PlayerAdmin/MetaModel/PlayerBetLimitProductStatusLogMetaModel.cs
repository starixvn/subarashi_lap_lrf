namespace Fanex.Athena.Module.PlayerAdmin.MetaModel
{
    public class PlayerBetLimitProductStatusLogMetaModel
    {
        public int CustId { get; set; }

        public int UserId { get; set; }

        public int LicenseeCustId { get; set; }

        public string SiteName { get; set; }

        public PlayerBetLimitProductStatusDetailLogMetaModel Detail { get; set; }
    }
}