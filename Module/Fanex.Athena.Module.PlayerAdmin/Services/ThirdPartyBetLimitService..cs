namespace Fanex.Athena.Module.PlayerAdmin.Services
{
    using System.Threading.Tasks;
    using Autofac.Features.AttributeFilters;
    using Fanex.Athena.Model.BetSettings.DTO;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Module.PlayerAdmin.DataDomains;
    using Fanex.Athena.Module.PlayerAdmin.Helpers;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Repositories.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    public class ThirdPartyBetLimitService : IThirdPartyBetLimitService
    {
        private readonly IThirdPartyBetLimitRepository _repository;

        private readonly IBusinessLogService _businessLogService;

        public ThirdPartyBetLimitService(
            IThirdPartyBetLimitRepository repository,
            [KeyFilter("PlayerAdminLogService")]IBusinessLogService businessLogService)
        {
            _repository = repository;
            _businessLogService = businessLogService;
        }

        public async Task<ThirdPartyBetSetting> GetBetSettingAsync(int custId, int productId)
        {
            return await _repository.GetBetSettingAsync(custId, productId).ConfigureAwait(false);
        }

        public async Task<IResultInfo> UpdateStatusAsync(PlayerBetLimitProductStatusUpdateMetaModel metaModel)
        {
            var result = await _repository.UpdateStatusAsync(metaModel).ConfigureAwait(false);

            var logInfo = PlayerAdminProductStatusUpdateActionLogHelper.CreateLogInfo(
                metaModel,
                result.Code == 0,
                LogActionDetailId.UpdatingProductStatus);

            _businessLogService.Write(BusinessLogType.CustomerBetSetting, logInfo);

            return result;
        }
    }
}