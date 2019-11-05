using System.Web.Http;
using Fanex.Athena.Api.StatelessBase;
using Fanex.Athena.Api.StatelessBase.Attributes;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Module.PlayerAdmin.Api.ViewModels;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Controllers
{
    [ApiOneAuthorization(AllowFunctionKeys = PermissionKeys.PlayerAdmin)]
    public class SiteSettingController : ExternalApiBaseController
    {
        private readonly ILicenseeSettingService _licenseeSettingService;

        private readonly IAuthorizationService _authService;

        public SiteSettingController(ILicenseeSettingService licenseeSettingService, IAuthorizationService authService)
        {
            _licenseeSettingService = licenseeSettingService;
            _authService = authService;
        }

        [HttpPost]
        public SiteSettingViewModel GetSetting()
        {
            var licenseeInfo = _licenseeSettingService.GetLicenseeInfo(SiteName);

            return new SiteSettingViewModel
            {
                IsAllowedCustomerComm = licenseeInfo != null && licenseeInfo.IsAllowedCustomerComm,
                IsAllowedBA = licenseeInfo != null && licenseeInfo.IsEnableBA &&
                _authService.CheckProductBelongsTo(SiteName, ProductTypes.BA)
            };
        }
    }
}