using Fanex.Athena.Api.Base;
using Fanex.Athena.Model.Core.ViewModel;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.Utilities;
using Fanex.Athena.Resources;
using Fanex.Athena.Service.Core.Common.Interfaces;
using System.Web.Http;

namespace Fanex.Athena.Module.PlayerAdmin.Api
{
    public class PlayerBaStatusController : ExternalApiBaseController
    {
        private readonly IPlayerBaStatusService _playerBaStatusService;
        private readonly IProductService _productService;

        public PlayerBaStatusController(
            IPlayerBaStatusService playerBaStatusService,
            IProductService productService)
        {
            _playerBaStatusService = playerBaStatusService;
            _productService = productService;
        }

        [HttpPost]
        public dynamic Update(BaStatusUpdatingMetaModel metaModel)
        {
            AssignCommonProperties(metaModel);

            var productAccess = _productService.GetProductAccess(metaModel.LicenseeId, metaModel.Language);
            if (!productAccess.IsAllowBA)
            {
                return CreateUpdatingBaResult(false, ViewResources.NotAllowBA);
            }

            var updateResult = _playerBaStatusService.Update(metaModel);

            if (updateResult.IsSuccessful)
            {
                return CreateUpdatingBaResult(true, updateResult.Message, updateResult.ExtendedData);
            }

            return CreateUpdatingBaResult(false, updateResult.Message);
        }

        private void AssignCommonProperties(PlayerUpdatingBaseMetaModel param)
        {
            param.LicenseeId = LicenseeId;
            param.UserId = UserId;
            param.Language = UpdatingUtils.GetLanguageCode(Language);
            param.Ip = string.Empty;
        }

        private static ResultViewModel CreateUpdatingBaResult(bool isSuccessful, string message, string oddsGroup = null)
        {
            return new ResultViewModel
            {
                Success = isSuccessful,
                Message = message,
                ExtendedData = oddsGroup
            };
        }
    }
}