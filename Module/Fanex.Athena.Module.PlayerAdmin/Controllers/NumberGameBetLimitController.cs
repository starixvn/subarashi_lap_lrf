namespace Fanex.Athena.Module.PlayerAdmin.Controllers
{
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Module.PlayerAdmin.DTO;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Repository.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.ViewModels;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Service.Core.Common.Interfaces;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.VendorAdapter.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    //check product belongs to
    public class NumberGameBetLimitController : PlayerBetLimitBaseControler
    {
        private readonly INumberGameBetLimitRepository _repository;

        private readonly IAuthorizationService _authService;

        private readonly ICacheRefAdapter _cacheRefAdapter;

        public NumberGameBetLimitController(
            ILanguageService languageService,
            ISessionService sessionService,
            IAppSettings appSettings,
            ICacheRefAdapter cacheRefAdapter,
            IAuthorizationService authorizationService,
            INumberGameBetLimitRepository numberGameBetLimitRepository)
            : base(languageService, sessionService, appSettings, cacheRefAdapter, authorizationService)
        {
            _repository = numberGameBetLimitRepository;
        }

        [HttpPost]
        [AjaxRequest]
        [ValidatePermissionOnData(isObject:true)]
        public async Task<JsonResult> GetSetting(PlayerBetLimitSelectMetaModel metaModel)
        {
            //var isEditable = HasEditPermission();
            var data = await _repository.GetSettingAsync(metaModel.CustId).ConfigureAwait(false); ;
            var copySportId = ((int)SportType.Soccer).ToString();

            var viewModel = new PlayerBetSettingViewModel<PlayerBetLimit>
            {
                Data = AddSettingTypeName(data),
                //Editable = isEditable,
                Editable = true
            };

            return Json(viewModel);
        }

        [HttpPost]
        [AjaxRequest]
        [ValidatePermissionOnData(isObject:true)]
        //[FunctionAuthorization(Model.Auth.DataDomain.PermissionKeys.PlayerAdminBetLimit)]
        public async Task<JsonResult> UpdateSetting(PlayerBetLimitUpdateMetaModel metaModel)
        {
            var user = SessionService.UserSession;
            AddUpdateInfo(metaModel, user.UserId, user.Language, SessionService.LicenseeSession.LicenseeName, Request.UserHostAddress);

            var result = await _repository.UpdateSettingAsync(metaModel).ConfigureAwait(false);

            if (result.Code == 0)
            {
                result.Message = string.Format(ViewResources.UpdateSuccess);
            }

            return Json(result);
        }
    }
}