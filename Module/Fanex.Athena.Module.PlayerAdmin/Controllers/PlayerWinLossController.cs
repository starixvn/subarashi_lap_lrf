using System;
using System.Linq;
using System.Web.Mvc;
using System.Web.SessionState;
using Fanex.Athena.Controllers;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Module.PlayerAdmin.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
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
    [FunctionAuthorization(Model.Auth.DataDomain.PermissionKeys.AccountInfo)]
    public class PlayerWinLossController : CultureBaseController
    {
        private readonly IProductService _productService;

        private readonly IPlayerWinLossService _playerWinLossService;

        public PlayerWinLossController(
            ILanguageService languageService,
            ISessionService sessionService,
            IProductService productService,
            IPlayerWinLossService playerWinLossService) : base(languageService, sessionService)
        {
            _productService = productService;
            _playerWinLossService = playerWinLossService;
        }

        [HttpGet]
        public ActionResult Index(string userName, string currencyName)
        {
            var viewModel = new PlayerFastCrossLinkViewModel
            {
                UserName = userName?.Trim(),
                CurrencyName = currencyName?.Trim(),
                ProductCodeListString = GetProductCode()
            };

            return View("~/Views/Desktop/Module/PlayerAdmin/PlayerWinLoss/Index.cshtml", viewModel);
        }

        [HttpPost]
        [AjaxRequest]
        [CustomValidateAntiForgery]
        [AutoBindMetaModel(BindAgent = true)]
        public dynamic Index(PlayerWinLossMetaModel metaModel)
        {
            if (!ModelState.IsValid)
            {
                return Json(new
                {
                    Data = DBNull.Value
                });
            }

            AssignMetaModelValue(metaModel);

            return new
            {
                Data = _playerWinLossService.GetData(metaModel)
            };
        }

        private string GetProductCode(string functionConfigKey = FunctionNames.BettingTicketCenter)
        {
            var productAccess = _productService.GetSingleWalletProductAccess(
                SessionService.LicenseeSession.LicenseeId,
                SessionService.UserSession.Language,
                functionConfigKey);

            return string.Join(",", productAccess.ProductList.Select(i => i.ProductCode));
        }

        private void AssignMetaModelValue(PlayerWinLossMetaModel metaModel)
        {
            var now = DateTime.Now;

            metaModel.ProductCodeList = GetProductCode();
            metaModel.FromDate = new DateTime(now.Year, now.Month, 1);
            metaModel.ToDate = now;
        }
    }
}