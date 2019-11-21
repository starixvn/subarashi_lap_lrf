// -----------------------------------------------------------------------
// <copyright file="BaseController.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers
{
    using Extension.Utility;

    using Fanex.Athena.Controllers.Base;
    using Fanex.Athena.Service.Core.Common.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    using Service.Core.Users.Interfaces;

    using System.Web.Mvc;

    [CustomAuthorize]
    [XFrameOption]
    public class CultureBaseController : Controller
    {
        protected const string DefaultLanguage = "en-US";
        public ILanguageService LangService { get; set; }
        public ISessionService SessionServiceInstance { get; set; }
        public IAppSettings AppSettingInstance { get; set; }
        public ILicenseeSettingService LicenseeSettingServiceInstance { get; set; }

        public bool IsFakeLicensee(string licenseeName)
        {
            return LicenseeSettingServiceInstance.IsFakeLicensee(licenseeName);
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

        protected static JsonNetResult JsonString(string jsonData)
        {
            return new JsonNetResult(jsonData);
        }
    }
}