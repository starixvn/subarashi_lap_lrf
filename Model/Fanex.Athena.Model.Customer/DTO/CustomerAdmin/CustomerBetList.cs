using System;

namespace Fanex.Athena.Model.Customer.DTO.CustomerAdmin
{
    public class CustomerBetList
    {
        public string Index { get; set; }

        public string RefNo { get; set; }

        public DateTime TransTime { get; set; }

        public string BetType { get; set; }

        public string ProductCode { get; set; }

        public string SportName { get; set; }

        public decimal Turnover { get; set; }

        public decimal WinLoss { get; set; }

        public decimal TurnoverBased { get; set; }

        public decimal WinLossBased { get; set; }

        public int Status { get; set; }

        public string SystemId { get; set; }

        public string CurencyCode { get; set; }

        public string TransTimeString => TransTime.ToString("yyyy-MM-dd hh:mm:ss tt");

        public decimal Payout => Turnover + WinLoss;

        public decimal PayoutBased => TurnoverBased + WinLossBased;
    }
}