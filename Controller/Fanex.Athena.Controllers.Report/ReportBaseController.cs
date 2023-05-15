namespace Fanex.Athena.Controllers.Report
{
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Model.Core.DTO.Configuration;
    using Fanex.Athena.Web.ActionFilter;
    using Model.Core.DTO.Common;
    using Model.Core.MetaModel.Product;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.SessionState;

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

        protected static IDictionary<int, string> HardcodeVNDForFakeLicensee(IDictionary<int, string> currencyList)
        {
            foreach (var currency in CurrencyType.INHCurrencyList)
            {
                if (currencyList.TryGetValue(currency, out _))
                {
                    currencyList[currency] = "VND";
                }
            }

            return currencyList;
        }
        
        protected static DateTime GetSelectedDate(ReportSetting reportSetting)
        {
            return DateTimeHelper.GetMinDate(
                reportSetting.MaxDate,
                reportSetting.TimeZone.HasValue ? DateTime.UtcNow.AddHours(reportSetting.TimeZone.Value) : DateTime.Now);
        }

    }
}