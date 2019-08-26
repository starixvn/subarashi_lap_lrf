namespace Fanex.Athena.Module.PlayerAdmin.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using System.Web.SessionState;
    using System.Web.UI;
    using Fanex.Athena.Controllers;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Module.PlayerAdmin.DTO;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Repository.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.ViewModels;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Service.Core.Common.Interfaces;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.VendorAdapter.Interfaces;
    using Fanex.Athena.Web.ActionFilter;
    using ONEbook.UM.Filters;

    [SessionState(SessionStateBehavior.ReadOnly)]
    [CheckUMFilter]
    //[AuthorizeRestriction(AppMode.Parasitic)]
    //[FunctionAuthorization(PermissionKeys.PlayerAdmin)]
    //check product belongs to
    [CustomValidateAntiForgery]
    [OutputCache(NoStore = true, Duration = 0, Location = OutputCacheLocation.None, VaryByParam = "*")]
    public class DcsBetLimitController : CultureBaseController
    {
        private static readonly int[] Product = new[] { ProductTypes.VirtualSports, ProductTypes.VirtualSports2, ProductTypes.Lottery };

        private static readonly int[] ProductsHasStatus = new[] { ProductTypes.Lottery };

        private readonly IDcsBetSettingRepository _repository;

        private readonly IAuthorizationService _authService;

        private readonly ICacheRefAdapter _cacheRefAdapter;

        public DcsBetLimitController(
            ILanguageService languageService,
            ISessionService sessionService,
            IAppSettings appSettings,
            IDcsBetSettingRepository dcsBetSettingRepository,
            ICacheRefAdapter cacheRefAdapter,
            IAuthorizationService authorizationService)
            : base(languageService, sessionService, appSettings, null)
        {
            _repository = dcsBetSettingRepository;
            _authService = authorizationService;
            _cacheRefAdapter = cacheRefAdapter;
        }

        [HttpPost]
        [AjaxRequest]
        [ValidatePermissionOnData(isObject:true)]
        public async Task<JsonResult> GetSetting(PlayerBetLimitSelectMetaModel metaModel)
        {
            //if (!Product.Contains(metaModel.ProductId))
            //{
            //    throw new ArgumentException("Invalid product.");
            //}

            //var isEditable = _authService.HasPermissions(
            //    SessionService.UserSession.PortalFunctionList,
            //    Model.Auth.DataDomain.PermissionKeys.PlayerAdminBetLimit);
            var data = GetDataAsync(metaModel);
            var status = GetStatusAsync(metaModel);

            await Task.WhenAll(data, status).ConfigureAwait(false);

            var viewModel = new PlayerBetSettingViewModel<PlayerBetLimit>
            {
                Data = await data,
                //Editable = isEditable && await status
                Editable = true
            };

            return Json(viewModel);
        }

        [HttpPost]
        [AjaxRequest]
        [ValidatePermissionOnData(isObject: true)]
        //[FunctionAuthorization(Model.Auth.DataDomain.PermissionKeys.PlayerAdminBetLimit)]
        public async Task<JsonResult> UpdateSetting(PlayerBetLimitUpdateMetaModel metaModel)
        {
            if (!metaModel.Setting.Any())
            {
                throw new ArgumentException(ViewResources.InvalidParams);
            }

            var user = SessionService.UserSession;
            AddUpdateInfo(metaModel, user.UserId, user.Language, SessionService.LicenseeSession.LicenseeName, Request.UserHostAddress);

            var result = await _repository.UpdateSettingAsync(metaModel).ConfigureAwait(false);

            if (result.Code == 0)
            {
                result.Message = string.Format(ViewResources.UpdateSuccess);
            }

            return Json(result);
        }

        private static void AddUpdateInfo(PlayerBetLimitUpdateMetaModel metaModel, int userId, string language, string siteName, string ip)
        {
            metaModel.UserId = userId;
            metaModel.Language = language;
            metaModel.SiteName = siteName;
            metaModel.Ip = ip;
        }

        private async Task<IEnumerable<PlayerBetLimit>> GetDataAsync(PlayerBetLimitSelectMetaModel metaModel)
        {
            var data = await _repository.GetSettingAsync(metaModel.CustId, metaModel.ProductId).ConfigureAwait(false);

            foreach (var item in data)
            {
                item.BetSettingType = GetSportName(item.SportId);
            }

            return data;
        }

        private async Task<bool> GetStatusAsync(PlayerBetLimitSelectMetaModel metaModel)
        {
            if (!ProductsHasStatus.Contains(metaModel.ProductId))
            {
                return true;
            }

            return await _repository.GetStatusAsync(metaModel.CustId, metaModel.ProductId).ConfigureAwait(false);
        }

        private string GetSportName(string sportId) => _cacheRefAdapter.GetSportName(sportId);
    }
}