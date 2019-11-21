// -----------------------------------------------------------------------
// <copyright file="SportsbookBetSettingController.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.BetSettings
{
    using Fanex.Athena.Model.BetSettings.MetaModel;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    using Model.BetSettings.DTO;
    using Model.Core.DataDomain;

    using Resources;

    using Service.BetSettings.Interfaces;

    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Mvc;

    public class SportsbookBetSettingController : BetSettingBaseController
    {
        private readonly ISportsbookBetSettingService _betSettingService;

        public SportsbookBetSettingController(
            ICoreBetSettingService coreBetSettingService,
            IProductService productService,
            ISportsbookBetSettingService betSettingService

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

            return View("~/Views/Desktop/Customer/BetSetting/Main.cshtml", viewModel);
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [ValidatePermissionOnData]
        public async Task<JsonResult> UpdateBetSetting(string nickName)
        {
            var userSession = SessionServiceInstance.UserSession;
            var licenseeId = SessionServiceInstance.LicenseeSession.LicenseeId;

            if (!CheckPermission(userSession, ProductTypes.Sportsbook))
            {
                return AccessDenied();
            }

            var commonParam = GetBetSettingCommonParam(userSession.UserId, licenseeId, userSession.Language);
            var param = GetSportsBookParam();
            var esportSetting = GetESportSetting();
            var result = await _betSettingService.UpdateBetSettingAsync(commonParam, param,
                esportSetting);

            if (result.Code == 0)
            {
                result.Message = string.Format(ViewResources.UpdateSportsbookBetSettingSuccessMsg, nickName);
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        private IDictionary<string, object> GetSportsBookParam()
        {
            var sportsBookParam = new Dictionary<string, object>();

            GetParams("1", sportsBookParam);
            GetParams("2", sportsBookParam);
            GetParams("3", sportsBookParam);
            GetParams("5", sportsBookParam);
            GetParams("8", sportsBookParam);
            GetParams("10", sportsBookParam);
            GetParams("11", sportsBookParam);
            GetParams("99", sportsBookParam);
            GetParams("99mp", sportsBookParam);

            return sportsBookParam;
        }

        private void GetParams(string sportType, IDictionary<string, object> sportsBookParam)
        {
            var minBet = GetDecimalRequest("minbet" + sportType, 0);
            var maxBet = GetDecimalRequest("maxbet" + sportType, 0);
            var maxPerMatch = GetDecimalRequest("maxpermatch" + sportType, 0);
            var update = GetBooleanRequest("update" + sportType, false);

            var paramSuffix = sportType == "1" ? string.Empty : "v" + sportType;
            sportsBookParam.Add("minbet" + paramSuffix, minBet);
            sportsBookParam.Add("maxbet" + paramSuffix, maxBet);
            sportsBookParam.Add("maxpermatch" + paramSuffix, maxPerMatch);
            sportsBookParam.Add("updateminmaxbet" + paramSuffix, update);
        }

        private bool GetBooleanRequest(string name, bool defaultValue)
        {
            if (string.IsNullOrEmpty(HttpContext.Request[name]))
            {
                return defaultValue;
            }

            var value = HttpContext.Request[name].ToLowerInvariant();

            return value == "1" || value == "on" || value == "true";
        }

        private DcsBetSetting GetESportSetting()
        {
            const int Esports = (int)SportType.Esports;
            return new DcsBetSetting
            {
                MaxBet = GetDecimalRequest("maxbet" + Esports, 0),
                MinBet = GetDecimalRequest("minbet" + Esports, 0),
                MaxPerMatch = GetDecimalRequest("maxpermatch" + Esports, 0),
                SportId = Esports.ToString(),
                BetType = GetIntRequest("bettype" + Esports, 0),
            };
        }
    }
}