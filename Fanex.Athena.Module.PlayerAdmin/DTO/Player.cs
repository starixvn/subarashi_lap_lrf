namespace Fanex.Athena.Module.PlayerAdmin.DTO
{
    public class Player
    {
        public int CustId { get; set; }

        public string UserName { get; set; }

        public string SystemId { get; set; }

        public string Currency { get; set; }

        public decimal CurrentBalance { get; set; }

        public decimal OutstandingBalance { get; set; }

        public string OddsGroup { get; set; }

        public bool BaStatus { get; set; }

        public int SpecialLevel { get; set; }
    }
}
