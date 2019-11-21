// -----------------------------------------------------------------------
// <copyright file="HeaderController.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers
{
    using DataAccess.Core.Users.Interfaces;

    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Auth.Enum;
    using Fanex.Athena.Model.Core.ViewModel;

    using System.Linq;
    using System.Web.Mvc;

    using Web.ActionFilter;

    [AuthorizeRestriction(AppMode.Self)]
    public class HeaderController : CultureBaseController
    {
        private readonly ILicenseeDataAccess _licenseeDataAccess;

        public HeaderController(
            ILicenseeDataAccess licenseeDataAccess)
        {
            _licenseeDataAccess = licenseeDataAccess;
        }

        [HttpGet]
        public ActionResult Index()
        {
            var userSession = SessionServiceInstance.UserSession;
            var licensee = SessionServiceInstance.LicenseeSession;
            var viewModel = new HeaderPageViewModel
            {
                Language = userSession.Language,
                OnUserId = userSession.OnUserId,
                LicenseeList = _licenseeDataAccess.GetByUser(userSession.UserId),
                IsInternalLogin = userSession.IsInternal,
                HasRecheckIn = !AppSettingInstance.LocalTest,
                SupportedLanguageList = Util.SupportedLanguages,
                UserName = userSession.UserName,
                CurrentLicenseeId = licensee.LicenseeId,
                IsAllowedManagementMember = userSession.FunctionList.Any(x => x.FunctionKey == PermissionKeys.CustomerInfoCustomerList),
                IsFakeLicensee = IsFakeLicensee(licensee.LicenseeName),
                IsAllowedNotification = userSession.FunctionList.Any(x => x.FunctionKey == PermissionKeys.ResultAmendmentNotificationReport)
            };
            return View("~/Views/Desktop/Header/Index.cshtml", viewModel);
        }

        public ActionResult ChangeLicensee(int? licenseeId)
        {
            var newLicenseeId = licenseeId ?? 0;
            var originalLicenseeId = SessionServiceInstance.LicenseeSession.LicenseeId;
            var originalUserId = SessionServiceInstance.UserSession.UserId;

            if (newLicenseeId <= 0 || !_licenseeDataAccess.IsLicenseeBelongToUser(originalLicenseeId, originalUserId))
            {
                newLicenseeId = originalLicenseeId;
            }

            if (newLicenseeId != originalLicenseeId)
            {
                SessionServiceInstance.UpdateLiceseeSession(newLicenseeId);
            }

            ViewBag.DefaultReportUrl = SessionServiceInstance.UserSession.DefaultReportUrl;
            return Redirect("~");
        }

        /// <summary>
        /// Change language.
        /// </summary>
        /// <param name="languagesite">The language code.</param>
        /// <returns>Return "1" if changing is success.</returns>
        [HttpGet]
        public string ChangeLanguage(string languagesite)
        {
            var changed = false;
            if (!string.IsNullOrEmpty(languagesite))
            {
                var languageCode = languagesite.Trim();
                if (Util.IsValidLanguage(languageCode))
                {
                    var currentLang = LangService.GetCurrentLanguage();
                    if (!currentLang.Equals(languageCode))
                    {
                        changed = LangService.ChangeLanguage(languageCode);
                    }
                }
            }

            return changed ? "1" : "0";
        }
    }
}