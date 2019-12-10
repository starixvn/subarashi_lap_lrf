using System.Collections.Generic;
using Fanex.Athena.Model.Report.DTO;

namespace Fanex.Athena.Model.Report.ViewModel
{
    public class ExchangeVoidedViewModel
    {
        public IList<ExchangeVoidedItem> DataList { get; set; }

        public int TotalPage { get; set; }

        public int ErrCode { get; set; }
    }
}