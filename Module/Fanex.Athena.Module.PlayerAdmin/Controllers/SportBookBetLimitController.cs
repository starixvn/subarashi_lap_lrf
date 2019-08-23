namespace Fanex.Athena.Module.PlayerAdmin.Controllers
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using System.Web.SessionState;
    using System.Web.UI;
    using Fanex.Athena.Controllers;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Module.PlayerAdmin.DTO;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.ViewModels;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Service.Core.Common.Interfaces;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.VendorAdapter.Interfaces;
    using Fanex.Athena.Web.ActionFilter;
    using ONEbook.UM.Filters;

    [SessionState(SessionStateBehavior.ReadOnly)]
    [CheckUMFilter]
    //[AuthorizeRestriction(AppMode.Parasitic)]
    //[FunctionAuthorization(PermissionKeys.PlayerAdmin)]
    //check product belongs to
    [CustomValidateAntiForgery]
    [OutputCache(NoStore = true, Duration = 0, Location = OutputCacheLocation.None, VaryByParam = "*")]
    public class SportBookBetLimitController : CultureBaseController
    {
        private const string MixedSportId = "99MP";

        private readonly ISportBookBetLimitService _service;

        private readonly IAuthorizationService _authService;

        private readonly ICacheRefAdapter _cacheRefAdapter;

        public SportBookBetLimitController(
            ILanguageService languageService,
            ISessionService sessionService,
            IAppSettings appSettings,
            ISportBookBetLimitService sportBookBetLimitService,
            ICacheRefAdapter cacheRefAdapter,
            IAuthorizationService authorizationService)
            : base(languageService, sessionService, appSettings, null)
        {
            _service = sportBookBetLimitService;
            _authService = authorizationService;
            _cacheRefAdapter = cacheRefAdapter;
        }

        [HttpPost]
        [AjaxRequest]
        [ValidatePermissionOnData]
        public async Task<JsonResult> GetSetting(int custId)
        {
            var data = await GetData(custId, AppSettings.IsShowMixedSport).ConfigureAwait(false);
            var copySportId = ((int)SportType.Soccer).ToString();

            var viewModel = new PlayerBetSettingViewModel<PlayerBetLimit>
            {
                Data = data,
                //Editable = _authService.HasPermissions(
                //    SessionService.UserSession.PortalFunctionList,
                //    PermissionKeys.PlayerAdminBetLimit)
                Editable = true,
                CopySportId = copySportId,
                EnableCopy = data.Any(x => x.SportId == copySportId)
            };

            return Json(viewModel);
        }

        [HttpPost]
        [AjaxRequest]
        [ValidatePermissionOnData(isObject:true)]
        //[FunctionAuthorization(Model.Auth.DataDomain.PermissionKeys.PlayerAdminBetLimit)]
        public async Task<JsonResult> UpdateSetting(PlayerBetLimitMetaModel metaModel)
        {
            var user = SessionService.UserSession;
            AddUpdateInfo(metaModel, user.UserId, user.Language, SessionService.LicenseeSession.LicenseeName, Request.UserHostAddress);

            var result = await _service.UpdateSettingAsync(metaModel).ConfigureAwait(false);

            if (result.Code == 0)
            {
                result.Message = string.Format(ViewResources.UpdateSuccess);
            }

            return Json(result);
        }

        private static void AddUpdateInfo(PlayerBetLimitMetaModel metaModel, int userId, string language, string siteName, string ip)
        {
            metaModel.UserId = userId;
            metaModel.Language = language;
            metaModel.SiteName = siteName;
            metaModel.Ip = ip;
        }

        private async Task<IEnumerable<PlayerBetLimit>> GetData(int custId, bool isShowMixedSport)
        {
            var data = await _service.GetSettingAsync(custId, isShowMixedSport).ConfigureAwait(false);

            foreach (var item in data)
            {
                item.BetSettingType = GetSportName(item.SportId);
            }

            return data;
        }

        private string GetSportName(string sportId) => sportId == MixedSportId ? ViewResources.MixSportsParlay : _cacheRefAdapter.GetSportName(sportId);
    }
}