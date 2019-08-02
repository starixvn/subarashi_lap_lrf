// --------------------------------------------------------------------------
// <copyright file="ThirdPartyBetSettingController.cs" company="">
// Copyright (c) . All rights reserved.
// </copyright>
// --------------------------------------------------------------------------

namespace Fanex.Athena.Controllers.BetSettings
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Mvc;

    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    using Model.BetSettings.MetaModel;
    using Model.Core.DataDomain;

    using Resources;

    using Service.BetSettings.Interfaces;
    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    public class ThirdPartyBetSettingController : BetSettingBaseController
    {
        private static readonly IDictionary<int, string> ProductViewFileMap = new Dictionary<int, string>
            {
                { ProductTypes.Macau, "Macau" },
                { ProductTypes.BetTrade, "BetTrade" },
                { ProductTypes.ColossusBets, "ColossusBets" },
                { ProductTypes.CashOut, "CashOut" },
                { ProductTypes.GoldDeluxe, "GoldDeluxe" },
            };

        private readonly IThirdPartyBetSettingService _betSettingService;

        public ThirdPartyBetSettingController(
            ILanguageService languageService,
            ISessionService sessionService,
            ICoreBetSettingService coreBetSettingService,
            IProductService productService,
            IThirdPartyBetSettingService betSettingService,
             ILicenseeSettingService licenseeSettingService
            )
        : base(languageService, sessionService, coreBetSettingService, productService, licenseeSettingService)
        {
            _betSettingService = betSettingService;
        }

        [HttpGet]
        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        [ValidatePermissionOnData(isObject: true)]
        public async Task<ActionResult> IndexAsync(BetSettingMetaModel metaModel)
        {
            if (!ProductViewFileMap.ContainsKey(metaModel.ProductId))
            {
                throw new ArgumentException("Not a thirdparty product.");
            }

            var viewModel = await _betSettingService.GetViewModelAsync(
                metaModel.CustId,
                metaModel.ProductId);
            if (viewModel == null)
            {
                return this.Redirect("~/Utility/AccessDenied");
            }

            await AssignRequiredPropertiesAsync(viewModel, metaModel);
            var viewPath = $"~/Views/Desktop/Customer/BetSetting/{ProductViewFileMap[metaModel.ProductId]}.cshtml";
            return View(viewPath, viewModel);
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [ValidatePermissionOnData]
        public Task<JsonResult> UpdateMacauStatusAsync(int custId, string nickName, int status)
        {
            return UpdateThirdPartyProductStatusAsync(ProductTypes.Macau, custId, nickName, status);
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [ValidatePermissionOnData]
        public Task<JsonResult> UpdateBetTradeStatusAsync(int custId, string nickName, int status)
        {
            return UpdateThirdPartyProductStatusAsync(ProductTypes.BetTrade, custId, nickName, status);
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [ValidatePermissionOnData]
        public Task<JsonResult> UpdateColossusBetsStatusAsync(int custId, string nickName, int status)
        {
            return UpdateThirdPartyProductStatusAsync(ProductTypes.ColossusBets, custId, nickName, status);
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        public Task<JsonResult> UpdateCashOutStatusAsync(int custId, string nickName, int status)
        {
            return UpdateThirdPartyProductStatusAsync(ProductTypes.CashOut, custId, nickName, status);
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        public Task<JsonResult> UpdateGoldDeluxeStatusAsync(int custId, string nickName, int status)
        {
            return UpdateThirdPartyProductStatusAsync(ProductTypes.GoldDeluxe, custId, nickName, status);
        }

        private async Task<JsonResult> UpdateThirdPartyProductStatusAsync(int productId, int custId, string nickName, int status)
        {
            var userSession = SessionService.UserSession;
            if (!CheckPermission(userSession, productId))
            {
                return AccessDenied();
            }

            var isEnabled = status == 1;
            var result = await _betSettingService.UpdateStatusAsync(
                productId,
                userSession.UserId,
                custId,
                userSession.Language,
                Request.UserHostAddress,
                isEnabled);

            if (result.Code == 0 && string.IsNullOrWhiteSpace(result.Message))
            {
                result.Message = string.Format(ViewResources.UpdateSuccess, nickName);
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}