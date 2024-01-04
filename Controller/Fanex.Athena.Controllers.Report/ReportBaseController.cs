namespace Fanex.Athena.Controllers.Report
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.SessionState;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Model.Core.DTO.Configuration;
    using Fanex.Athena.Web.ActionFilter;
    using Model.Core.DTO.Common;
    using Model.Core.MetaModel.Product;

    [SessionState(SessionStateBehavior.ReadOnly)]
    [UMFilter]
    public class ReportBaseController : CultureBaseController
    {
        public const int PageSizeExcel = int.MaxValue - 1000;

        protected static IList<ProductOption> ToProductOptions(IEnumerable<Product> productList)
        {
            return productList.Select(i => new ProductOption
            {
                Code = i.ProductCode,
                Name = i.ProductName,
                Status = true
            }).ToList();
        }

        protected IDictionary<int, string> BuildCurrencyList()
        {
            var currencyList = SessionServiceInstance.UserSession.CurrencyList;
            var auditCurrency = SessionServiceInstance.LicenseeSession.AuditCurrencies;

            if (auditCurrency != null && auditCurrency.Any())
            {
                foreach (var currency in auditCurrency)
                {
                    foreach (var tempCurrency in currencyList.Where(_ => String.Equals(_.Value, currency.Name, StringComparison.InvariantCultureIgnoreCase)).ToList())
                    {
                        currencyList[tempCurrency.Key] = currency.HardCodeName;
                    }
                }
            }

            return currencyList;
        }

        protected static DateTime GetSelectedDate(ReportSetting reportSetting)
        {
            return DateTimeHelper.GetMinDate(
                reportSetting.MaxDate,
                reportSetting.TimeZone.HasValue ? DateTimeHelper.UtcNow.AddHours(reportSetting.TimeZone.Value) : DateTimeHelper.Now);
        }
    }
}