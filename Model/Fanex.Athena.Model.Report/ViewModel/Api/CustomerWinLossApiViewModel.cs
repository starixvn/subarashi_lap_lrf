using System.Collections.Generic;
using Fanex.Athena.Model.Report.DTO;

namespace Fanex.Athena.Model.Report.ViewModel.Api
{
    public class CustomerWinLossApiViewModel
    {
        public IEnumerable<CustomerWinLoss> DataList { get; set; }

        public CustomerWinLoss Total { get; set; }

        public int TotalRows { get; set; }

        public string PromotionPrize { get; set; }
    }
}