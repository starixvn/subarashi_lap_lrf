// -----------------------------------------------------------------------
// <copyright file="CustomerOutstandingBetListController.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.BetList
{
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.MetaModel.Product;

    using Model.BetList.MetaModel;
    using Model.BetList.ViewModel;
    using Model.Core.DTO.Common;

    using Resources;

    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;

    using Web.ActionFilter;

    [FunctionAuthorization(PermissionKeys.CustomerInfoCustomerList)]
    public class CustomerOutstandingBetListController : BetListBaseController
    {
        private const string BetListCustomerOutstandingName = "BetList_CustomerOutstanding";
        private const string BetListCustomerOutstandingRunningName = "BetList_CustomerOutstandingRunning";

        [ValidationWebRequest]
        public ActionResult Index(BetListMetaModel metaModel)
        {
            var isRunningBetlist = !string.IsNullOrEmpty(metaModel.BetListName) && metaModel.BetListName.Equals("betlistrunning", StringComparison.OrdinalIgnoreCase);
            var viewParam = CreateDefaultMetaModel(metaModel);
            InitBaseCurrencyValue(viewParam);

            viewParam.FromDate = isRunningBetlist ? new DateTime(DateTime.Now.Year - 1, 1, 1) : viewParam.MoveBetsDay.AddDays(1);

            var productAccess = ProductService.GetProductAccess(
                viewParam.LicenseeId,
                SessionServiceInstance.UserSession.Language,
                isRunningBetlist ? BetListCustomerOutstandingRunningName : BetListCustomerOutstandingName);

            var viewModel = new BetListBaseViewModel
            {
                Param = viewParam,
                ProductOptions = GetProductOptions(viewParam.ProductCodeList, productAccess.ProductList)
            };

            ViewBag.ViewTitle = GetViewTite(metaModel.BetListName);
            return View("~/Views/Desktop/BetList/CustomerOutstanding/Main.cshtml", viewModel);
        }

        private static IEnumerable<ProductOption> GetProductOptions(string productCodeList, IEnumerable<Product> allProducts)
        {
            var isFirstTimeLoading = string.IsNullOrEmpty(productCodeList);
            var previousCheckedProducts = isFirstTimeLoading ? new string[] { } : productCodeList.Split(',');

            var productOptions = new List<ProductOption>();

            foreach (var product in allProducts)
            {
                productOptions.Add(new ProductOption
                {
                    Code = product.ProductCode,
                    Name = product.ProductName,
                    Status = isFirstTimeLoading || previousCheckedProducts.Any(p => p.Equals(product.ProductCode, StringComparison.OrdinalIgnoreCase))
                });
            }

            return productOptions;
        }

        private static string GetViewTite(string name)
        {
            switch (name)
            {
                case "dailystatement":
                    return ViewResources.DailyStatement;

                case "betlistrunning":
                    return ViewResources.BetListRunning;

                default:
                    return ViewResources.BetList;
            }
        }
    }
}