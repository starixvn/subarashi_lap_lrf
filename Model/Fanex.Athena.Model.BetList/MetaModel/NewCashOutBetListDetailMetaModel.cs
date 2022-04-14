using System;

namespace Fanex.Athena.Model.BetList.MetaModel
{
    public class NewCashOutBetListDetailMetaModel : CashOutBetListDetailMetaModel
    {
        public int CustId { get; set; }

        public int CurrencyId { get; set; }

        public string Currency { get; set; }

        public DateTime Date { get; set; }
    }
}