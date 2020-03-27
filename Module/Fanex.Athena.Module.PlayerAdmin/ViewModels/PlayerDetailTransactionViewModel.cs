namespace Fanex.Athena.Module.PlayerAdmin.ViewModels
{
    using System;

    public class PlayerDetailTransactionViewModel
    {
        public string TransactionId { get; set; }
        public DateTime TransactionTime { get; set; }
        public int BetType { get; set; }
        public string TransactionType { get; set; }
        public decimal BalanceChange { get; set; }
        public decimal AfterBalance { get; set; }
        public string Remark { get; set; }

        public string TransactionTimeStr => TransactionTime.ToString("MM/dd/yyyy HH:mm:ss");
        public string BalanceChangeStr => (BalanceChange > 0 ? "+" : string.Empty) + BalanceChange.ToString("#,##0.##");
        public string AfterBalanceStr => AfterBalance.ToString("#,##0.00");
    }
}
