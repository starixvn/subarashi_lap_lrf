namespace Fanex.Athena.Module.PlayerAdmin.Controllers
{
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.ViewModels;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Service.Core.Common.Interfaces;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.VendorAdapter.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    //check product belongs to
    public class SportBookBetLimitController : PlayerBetLimitBaseControler
    {
        private readonly ISportBookBetLimitService _service;

        public SportBookBetLimitController(
            ILanguageService languageService,
            ISessionService sessionService,
            IAppSettings appSettings,            
            ICacheRefAdapter cacheRefAdapter,
            IAuthorizationService authorizationService,
            ISportBookBetLimitService sportBookBetLimitService)
            : base(languageService, sessionService, appSettings, cacheRefAdapter, authorizationService)
        {
            _service = sportBookBetLimitService;
        }

        [HttpPost]
        [AjaxRequest]
        [ValidatePermissionOnData(isObject:true)]
        public async Task<JsonResult> GetSetting(PlayerBetLimitSelectMetaModel metaModel)
        {
            var isEditable = HasEditPermission();
            var data = await _service.GetSettingAsync(metaModel.CustId, AppSettings.IsShowMixedSport).ConfigureAwait(false);
            var copySportId = ((int)SportType.Soccer).ToString();

            var viewModel = new PlayerBetLimitViewModel
            {
                Data = AddSettingTypeName(data),
                Editable = isEditable,
                CopyId = copySportId,
                EnableCopy = data.Any(x => x.Id == copySportId)
            };

            return Json(viewModel);
        }

        [HttpPost]
        [AjaxRequest]
        [ValidatePermissionOnData(isObject:true)]
        [FunctionAuthorization(Model.Auth.DataDomain.PermissionKeys.PlayerAdminBetLimit)]
        public async Task<JsonResult> UpdateSetting(PlayerBetLimitUpdateMetaModel<PlayerBetLimitMetaModel> metaModel)
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
    }
}