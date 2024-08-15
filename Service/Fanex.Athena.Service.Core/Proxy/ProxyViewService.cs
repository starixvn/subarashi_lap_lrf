using System.Web;
using Fanex.Athena.Service.Core.Proxy.Interfaces;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Auth.Enum;
namespace Fanex.Athena.Service.Core.Proxy 
{
    public class ProxyViewService : IProxyViewService
    {
        private const string IsSelfModeHeaderKey = "IsSelfMode";

        private const string RootUrlHeaderKey = "RootUrl";

        private const string LanguageHeaderKey = "Language";

        private const string InternalSessionUrlHeaderKey = "InternalSessionUrl";

        private const string InternalSignOutUrlHeaderKey = "InternalSignOutUrl";

        private const string UmUrlHeaderKey = "UmUrl";

        private const string UmUrl = "~/Utility/UnderMaintenance";

        private const string InternalSessionUrl = "~/Authorization/InternalSignOut";

        private const string InternalSignOutUrl = "~/Utility/SessionIsAlive";

        private readonly IAuthorizationService _authorizationService;

        private readonly ISessionService _sessionService;

        public ProxyViewService(ISessionService sessionService, IAuthorizationService authorizationService)
        {
            _sessionService = sessionService;
            _authorizationService = authorizationService;
        }

        public bool PrepareViewRequest(string page)
        {
            if (!UserHasPermission(page))
            {
                return false;
            }

            AssignViewHeaders();
            return true;
        }

        private void AssignViewHeaders()
        {
            HttpContext.Current.Request.Headers.Add(RootUrlHeaderKey, HttpContext.Current.Request.ApplicationPath);
            HttpContext.Current.Request.Headers.Add(LanguageHeaderKey, _sessionService.UserSession.Language);

            AssignSessionHeaders();
        }

        private void AssignSessionHeaders()
        {
            if (_sessionService.UserSession is null)
            {
                return;
            }

            var isSelfMode = _sessionService.UserSession.ApplicationMode == AppMode.Self;

            if (isSelfMode)
            {
                return;
            }

            HttpContext.Current.Request.Headers.Add(IsSelfModeHeaderKey, "1");
            HttpContext.Current.Request.Headers.Add(UmUrlHeaderKey, VirtualPathUtility.ToAbsolute(UmUrl));
            HttpContext.Current.Request.Headers.Add(InternalSignOutUrlHeaderKey, VirtualPathUtility.ToAbsolute(InternalSessionUrl));

            var internalSessionUrl = VirtualPathUtility.ToAbsolute(InternalSignOutUrl) + "?identityName=" + _sessionService?.UserSession?.IdentityName;
            HttpContext.Current.Request.Headers.Add(InternalSessionUrlHeaderKey, internalSessionUrl);
        }

        private bool UserHasPermission(string report) => FunctionPermissions.PagePermissions.ContainsKey(report) &&
                                                         _authorizationService.HasPermissions(
                                                             _sessionService.UserSession, FunctionPermissions.PagePermissions[report]);
    }
}
