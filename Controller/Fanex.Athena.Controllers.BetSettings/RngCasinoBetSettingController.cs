// --------------------------------------------------------------------------
// <copyright file="RngCasinoBetSettingController.cs" company="">
// Copyright (c) . All rights reserved.
// </copyright>
// --------------------------------------------------------------------------

namespace Fanex.Athena.Controllers.BetSettings
{
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    using Model.BetSettings.MetaModel;
    using Model.Core.DataDomain;
    using Model.Core.DTO.Common;

    using Resources;

    using Service.BetSettings.Interfaces;

    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Mvc;

    public class RngCasinoBetSettingController : BetSettingBaseController
    {
        private readonly IRngCasinoBetSettingService _betSettingService;

        public RngCasinoBetSettingController(
            ICoreBetSettingService coreBetSettingService,
            IProductService productService,
            IRngCasinoBetSettingService betSettingService
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
            var customer = GetCustomerInfo(metaModel.CustId);
            var viewModel = await _betSettingService.GetViewModelAsync(metaModel.CustId, customer,
                SessionServiceInstance.UserSession.Language);

            await AssignRequiredPropertiesAsync(viewModel, metaModel).ConfigureAwait(false);

            return View("~/Views/Desktop/Customer/BetSetting/RngCasino.cshtml", viewModel);
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [ValidatePermissionOnData]
        public async Task<JsonResult> UpdateBetSetting(int custId, string gameTypeChangedList)
        {
            var userSession = SessionServiceInstance.UserSession;
            var licenseeSession = SessionServiceInstance.LicenseeSession;

            if (!CheckPermission(userSession, ProductTypes.RngCasino))
            {
                return AccessDenied();
            }

            var customer = GetCustomerInfo(custId);
            if (customer == null || !customer.SyncCasino)
            {
                return AccessDenied();
            }

            try
            {
                var metaModel = new RngCasinoBetSettingMetaModel
                {
                    LicenseeId = licenseeSession.LicenseeId,
                    LicenseeName = licenseeSession.LicenseeName,
                    CustId = custId,
                    ModifyById = userSession.UserId,
                    ModifyByUsername = userSession.UserName,
                    Ip = Request.UserHostAddress,
                    StackLevelParam = GetStackLevelParam(gameTypeChangedList)
                };

                var result = await _betSettingService.UpdateSettingAsync(metaModel, customer.SyncCasino, customer.DisableCasino).ConfigureAwait(false);

                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (System.Exception e)
            {
                return Json(new ResultInfo { Code = 1, Message = e.Message });
            }
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [ValidatePermissionOnData]
        public async Task<JsonResult> UpdateStatus(int custId, string nickName, int status)
        {
            var userSession = SessionServiceInstance.UserSession;
            if (!CheckPermission(userSession, ProductTypes.RngCasino))
            {
                return AccessDenied();
            }

            var customer = GetCustomerInfo(custId);
            if (customer == null || !customer.SyncCasino)
            {
                return AccessDenied();
            }

            var metaModel = new BetSettingCasinoStatusMetaModel
            {
                currencyAgents = userSession.CurrencyAgentList,
                UserId = userSession.UserId,
                CustId = custId,
                Status = status,
                Language = userSession.Language,
                Ip = Request.UserHostAddress,
                UserName = userSession.UserName,
                IsSyncCasino = customer.SyncCasino
            };
            var result = await _betSettingService.UpdateStatusAsync(metaModel).ConfigureAwait(false);

            if (result.Code == 0)
            {
                result.Message = string.Format(ViewResources.UpdateSuccess, nickName);
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        private IDictionary<string, string> GetStackLevelParam(string gameTypeChangedList)
        {
            var gameTypeList = gameTypeChangedList.Split(',');
            var result = new Dictionary<string, string>();
            foreach (var gameTypeId in gameTypeList)
            {
                if (!result.ContainsKey(gameTypeId))
                {
                    var stakeLevel = this.HttpContext.Request["stake" + gameTypeId];
                    result.Add(gameTypeId, stakeLevel);
                }
            }

            return result;
        }
    }
}