using Fanex.Athena.Model.Core.ViewModel;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Repository.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.Utilities;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Services
{
    public class PlayerBaStatusService : IPlayerBaStatusService
    {
        private readonly IPlayerBaStatusRepository _playerBaStatusRepository;

        private readonly IAuthorizationService _authorizationService;

        private readonly IProductService _productService;

        public PlayerBaStatusService(
            IPlayerBaStatusRepository playerBaStatusRepository,
            IAuthorizationService authorizationService,
            IProductService productService)
        {
            _playerBaStatusRepository = playerBaStatusRepository;
            _authorizationService = authorizationService;
            _productService = productService;
        }

        public ResultViewModel Update(BaStatusUpdatingMetaModel metaModel)
        {
            var productAccess = _productService.GetProductAccess(metaModel.LicenseeId, metaModel.Language);
            if (!productAccess.IsAllowBA)
            {
                return CreateErrorResult(ResourceKeyConstants.NotAllowBA);
            }

            if (!_authorizationService.HasPermissionOnData(metaModel.LicenseeId, metaModel.CustId, 0))
            {
                return CreateErrorResult(ResourceKeyConstants.InvalidData);
            }

            var result = _playerBaStatusRepository.Update(metaModel);

            return new ResultViewModel
            {
                Success = result.IsSuccessful,
                Message = result.Message,
                ErrorCode = result.Code,
                ExtendedData = result.ExtendedData
            };
        }

        private static ResultViewModel CreateErrorResult(string errMsg)
        {
            return new ResultViewModel
            {
                Success = false,
                ErrorMessage = errMsg
            };
        }
    }
}