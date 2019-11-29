// --------------------------------------------------------------------------------------------------------------------
//
// <copyright file="SessionService.cs" company="">
// The session service.
// </copyright>
// <summary>
//   The session service.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace Fanex.Athena.Service.Core.Users
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;

    using DataAccess.Core.Common.Interfaces;
    using DataAccess.Core.Users.Interfaces;

    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Auth.Enum;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Utility;

    using Model.Core.DataDomain;
    using Model.Core.DTO.Common;

    public class SessionService : ISessionService
    {
        private const string DefaultReportPath = "LicenseeWinLossReport";

        private const string UserSessionKey = "UserSessionKey";

        private readonly IFunctionService _functionService;
        private readonly ILicenseeDataAccess _licenseeDataAccess;
        private readonly ICurrencyDataAccess _currencyDataAccess;

        private readonly ISessionStorage _sessionStorage;
        private readonly IAppSettings _appSettings;

        public SessionService(
            IFunctionService functionService,
            ILicenseeDataAccess licenseeDataAccess,
            ICurrencyDataAccess currencyDataAccess,
            IAppSettings appSettings,
            ISessionStorage sessionStorage)
        {
            _functionService = functionService;
            _licenseeDataAccess = licenseeDataAccess;
            _currencyDataAccess = currencyDataAccess;
            _sessionStorage = sessionStorage;
            _appSettings = appSettings;
        }

        #region Public Properties

        public LicenseeAuthInfo LicenseeSession
        {
            get
            {
                return _sessionStorage.LicenseeAuthInfo;
            }
        }

        public UserAuthInfo UserSession
        {
            get
            {
                return _sessionStorage.UserAuthInfo;
            }
        }

        public string CaptchaCode
        {
            get { return _sessionStorage.CaptchaCode; }
            set { _sessionStorage.CaptchaCode = value; }
        }

        public void AssignSessions(UserAuthInfo userSession, LicenseeAuthInfo licenseeSession)
        {
            _sessionStorage.AssignSessions(userSession, licenseeSession);
        }

        public void CreateNewSession(
            int userId,
            int onuserId,
            string userName,
            bool isInternal,
            int licenseeId = 0,
            string language = "en-US")
        {
            var licenseeList = _licenseeDataAccess.GetByUser(userId);
            var functionList = _functionService.GetUserFunctionList(licenseeId, userId).ToList();
            var userSession = new UserAuthInfo
            {
                UserLevel = UserLevelType.Licensee,
                SubsidiaryViewType = (byte)SubsidiaryViewType.NotManagement,
                UserId = userId,
                OnUserId = onuserId,
                UserName = userName,
                IsInternal = isInternal,
                FunctionList = functionList,
                Language = language,
                DefaultReportUrl = GetDefaultReportUrl(functionList),
                ApplicationMode = AppMode.Self,
                DefaultBaseCurrency = _appSettings.DefaultBaseCurrency
            };

            AssignCurrenciesToUserSession(userSession, licenseeId);
            var selectedLicensee = licenseeList.SingleOrDefault(i => i.Id == licenseeId);
            var licenseeSession = licenseeId > 0 && selectedLicensee != null ? GenerateLicenseeInfo(selectedLicensee) : null;

            AssignSessions(userSession, licenseeSession);
        }

        public void UpdateLiceseeSession(int licenseeId)
        {
            var userSession = UserSession;
            var licenseeList = _licenseeDataAccess.GetByUser(userSession.UserId);

            if (licenseeId > 0)
            {
                var selectedLicensee = licenseeList.SingleOrDefault(i => i.Id == licenseeId);
                var functionList = _functionService.GetUserFunctionList(licenseeId, userSession.UserId).ToList();

                userSession.FunctionList = functionList;
                userSession.DefaultReportUrl = GetDefaultReportUrl(functionList);

                AssignCurrenciesToUserSession(userSession, licenseeId);

                AssignSessions(userSession, GenerateLicenseeInfo(selectedLicensee));
            }
        }

        public bool UpdateLanguage(string languageCode)
        {
            var userSession = UserSession;

            if (userSession != null && !string.IsNullOrEmpty(languageCode))
            {
                userSession.Language = languageCode;
                HttpContext.Current.Session[UserSessionKey] = userSession;
                return true;
            }

            return false;
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Sonar Code Smell", "S3995:UriReturnValuesShouldNotBeStrings",
           Justification = "Reviewed. Suppression is OK here.")]
        private static string GetDefaultReportUrl(IEnumerable<Function> functionList)
        {
            if (!functionList.Any(x => x.FunctionKey.Equals(PermissionKeys.ReportLicenseeWinLoss)))
            {
                var firstFunction = functionList.FirstOrDefault(x => x.ParentId > 0 && x.IsActive);
                if (firstFunction != null)
                {
                    return firstFunction.Url;
                }
            }

            return DefaultReportPath;
        }

        private static LicenseeAuthInfo GenerateLicenseeInfo(Licensee selectedLicensee)
        {
            return new LicenseeAuthInfo
            {
                LicenseeId = selectedLicensee.Id,
                LicenseeName = selectedLicensee.Name,
                IsAllowedCustomerComm = selectedLicensee.IsAllowedCustomerComm,
                IsEnableBA = selectedLicensee.IsEnableBA
            };
        }

        public void AssignCurrenciesToUserSession(UserAuthInfo userSession, int licenseeId, IEnumerable<CurrencyUser> currencyUserList = null)
        {
            var currencyUsers = currencyUserList ?? _currencyDataAccess.GetCurrenciesByUser(licenseeId, userSession.UserId);

            if (licenseeId == LicenseeIdentity.KeenOcean)
            {
                currencyUsers = KeanOceanBusinessHelper.ModifyCurrenciesForKeenOcean(currencyUsers);
            }

            var currencyList = currencyUsers
                .Where(x => x.IsActive)
                .Select(x => new { x.CurrencyId, x.CurrencyName })
                .ToDictionary(x => x.CurrencyId, x => x.CurrencyName);

            var currencyAgentList = currencyUsers
                .Where(x => x.IsActive)
                .Select(x => new { x.CurrencyId, x.AgentIdList })
                .ToDictionary(x => x.CurrencyId, x => x.AgentIdList.ToArray());

            userSession.CurrencyList = currencyList;
            userSession.CurrencyAgentList = currencyAgentList;
        }
    }

    #endregion Public Properties
}