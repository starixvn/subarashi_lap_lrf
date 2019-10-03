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

        private readonly ILicenseeSettingService _licenseeSettingService;

        public PlayerWinLossController(
            ILanguageService languageService,
            ISessionService sessionService,
            IProductService productService,
            IReportAPIClient reportAPIClient,
            ILicenseeSettingService licenseeSettingService) : base(languageService, sessionService)
        {
            _productService = productService;
            _reportAPIClient = reportAPIClient;
            _licenseeSettingService = licenseeSettingService;
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
                IsAllowedCustomerCommission = SessionService.LicenseeSession.IsAllowedCustomerComm,
                IsAllowedBA = productAccess.IsAllowBA
            };

            return View("~/Views/Desktop/Module/PlayerAdmin/PlayerWinLoss/Index.cshtml", viewModel);
        }

        [HttpPost]
        [AjaxRequest]
        [CustomValidateAntiForgery]
        [ValidationWebRequest]
        [AutoBindMetaModel(BindAgent = true)]
        public async Task<ActionResult> Index([Bind(Include = "Username")]PlayerWinLossMetaModel metaModel)
        {
            var userSession = SessionService.UserSession;
            AssignMetaModelValue(metaModel);

            if (metaModel.IsExportExcel)
            {
                AssignMetaModelForExcel(metaModel);
                const string FileName = "CustomerWinLoss.xls";
                var stream = await _reportAPIClient.PostByteContentAsync("api/CustomerWinLoss/ExportExcel",
                    metaModel, userSession.Language, MediaType.MsgPack).ConfigureAwait(false);

                return File(stream, "application/octet-stream", FileName);
            }

            return JsonString(await _reportAPIClient.PostAsyncString("api/CustomerWinLoss/Index",
                    metaModel, userSession.Language).ConfigureAwait(false));
        }

        private ProductAccess GetProductAccess()
        {
            return _productService.GetSingleWalletProductAccess(
                SessionService.LicenseeSession.LicenseeId,
                SessionService.UserSession.Language,
                FunctionNames.CustomerWinLoss);
        }

        private void AssignMetaModelValue(PlayerWinLossMetaModel metaModel)
        {
            var now = DateTime.Now;
            var productList = GetProductAccess().ProductList;

            metaModel.ProductOptions = productList.Select(p => new ProductOption { Code = p.ProductCode, Name = p.ProductName, Status = true });
            metaModel.FromDate = new DateTime(now.Year, now.Month, 1);
            metaModel.ToDate = now;
        }

        private void AssignMetaModelForExcel(PlayerWinLossMetaModel metaModel)
        {
            var licenseeSession = SessionService.LicenseeSession;

            metaModel.IsAllowedCustomerComm = licenseeSession.IsAllowedCustomerComm;
            metaModel.IsAllowBA = GetProductAccess().IsAllowBA;
            metaModel.SystemIdVisible = !_licenseeSettingService.IsFakeLicensee(licenseeSession.LicenseeName);
        }
    }
}