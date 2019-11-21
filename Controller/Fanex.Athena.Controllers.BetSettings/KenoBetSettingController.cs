// --------------------------------------------------------------------------
// <copyright file="KenoBetSettingController.cs" company="">
// Copyright (c) . All rights reserved.
// </copyright>
// --------------------------------------------------------------------------

namespace Fanex.Athena.Controllers.BetSettings
{
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    using Model.BetSettings.DTO;
    using Model.BetSettings.MetaModel;
    using Model.Core.DataDomain;
    using Model.Core.DTO.Common;

    using Resources;

    using Service.BetSettings.Interfaces;

    using System;
    using System.Threading.Tasks;
    using System.Web.Mvc;

    public class KenoBetSettingController : BetSettingBaseController
    {
        private readonly IKenoBetSettingService _betSettingService;

        public KenoBetSettingController(
            ICoreBetSettingService coreBetSettingService,
            IProductService productService,
            IKenoBetSettingService betSettingService
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
            var viewModel = await _betSettingService.GetViewModelAsync(
                metaModel.CustId);
            await AssignRequiredPropertiesAsync(viewModel, metaModel);
            return View("~/Views/Desktop/Customer/BetSetting/Keno.cshtml", viewModel);
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [ValidatePermissionOnData]
        public async Task<JsonResult> UpdateBetSetting(string nickName)
        {
            var userSession = SessionServiceInstance.UserSession;
            var licenseeId = SessionServiceInstance.LicenseeSession.LicenseeId;

            if (!CheckPermission(userSession, ProductTypes.Keno))
            {
                return AccessDenied();
            }

            var id = Convert.ToInt32(Request["id"]);
            var commonParam = GetBetSettingCommonParam(userSession.UserId, licenseeId, userSession.Language);

            if (id <= 0 || commonParam.UserId == 0 || commonParam.CustId == 0)
            {
                return Json(new ResultInfo { Code = 0, Message = ViewResources.InvalidParams }, JsonRequestBehavior.AllowGet);
            }

            var betSetting = GetBetSetting(id);

            var result = await _betSettingService.UpdateBetSettingAsync(
                commonParam.CustId,
                commonParam.UserId,
                commonParam.Language,
                commonParam.Ip,
                betSetting);

            if (result.Code == 0)
            {
                result.Message = string.Format(ViewResources.UpdateKenoBetSettingSuccessMsg, nickName);
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        private KenoBetSetting GetBetSetting(int id)
        {
            return new KenoBetSetting
            {
                MaxBet = GetDecimalRequest("maxbet" + id, 0),
                MinBet = GetDecimalRequest("minbet" + id, 0),
                MaxPerMatch = GetDecimalRequest("maxpermatch" + id, 0),
                GameTypeID = id.ToString()
            };
        }
    }
}