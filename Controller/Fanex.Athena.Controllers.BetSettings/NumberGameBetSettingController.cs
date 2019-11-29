// --------------------------------------------------------------------------
// <copyright file="NumberGameBetSettingController.cs" company="">
// Copyright (c) . All rights reserved.
// </copyright>
// --------------------------------------------------------------------------

namespace Fanex.Athena.Controllers.BetSettings
{
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    using Model.BetSettings.MetaModel;
    using Model.Core.DataDomain;

    using Resources;

    using Service.BetSettings.Interfaces;

    using System.Collections;
    using System.Threading.Tasks;
    using System.Web.Mvc;

    public class NumberGameBetSettingController : BetSettingBaseController
    {
        private readonly INumberGameBetSettingService _betSettingService;

        public NumberGameBetSettingController(
            ICoreBetSettingService coreBetSettingService,
            IProductService productService,
            INumberGameBetSettingService betSettingService
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
            var viewModel = await _betSettingService.GetViewModelAsync(metaModel.CustId);
            await AssignRequiredPropertiesAsync(viewModel, metaModel);

            return View("~/Views/Desktop/Customer/BetSetting/NumberGame.cshtml", viewModel);
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [ValidatePermissionOnData]
        public async Task<JsonResult> UpdateBetSetting(string nickName)
        {
            var userSession = SessionServiceInstance.UserSession;
            var licenseeId = SessionServiceInstance.LicenseeSession.LicenseeId;

            if (!CheckPermission(userSession, ProductTypes.NumberGame))
            {
                return AccessDenied();
            }

            var numberGame = GetBetSettingCommonParam(userSession.UserId, licenseeId, userSession.Language);
            var hashData = GetNumberGameParam();
            var result = await _betSettingService.UpdateBetSettingAsync(numberGame, hashData);

            if (result.Code == 0)
            {
                result.Message = string.Format(ViewResources.UpdateNumberGameBetSettingSuccessMsg, nickName);
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        private Hashtable GetNumberGameParam()
        {
            var hashData = new Hashtable
                               {
                                   { "minbet161", decimal.Parse(HttpContext.Request["minbet161"]) },
                                   { "maxbet161", decimal.Parse(HttpContext.Request["maxbet161"]) },
                                   { "maxpermatch161", decimal.Parse(HttpContext.Request["maxpermatch161"]) },
                                   { "maxperball", GetDecimalRequest("maxperball", 0) }
                               };

            return hashData;
        }
    }
}