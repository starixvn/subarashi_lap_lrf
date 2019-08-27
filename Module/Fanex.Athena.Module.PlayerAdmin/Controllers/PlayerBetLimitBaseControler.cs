namespace Fanex.Athena.Module.PlayerAdmin.Controllers
{
    using System.Collections.Generic;
    using System.Web.Mvc;
    using System.Web.SessionState;
    using System.Web.UI;
    using Fanex.Athena.Controllers;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Auth.Enum;
    using Fanex.Athena.Module.PlayerAdmin.DTO;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
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
    [CustomValidateAntiForgery]
    [OutputCache(NoStore = true, Duration = 0, Location = OutputCacheLocation.None, VaryByParam = "*")]
    public class PlayerBetLimitBaseControler : CultureBaseController
    {
        private const string MixedSportId = "99MP";

        private readonly IAuthorizationService _authService;

        private readonly ICacheRefAdapter _cacheRefAdapter;

        public PlayerBetLimitBaseControler(
            ILanguageService languageService,
            ISessionService sessionService,
            IAppSettings appSettings,
            ICacheRefAdapter cacheRefAdapter,
            IAuthorizationService authorizationService)
            : base(languageService, sessionService, appSettings, null)
        {
            _authService = authorizationService;
            _cacheRefAdapter = cacheRefAdapter;
        }

        protected static void AddUpdateInfo(PlayerBetLimitUpdateMetaModel metaModel, int userId, string language, string siteName, string ip)
        {
            metaModel.UserId = userId;
            metaModel.Language = language;
            metaModel.SiteName = siteName;
            metaModel.Ip = ip;
        }

        protected IEnumerable<PlayerBetLimit> AddSettingTypeName(IEnumerable<PlayerBetLimit> data)
        {
            foreach (var item in data)
            {
                item.BetSettingType = GetSportName(item.SportId);
            }

            return data;
        }

        protected bool HasEditPermission() => _authService.HasPermissions(SessionService.UserSession.PortalFunctionList, PermissionKeys.PlayerAdminBetLimit);

        protected string GetSportName(string sportId) => sportId == MixedSportId ? ViewResources.MixSportsParlay : _cacheRefAdapter.GetSportName(sportId);
    }
}