using Fanex.Athena.Model.Core.ViewModel;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Repository.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.Utilities;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Services
{
    public class PlayerSpecialLevelService : IPlayerSpecialLevelService
    {
        private readonly IPlayerSpecialLevelRepository _playerSpecialLevelRepository;

        private readonly IAuthorizationService _authorizationService;

        private readonly ILicenseeSettingService _licenseeSettingService;

        public PlayerSpecialLevelService(
            IPlayerSpecialLevelRepository playerSpecialLevelRepository,
            IAuthorizationService authorizationService,
            ILicenseeSettingService licenseeSettingService)
        {
            _playerSpecialLevelRepository = playerSpecialLevelRepository;
            _authorizationService = authorizationService;
            _licenseeSettingService = licenseeSettingService;
        }

        public ResultViewModel Update(SpecialLevelUpdatingMetaModel metaModel)
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
                return UpdatingUtils.CreateErrorResult();
            }

            var result = _playerSpecialLevelRepository.Update(metaModel);

            return new ResultViewModel
            {
                Success = result.IsSuccessful,
                Message = result.Message,
                ErrorCode = result.Code
            };
        }
    }
}