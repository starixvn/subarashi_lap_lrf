using System;
using System.Collections.Generic;
using Fanex.Athena.Extension.Helper;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Core.DTO.Configuration;
using Fanex.Athena.Model.Core.ViewModel;

namespace Fanex.Athena.Model.Report.ViewModel
{
    public class NewCashOutWinLossViewModel : BaseViewModel
    {
        public NewCashOutWinLossViewModel()
        {
            FromDate = DateTimeHelper.Today;
            ToDate = DateTimeHelper.Today;
        }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public ReportSetting ReportSetting { get; set; }

        public IDictionary<int, string> SportList { get; set; }

        public SubsidiaryViewType ViewType { get; set; }

        public IEnumerable<CheckedItem> SubsidiaryList { get; set; }

        public bool IsLicenseeOfferBA { get; set; }
    }
}