using System;
using System.Collections.Generic;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Core.MetaModel.Product;
using Fanex.Athena.Model.Customer.DTO;

namespace Fanex.Athena.Model.Report.ViewModel
{
    public class WinlossAnalysisReportViewModel
    {
        public WinlossAnalysisReportViewModel()
        {
            var toDay = DateTime.Today;
            FromDate = toDay;
            ToDate = toDay;
        }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public DateTime MaxDate { get; set; }

        public DateTime MinDate { get; set; }

        public bool IsAllowedCustomerComm { get; set; }

        public bool IsOfferCashOutProduct { get; set; }

        public IEnumerable<ProductOption> ProductOptionList { get; set; }

        public IEnumerable<KeyValuePair<int, string>> CurrencyList { get; set; }

        public IEnumerable<CheckedItem> StatusList { get; set; }

        public IDictionary<int, string> PlatformList { get; set; }

        public IDictionary<bool, string> VipPlayerOptionList { get; set; }

        public string SelectedBaseCurrency { get; set; }

        public IDictionary<int, string> LiveStatusList { get; set; }

        public bool IsOneworksMaster { get; set; }

        public byte SubsidiaryViewType { get; set; }

        public bool IsHasPermissionViewVip { get; set; }

        public IEnumerable<CheckedItem> SubsidiaryList { get; set; }

        public IEnumerable<RiskLevel> RiskLevels { get; set; }

        public IEnumerable<string> OddGroups { get; set; }

        public IEnumerable<CheckedItem> SportList { get; set; }

        public IEnumerable<CheckedItem> BetTypeList { get; set; }
    }
}