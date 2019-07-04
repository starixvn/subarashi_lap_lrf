namespace Fanex.Athena.Module.PlayerAdmin.MetaModel
{
    public class SearchPlayerMetaModel
    {
        public int LicenseeId { get; set; }

        public byte SearchOption { get; set; }

        public string UserName { get; set; } = string.Empty;

        public string BankAccountNumber { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Currency { get; set; } = string.Empty;

        public string OddsGroup { get; set; } = string.Empty;

        public string SpecialLevel { get; set; } = string.Empty;

        public byte BaFilter { get; set; }
    }
}