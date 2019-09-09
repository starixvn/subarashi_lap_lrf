namespace Fanex.Athena.Module.PlayerAdmin.DTO
{
    public class PlayerWinLoss
    {
        public decimal Turnover { get; set; }

        public int TotalTransaction { get; set; }

        public decimal WinLoss { get; set; }

        public decimal Comm { get; set; }

        public decimal Total { get; set; }

        public decimal BetEffective { get; set; }

        public decimal LicenseeWL { get; set; }

        public decimal BAComm { get; set; }

        public decimal AmtDueToBA { get; set; }
    }
}