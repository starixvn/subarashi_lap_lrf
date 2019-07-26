using Fanex.Athena.Model.Core.DTO.Common;
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

        public IResultInfo Update(BaStatusUpdatingMetaModel metaModel)
        {
            var productAccess = _productService.GetProductAccess(metaModel.LicenseeId, metaModel.Language);
            if (!productAccess.IsAllowBA)
            {
                return new ResultInfo
                {
                    Code = UpdatingUtils.DefaultErrCode,
                    Message = ResourceKeyConstants.NotAllowBA
                };
            }

            if (!_authorizationService.HasPermissionOnData(metaModel.LicenseeId, metaModel.CustId, 0))
            {
                return new ResultInfo
                {
                    Code = UpdatingUtils.DefaultErrCode,
                    Message = ResourceKeyConstants.InvalidData
                };
            }

            return _playerBaStatusRepository.Update(metaModel);
        }
    }
}