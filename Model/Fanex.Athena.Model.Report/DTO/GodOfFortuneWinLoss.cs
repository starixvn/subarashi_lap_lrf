namespace Fanex.Athena.Model.Report.DTO
{
    using System;

    public class GodOfFortuneWinLoss
    {
        public int Index { get; set; }

        public DateTime Date { get; set; }

        public int CustomerId { get; set; }

        public string CurrencyName { get; set; }

        public int CurrencyId { get; set; }

        public decimal TurnOver { get; set; }

        public string ExternalId { get; set; }

        public string SystemId { get; set; }

        public decimal DiscountValue { get; set; }

        public decimal TotalTransaction { get; set; }

        public decimal CustomerWinLoss { get; set; }

        public decimal LicenseeWinLoss { get; set; }
    }
}