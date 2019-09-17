namespace Fanex.Athena.Module.PlayerAdmin.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Module.PlayerAdmin.DTO;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Repositories.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.ViewModels;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Service.Core.Common.Interfaces;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.VendorAdapter.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    [ValidateProductPermission(ProductTypes.Keno)]
    public class RngKenoBetLimitController : PlayerBetLimitBaseControler
    {
        private readonly IRngKenoBetLimitRepository _repository;

        public RngKenoBetLimitController(
            ILanguageService languageService,
            ISessionService sessionService,
            ICacheRefAdapter cacheRefAdapter,
            IAuthorizationService authorizationService,
            IRngKenoBetLimitRepository rngKenoBetLimitRepository)
            : base(languageService, sessionService, cacheRefAdapter, authorizationService)
        {
            _repository = rngKenoBetLimitRepository;
        }

        [HttpPost]
        [AjaxRequest]
        [ValidatePermissionOnData(isObject:true)]
        public async Task<JsonResult> GetSetting(PlayerBetLimitSelectMetaModel metaModel)
        {
            var isEditable = HasEditPermission();
            var data = await _repository.GetSettingAsync(metaModel.CustId).ConfigureAwait(false);

            var viewModel = new PlayerBetLimitViewModel
            {
                Data = AddProductName(data),
                Editable = isEditable
            };

            return Json(viewModel);
        }

        [HttpPost]
        [AjaxRequest]
        [ValidatePermissionOnData(isObject:true)]
        [FunctionAuthorization(PermissionKeys.PlayerAdminBetLimit_Write)]
        public async Task<JsonResult> UpdateSetting(PlayerBetLimitUpdateMetaModel<PlayerBetLimitMetaModel> metaModel)
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

        private static IEnumerable<PlayerBetLimit> AddProductName(IEnumerable<PlayerBetLimit> data)
        {
            foreach (var item in data)
            {
                item.BetSettingType = ViewResources.ProductKN;
            }

            return data;
        }
    }
}