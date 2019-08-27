namespace Fanex.Athena.Module.PlayerAdmin.Controllers
{
    using System;
    using System.Linq;
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
    public class DcsBetLimitController : PlayerBetLimitBaseControler
    {
        private static readonly int[] Product = new[] { ProductTypes.VirtualSports, ProductTypes.VirtualSports2, ProductTypes.Lottery };

        private static readonly int[] ProductsHasStatus = new[] { ProductTypes.Lottery };

        private readonly IDcsBetLinitRepository _repository;

        public DcsBetLimitController(
            ILanguageService languageService,
            ISessionService sessionService,
            IAppSettings appSettings,          
            ICacheRefAdapter cacheRefAdapter,
            IAuthorizationService authorizationService,
            IDcsBetLinitRepository dcsBetSettingRepository)
            : base(languageService, sessionService, appSettings, cacheRefAdapter, authorizationService)
        {
            _repository = dcsBetSettingRepository;
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

            //var isEditable = _HasEditPermission();
            var data = _repository.GetSettingAsync(metaModel.CustId, metaModel.ProductId);
            var status = GetStatusAsync(metaModel);

            await Task.WhenAll(data, status).ConfigureAwait(false);

            var viewModel = new PlayerBetSettingViewModel
            {
                Data = AddSettingTypeName(await data),
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

        private async Task<bool> GetStatusAsync(PlayerBetLimitSelectMetaModel metaModel)
        {
            if (!ProductsHasStatus.Contains(metaModel.ProductId))
            {
                return true;
            }

            return await _repository.GetStatusAsync(metaModel.CustId, metaModel.ProductId).ConfigureAwait(false);
        }
    }
}