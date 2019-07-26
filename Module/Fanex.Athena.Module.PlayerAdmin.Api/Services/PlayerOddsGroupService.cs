using Fanex.Athena.Model.Core.ViewModel;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Repository.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.Utilities;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Services
{
    public class PlayerOddsGroupService : IPlayerOddsGroupService
    {
        private readonly IPlayerOddsGroupRepository _playerOddsGroupRepository;

        private readonly IAuthorizationService _authorizationService;

        private readonly ILicenseeSettingService _licenseeSettingService;

        public PlayerOddsGroupService(
            IPlayerOddsGroupRepository playerOddsGroupRepository,
            IAuthorizationService authorizationService,
            ILicenseeSettingService licenseeSettingService)
        {
            _playerOddsGroupRepository = playerOddsGroupRepository;
            _authorizationService = authorizationService;
            _licenseeSettingService = licenseeSettingService;
        }

        public ResultViewModel Update(OddsGroupUpdatingMetaModel metaModel)
        {
            if (_licenseeSettingService.IsFakeLicensee(metaModel.SiteName))
            {
                return new ResultViewModel
                {
                    Success = false,
                    ErrorMessage = ResourceKeyConstants.FunctionDenied
                };
            }

            if (!_authorizationService.HasPermissionOnData(metaModel.LicenseeId, metaModel.CustId, 0))
            {
                return new ResultViewModel
                {
                    Success = false,
                    ErrorMessage = ResourceKeyConstants.InvalidData
                };
            }

            var result = _playerOddsGroupRepository.Update(metaModel);

            return new ResultViewModel
            {
                Success = result.IsSuccessful,
                Message = result.Message,
                ErrorCode = result.Code
            };
        }
    }
}