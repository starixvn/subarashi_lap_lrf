// -----------------------------------------------------------------------
// <copyright file="BaseController.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers
{
    using System.Web.Mvc;

    using Autofac.Integration.Mvc;

    using Extension.Utility;
    using Fanex.Athena.Controllers.Base;
    using Fanex.Athena.Service.Core.Common.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    using Service.Core.Users.Interfaces;

    [CustomAuthorize]
    [XFrameOption]
    public class CultureBaseController : Controller
    {
        protected const string DefaultLanguage = "en-US";

        private readonly ILanguageService _langService;

        private readonly ISessionService _sessionService;

        private IAppSettings _appSettings;

        private ILicenseeSettingService _licenseeSettingService;

        protected CultureBaseController(
           ILanguageService languageService,
           ISessionService sessionService
           ) : this(languageService, sessionService, null, null)
        {
        }

        protected CultureBaseController(
          ILanguageService languageService,
          ISessionService sessionService,
          ILicenseeSettingService licenseeSettingService
          ) : this(languageService, sessionService, null, licenseeSettingService)
        {
        }

        protected CultureBaseController(
            ILanguageService languageService,
            ISessionService sessionService,
            IAppSettings appSettings,
            ILicenseeSettingService licenseeSettingService
            )
        {
            _langService = languageService ?? AutofacDependencyResolver.Current.GetService<ILanguageService>();
            _sessionService = sessionService ?? AutofacDependencyResolver.Current.GetService<ISessionService>();
            _appSettings = appSettings;
            _licenseeSettingService = licenseeSettingService;
        }

        public ILanguageService LangService
        {
            get { return _langService; }
        }

        public ISessionService SessionService
        {
            get { return _sessionService; }
        }

        public IAppSettings AppSettings
        {
            get
            {
                if (_appSettings == null)
                {
                    _appSettings = AutofacDependencyResolver.Current.GetService<IAppSettings>();
                }
                return _appSettings;
            }
        }

        public ILicenseeSettingService LicenseeSettingService
        {
            get
            {
                if (_licenseeSettingService == null)
                {
                    _licenseeSettingService = AutofacDependencyResolver.Current.GetService<ILicenseeSettingService>();
                }
                return _licenseeSettingService;
            }
        }

        public bool IsFakeLicensee(string licenseeName)
        {
            return LicenseeSettingService.IsFakeLicensee(licenseeName);
        }

        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            var currentLanguage = LangService.GetCurrentLanguage();
            LangService.SetPageCulture(currentLanguage);
        }

        protected JsonResult JsonNet(object data)
        {
            return new JsonNetResult
            {
                Data = data,
            };
        }
        protected JsonNetResult JsonString(string jsonData)
        {
            return new JsonNetResult(jsonData);
        }
    }
}