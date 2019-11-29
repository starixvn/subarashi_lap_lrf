using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web.SessionState;
using Fanex.Athena.Controllers;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Core.MetaModel.Product;
using Fanex.Athena.Module.PlayerAdmin.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.ViewModels;
using Fanex.Athena.Service.Core.Common.Interfaces;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.Web.ActionFilter;
using ONEbook.UM.Filters;

namespace Fanex.Athena.Module.PlayerAdmin.Controllers
{
    [SessionState(SessionStateBehavior.ReadOnly)]
    [CheckUMFilter]
    [FunctionAuthorization(PermissionKeys.AccountInfo)]
    public class PlayerWinLossController : CultureBaseController
    {
        private readonly IProductService _productService;

        private readonly IReportAPIClient _reportAPIClient;

        public PlayerWinLossController(
            IProductService productService,
            IReportAPIClient reportAPIClient
            )
        {
            _productService = productService;
            _reportAPIClient = reportAPIClient;
        }

        [HttpGet]
        public ActionResult Index(string userName, string currencyName)
        {
            var productAccess = GetProductAccess();

            var viewModel = new PlayerFastCrossLinkViewModel
            {
                UserName = userName?.Trim(),
                CurrencyName = currencyName?.Trim(),
                ProductCodeListString = string.Join(",", productAccess.ProductList.Select(i => i.ProductCode)),
                IsAllowedCustomerCommission = SessionServiceInstance.LicenseeSession.IsAllowedCustomerComm,
                IsAllowedBA = productAccess.IsAllowBA
            };

            return View("~/Views/Desktop/Module/PlayerAdmin/PlayerWinLoss/Index.cshtml", viewModel);
        }

        [HttpPost]
        [AjaxRequest]
        [CustomValidateAntiForgery]
        [ValidationWebRequest]
        [AutoBindMetaModel(BindAgent = true, BindLicenseeContract = true)]
        public async Task<ActionResult> Index([Bind(Include = "Username")]PlayerWinLossMetaModel metaModel)
        {
            var userSession = SessionServiceInstance.UserSession;
            SetDefaultProductOptionValue(metaModel);

            if (metaModel.IsExportExcel)
            {
                const string FileName = "CustomerWinLoss.xlsx";
                var response = await _reportAPIClient.PostAsync("api/CustomerWinLoss/ExportExcel",
                    metaModel, userSession.Language, MediaType.MsgPack).ConfigureAwait(false);

                return File(response.Item1, response.Item2, FileName);
            }

            return JsonString(await _reportAPIClient.PostStringAsync("api/CustomerWinLoss/Index",
                    metaModel, userSession.Language).ConfigureAwait(false));
        }

        private ProductAccess GetProductAccess()
        {
            return _productService.GetSingleWalletProductAccess(
                SessionServiceInstance.LicenseeSession.LicenseeId,
                SessionServiceInstance.UserSession.Language,
                FunctionNames.CustomerWinLoss);
        }

        private void SetDefaultProductOptionValue(PlayerWinLossMetaModel metaModel)
        {
            var now = DateTime.Now;
            var productList = GetProductAccess().ProductList;

            metaModel.ProductOptions = productList.Select(p => new ProductOption { Code = p.ProductCode, Name = p.ProductName, Status = true });
            metaModel.FromDate = new DateTime(now.Year, now.Month, 1);
            metaModel.ToDate = now;
        }
    }
}