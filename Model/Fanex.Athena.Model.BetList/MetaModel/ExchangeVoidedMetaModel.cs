using System;

namespace Fanex.Athena.Model.BetList.MetaModel
{
    public class ExchangeVoidedMetaModel
    {
        public int CustId { get; set; }

        public DateTime SelectedDate { get; set; }

        public string UserName { get; set; }

        public string RefNo { get; set; }

        public int PageIndex { get; set; }

        public string Environment { get; set; }
    }
}