namespace Fanex.Athena.Module.PlayerAdmin.Controllers
{
    using System.Collections.Generic;
    using System.Web.Mvc;
    using System.Web.SessionState;
    using System.Web.UI;
    using Fanex.Athena.Controllers;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Auth.Enum;
    using Fanex.Athena.Module.PlayerAdmin.DTO;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.VendorAdapter.Interfaces;
    using Fanex.Athena.Web.ActionFilter;
    using ONEbook.UM.Filters;

    [SessionState(SessionStateBehavior.ReadOnly)]
    [CheckUMFilter]
    [CustomValidateAntiForgery]
    [AuthorizeRestriction(AppMode.Parasitic)]
    [FunctionAuthorization(PermissionKeys.PlayerAdminBetLimit)]
    [OutputCache(NoStore = true, Duration = 0, Location = OutputCacheLocation.None, VaryByParam = "*")]
    public class PlayerBetLimitBaseControler : CultureBaseController
    {
        private const string MixedSportId = "99MP";

        private const string I4DId = "223";

        public IAuthorizationService AuthServiceInstance { get; set; }

        public ICacheRefAdapter CacheRefAdapterInstance { get; set; }

        protected IEnumerable<PlayerBetLimit> AddSettingTypeName(IEnumerable<PlayerBetLimit> data)
        {
            foreach (var item in data)
            {
                item.BetSettingType = (item.Id == I4DId) ? GetBetTypeName(item.BetType) : GetSportName(item.Id);
            }

            return data;
        }

        protected bool HasEditPermission() => AuthServiceInstance.HasPermissions(SessionServiceInstance.UserSession, PermissionKeys.PlayerAdminBetLimit_Write);

        protected string GetSportName(string sportId) => sportId == MixedSportId ? ViewResources.MixSportsParlay : CacheRefAdapterInstance.GetSportName(sportId);

        protected string GetBetTypeName(int bettypeId) => CacheRefAdapterInstance.GetBettype(bettypeId);
    }
}