// --------------------------------------------------------------------------
// <copyright file="DcsBetSettingController.cs" company="">
// Copyright (c) . All rights reserved.
// </copyright>
// --------------------------------------------------------------------------

namespace Fanex.Athena.Controllers.BetSettings
{
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    using Model.BetSettings.DTO;
    using Model.BetSettings.MetaModel;
    using Model.BetSettings.ViewModel;
    using Model.Core.Helper;

    using Resources;

    using Service.BetSettings.Interfaces;

    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;

    public class DcsBetSettingController : BetSettingBaseController
    {
        private static readonly IDictionary<int, string> ProductViewNameMap = new Dictionary<int, string>
        {
            { ProductTypes.AllBet, "AllBet" },
            { ProductTypes.Voidbridge, "Voidbridge" },
            { ProductTypes.FishingWorld, "FishingWorld" },
            { ProductTypes.VirtualSports, "VirtualSports" },
            { ProductTypes.VirtualSports2, "VirtualSports2" },
            { ProductTypes.Lottery, "Lottery" },
            { ProductTypes.Exchange, "Exchange" },
            { ProductTypes.PP, "PP" }
        };

        private static readonly IEnumerable<int> ProductsHasStatus = new[]
        {
             ProductTypes.AllBet, ProductTypes.Voidbridge, ProductTypes.FishingWorld,
             ProductTypes.Lottery, ProductTypes.Exchange, ProductTypes.PP
        };

        private static readonly IEnumerable<int> ProductsHasBetLimit = new[]
        {
             ProductTypes.VirtualSports, ProductTypes.VirtualSports2, ProductTypes.Lottery
        };

        private static readonly IDictionary<int, string[]> ProductSportList = new Dictionary<int, string[]>
        {
            [ProductTypes.VirtualSports] = new[] { "180", "181", "182", "183", "184", "185", "186" },
            [ProductTypes.VirtualSports2] = new[] { "190", "191", "192", "193", "199" },
            [ProductTypes.Lottery] = new[] { "220" }
        };

        private readonly IDcsBetSettingService _betSettingService;

        public DcsBetSettingController(
            ICoreBetSettingService coreBetSettingService,
            IProductService productService,
            IDcsBetSettingService betSettingService
            )

        : base(coreBetSettingService, productService)
        {
            _betSettingService = betSettingService;
        }

        [HttpGet]
        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        [ValidatePermissionOnData(isObject: true)]
        public async Task<ActionResult> Index(BetSettingMetaModel metaModel)
        {
            if (!ProductViewNameMap.ContainsKey(metaModel.ProductId))
            {
                throw new ArgumentException("Invalid product id: " + metaModel.ProductId);
            }

            var viewModel = new BetSettingViewModel();
            await AssignRequiredPropertiesAsync(viewModel, metaModel).ConfigureAwait(false);

            var viewName = ProductViewNameMap[metaModel.ProductId];
            var viewPath = $"~/Views/Desktop/Customer/BetSetting/{viewName}.cshtml";

            if (ProductsHasStatus.Contains(metaModel.ProductId))
            {
                viewModel.IsEnabled = await _betSettingService.GetStatusAsync(metaModel.CustId, metaModel.ProductId).ConfigureAwait(false);
            }

            if (ProductsHasBetLimit.Contains(metaModel.ProductId))
            {
                viewModel.MainData = await _betSettingService.GetBetSettingsAsync(metaModel.CustId, metaModel.ProductId).ConfigureAwait(false);
            }

            return View(viewPath, viewModel);
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [ValidatePermissionOnData]
        public async Task<JsonResult> UpdateStatus(int custId, string nickName, int status, int productId)
        {
            var userSession = SessionServiceInstance.UserSession;

            if (!CheckPermission(userSession, productId))
            {
                return AccessDenied();
            }

            var result = await _betSettingService.UpdateStatusAsync(
                userSession.UserId,
                custId,
                Request.UserHostAddress,
                status == 1,
                productId);

            if (result.Code == 0)
            {
                result.Message = string.Format(ViewResources.UpdateSuccess, nickName);
            }

            return Json(result);
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [ValidatePermissionOnData]
        public async Task<JsonResult> UpdateBetSetting(int productId, string nickName)
        {
            var userSession = SessionServiceInstance.UserSession;
            var licenseeId = SessionServiceInstance.LicenseeSession.LicenseeId;

            if (!CheckPermission(userSession, productId))
            {
                return AccessDenied();
            }

            var commonParam = GetBetSettingCommonParam(userSession.UserId, licenseeId, userSession.Language);
            var parameters = GetParameters(productId);

            if (!parameters.Any() || commonParam.UserId == 0 || commonParam.CustId == 0)
            {
                return Json(new ResultInfo { Code = 0, Message = ViewResources.InvalidParams }, JsonRequestBehavior.AllowGet);
            }

            var result = await _betSettingService.UpdateBetSettingAsync(
                commonParam.CustId,
                commonParam.UserId,
                commonParam.Ip,
                parameters);

            if (result.Code == 0)
            {
                var productCodeResource = "Product" + ProductHelper.GetProductCode(productId);
                var productName = ViewResources.ResourceManager.GetString(productCodeResource);
                result.Message = string.Format(ViewResources.UpdateProductBetSettingSuccessMsg, productName, nickName);
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        private IEnumerable<DcsBetSetting> GetParameters(int productId)
        {
            if (!ProductSportList.ContainsKey(productId))
            {
                return new List<DcsBetSetting>();
            }

            var sports = ProductSportList[productId];
            var settings = new List<DcsBetSetting>();

            foreach (var sport in sports)
            {
                settings.Add(new DcsBetSetting
                {
                    MaxBet = GetDecimalRequest("maxbet" + sport, 0),
                    MinBet = GetDecimalRequest("minbet" + sport, 0),
                    MaxPerMatch = GetDecimalRequest("maxpermatch" + sport, 0),
                    SportId = sport,
                    BetType = GetIntRequest("bettype" + sport, 0),
                });
            }

            return settings;
        }
    }
}