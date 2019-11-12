namespace Fanex.Athena.Service.Core.Users
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web;
    using System.Web.Hosting;

    using DataAccess.Core.Users.Interfaces;

    using Extension.Utility;
    using Extension.Utility.Interfaces;

    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Auth.Enum;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Utility;
    using Fanex.Logging;
    using LAP.ONEBook.Security;
    using Model.Core.DataDomain;

    using Resources;

    [CLSCompliant(false)]
    public class OneAuthenticationService : IOneAuthenticationService
    {
        private readonly ISessionService _sessionService;
        private readonly ILicenseeSettingService _licenseeSettingService;
        private readonly IFormsAuthenticationService _formsAuthenticationService;
        private readonly IOneBookSecurityWrapper _oneBookSecurityWrapper;
        private readonly ILogger _logger;
        private readonly IOneAuthDataAccess _oneAuthDataAccess;
        private readonly IAppSettings _appSettings;

        public OneAuthenticationService(
            ISessionService sessionService,
            ILicenseeSettingService licenseeSettingService,
            IFormsAuthenticationService formsAuthenticationService,
            IOneBookSecurityWrapper oneBookSecurityWrapper,
            ILogger logger,
            IAppSettings appSettings,
            IOneAuthDataAccess oneAuthDataAccess)
        {
            _sessionService = sessionService;
            _licenseeSettingService = licenseeSettingService;
            _formsAuthenticationService = formsAuthenticationService;
            _oneBookSecurityWrapper = oneBookSecurityWrapper;
            _logger = logger;
            _oneAuthDataAccess = oneAuthDataAccess;
            _appSettings = appSettings;
        }

        protected internal virtual string GetStringFromFile(string path)
        {
            using (var reader = new StreamReader(HostingEnvironment.MapPath(path)))
            {
                return reader.ReadToEnd();
            }
        }

        public IResultInfo SignIn(HttpContextBase currentContext, DefaultAuthInfo<OneAuthPermission, OneAuthCurrency> tokenInfo)
        {
            var licensee = _licenseeSettingService.GetLicenseeInfo(tokenInfo.SiteName);
            if (licensee == null)
            {
                return new ResultInfo
                {
                    Code = OneAuthorizationErrorCode.LicenseeIsNotExisted,
                    Message = ViewResources.LicenseeIsNotExisted
                };
            }

            var userInfo = GetUserInfo(tokenInfo);
            if (userInfo.UserLevel == UserLevelType.Subsidiary &&
                string.IsNullOrWhiteSpace(userInfo.OperatorID))
            {
                return new ResultInfo
                {
                    Code = OneAuthorizationErrorCode.InvalidSubsidiaryNameMsg,
                    Message = ViewResources.InvalidSubsidiaryNameMsg
                };
            }

            var result = ValidateCurrencyList(userInfo);
            if (!result.IsSuccessful)
            {
                return result;
            }

            var userSession = _sessionService.UserSession;
            var licenseeSession = _sessionService.LicenseeSession;
            var language = Util.MapLanguages.Where(i => i.Value.Equals(tokenInfo.Language))
                       .Select(i => i.Key).DefaultIfEmpty<string>("en-Us").FirstOrDefault();
            if (IsAuthenticated(currentContext, userSession, licenseeSession) &&
                IsSameSession(userSession, licenseeSession, tokenInfo, licensee.Id))
            {
                UpdateUserSession(userSession, tokenInfo, licensee.Id, userInfo, language);
                return new ResultInfo
                {
                    ExtendedData = tokenInfo.ActionLink
                };
            }

            CreateSession(language, tokenInfo, licensee, userInfo);
            return SetAuthorize(tokenInfo);
        }

        public DefaultAuthInfo<OneAuthPermission, OneAuthCurrency> GetTokenInfo(string token)
        {
            return _oneBookSecurityWrapper.Authenticate(token);
        }

        private static bool IsSameSession(UserAuthInfo userSession, LicenseeAuthInfo licenseeSession, DefaultAuthInfo<OneAuthPermission, OneAuthCurrency> tokenInfo, int licenseeId)
        {
            return userSession.UserName == tokenInfo.UserID
                && userSession.VendorID == tokenInfo.VendorID && userSession.VendorIdentityID == tokenInfo.UserID
                && licenseeSession.LicenseeId == licenseeId;
        }

        private static bool IsAuthenticated(HttpContextBase currentContext, UserAuthInfo userSession, LicenseeAuthInfo licenseeSession)
        {
            if (userSession == null || licenseeSession == null || !IsValidIdentity(currentContext))
            {
                return false;
            }

            var isValidUserId = userSession.UserId > 0 && !string.IsNullOrEmpty(userSession.VendorIdentityID) && !string.IsNullOrEmpty(userSession.VendorID);

            return isValidUserId && userSession.IsInternal && licenseeSession.LicenseeId > 0 && userSession.ApplicationMode == AppMode.Parasitic;
        }

        private static bool IsValidIdentity(HttpContextBase currentContext)
        {
            var identity = currentContext.User.Identity;
            return identity != null && identity.IsAuthenticated && !string.IsNullOrEmpty(identity.Name);
        }

        protected internal virtual IResultInfo SetAuthorize(DefaultAuthInfo<OneAuthPermission, OneAuthCurrency> tokenInfo)
        {
            var authName = $"{tokenInfo.VendorID}_{tokenInfo.SiteName}_{tokenInfo.UserID}";
            _formsAuthenticationService.SetAuthCookie(authName, false);

            return new ResultInfo
            {
                ExtendedData = tokenInfo.ActionLink
            };
        }

        protected internal virtual IResultInfo ValidateCurrencyList(OneAuthUserInfo userInfo)
        {
            if (userInfo.CurrencyUserList == null || !userInfo.CurrencyUserList.Any())
            {
                return new ResultInfo
                {
                    Code = OneAuthorizationErrorCode.UserNotHaveCurrency,
                    Message = ViewResources.UserNotHaveCurrency
                };
            }

            foreach (var currency in userInfo.CurrencyUserList)
            {
                var duplicateAgents = currency.AgentIdList.GroupBy(x => x).Where(x => x.Count() > 1).Select(x => x.Key).ToList();
                if (duplicateAgents.Any())
                {
                    _logger.Error($"Duplicate agentid in currency permissions: currency ({currency.CurrencyId}-{currency.CurrencyName})" +
                       $", duplicate agents ({string.Join(",", duplicateAgents)})");

                    return new ResultInfo
                    {
                        Code = OneAuthorizationErrorCode.InvalidCurrencyPermission,
                        Message = ViewResources.InvalidCurrencyPermission
                    };
                }
            }

            return new ResultInfo { Code = 0 };
        }

        private void UpdateUserSession(UserAuthInfo userSession, 
            DefaultAuthInfo<OneAuthPermission, OneAuthCurrency> tokenInfo,
            int licenseeId, OneAuthUserInfo userInfo, string language)
        {
            if (!language.Equals(userSession.Language))
            {
                _sessionService.UpdateLanguage(language);
            }

            _sessionService.AssignCurrenciesToUserSession(userSession, licenseeId, userInfo.CurrencyUserList);
            userSession.UserLevel = userInfo.UserLevel;
            userSession.WhiteLabelID = tokenInfo.WhiteLabelID;
            userSession.SubsidiaryViewType = (byte)SubsidiaryManagementHelper.GetView(userInfo.IsEnabledSubsidiary,
                tokenInfo.IsMasterLicensee, userInfo.UserLevel, tokenInfo.WhiteLabelID);
            userSession.OperatorId = userInfo.OperatorID;
            userSession.PortalFunctionList = tokenInfo.Permissions.ToArray();
            userSession.DefaultBaseCurrency = string.IsNullOrEmpty(userInfo.BaseCurrency) ? _appSettings.DefaultBaseCurrency
                : userInfo.BaseCurrency;
        }

        private OneAuthUserInfo GetUserInfo(DefaultAuthInfo<OneAuthPermission, OneAuthCurrency> tokenInfo)
        {
            var userInfo = _oneAuthDataAccess.GetUserInfo(tokenInfo.UserSEQ, tokenInfo.VendorID);

            userInfo.CurrencyUserList = tokenInfo.Currency?.Select(x => new CurrencyUser
            {
                IsActive = true,
                CurrencyId = x.CurrencyId,
                CurrencyName = x.Currency,
                AgentIdList = x.AgentId
            }).ToList();

            return userInfo;
        }

        private void CreateSession(
            string languageCode,
            DefaultAuthInfo<OneAuthPermission, OneAuthCurrency> tokenInfo,
            Licensee licenseeInfo,
            OneAuthUserInfo userInfo)
        {
            var licSession = new LicenseeAuthInfo
            {
                LicenseeId = licenseeInfo.Id,
                IsAllowedCustomerComm = licenseeInfo.IsAllowedCustomerComm,
                IsEnableBA = licenseeInfo.IsEnableBA,
                LicenseeName = licenseeInfo.Name
            };

            var userSession = new UserAuthInfo
            {
                UserId = tokenInfo.UserSEQ,
                OnUserId = tokenInfo.UserSEQ,
                UserName = tokenInfo.UserID,
                UserLevel = userInfo.UserLevel,
                SubsidiaryViewType = (byte)SubsidiaryManagementHelper.GetView(userInfo.IsEnabledSubsidiary,
                tokenInfo.IsMasterLicensee, userInfo.UserLevel, tokenInfo.WhiteLabelID),
                OperatorId = userInfo.OperatorID,
                WhiteLabelID = tokenInfo.WhiteLabelID,
                IsInternal = true,
                FunctionList = new List<Function>(),
                PortalFunctionList = tokenInfo.Permissions.ToArray(),
                Language = languageCode,
                DefaultReportUrl = "LicenseeWinLossReport",
                ApplicationMode = AppMode.Parasitic,
                VendorID = tokenInfo.VendorID,
                VendorIdentityID = tokenInfo.UserID,
                IsSuperAdmin = tokenInfo.IsAdminstrator,
                DefaultBaseCurrency = string.IsNullOrEmpty(userInfo.BaseCurrency) ? _appSettings.DefaultBaseCurrency
                : userInfo.BaseCurrency
            };

            _sessionService.AssignCurrenciesToUserSession(userSession, licenseeInfo.Id, userInfo.CurrencyUserList);

            _sessionService.AssignSessions(userSession, licSession);
        }
    }
}