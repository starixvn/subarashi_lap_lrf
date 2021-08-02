namespace Fanex.Athena.Module.PlayerAdmin.Services
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Autofac.Features.AttributeFilters;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Module.PlayerAdmin.DataDomains;
    using Fanex.Athena.Module.PlayerAdmin.DTO;
    using Fanex.Athena.Module.PlayerAdmin.Helpers;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Repositories.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    public class DcsBetLimitService : IDcsBetLimitService
    {
        private static readonly int[] ProductsHasStatus = { ProductTypes.Lottery, ProductTypes.I4D, ProductTypes.SLT, ProductTypes.AllBet, ProductTypes.Voidbridge, ProductTypes.CashOut,
            ProductTypes.Exchange, ProductTypes.PP, ProductTypes.SXG, ProductTypes.GDG, ProductTypes.HB, ProductTypes.JK, ProductTypes.SAG, ProductTypes.PGS, ProductTypes.SBC, ProductTypes.WM,
            ProductTypes.SG, ProductTypes.VRG, ProductTypes.CC, ProductTypes.CG};

        private readonly IDcsBetLinitRepository _repository;

        private readonly IBusinessLogService _businessLogService;

        public DcsBetLimitService(
            IDcsBetLinitRepository repository,
            [KeyFilter("PlayerAdminLogService")]IBusinessLogService businessLogService)
        {
            _repository = repository;
            _businessLogService = businessLogService;
        }

        public async Task<IEnumerable<PlayerBetLimit>> GetSettingAsync(int custId, int productId)
        {
            return await _repository.GetSettingAsync(custId, productId).ConfigureAwait(false);
        }

        public async Task<bool?> GetStatusAsync(int custId, int productId)
        {
            if (!ProductsHasStatus.Contains(productId))
            {
                return true;
            }

            return await _repository.GetStatusAsync(custId, productId).ConfigureAwait(false);
        }

        public async Task<IResultInfo> UpdateSettingAsync(PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>> metaModel)
        {
            var result = await _repository.UpdateSettingAsync(metaModel).ConfigureAwait(false);

            var logInfo = PlayerAdminBetLimitActionLogHelper.CreateLogInfo(
                metaModel,
                x => x.Id,
                result.Code == 0,
                metaModel.ProductId == ProductTypes.Lottery
                    ? new[] { LogActionDetailId.UpdatingMinBet, LogActionDetailId.UpdatingMaxBet, LogActionDetailId.UpdatingMaxBetPerDraw }
                    : new[] { LogActionDetailId.UpdatingMinBet, LogActionDetailId.UpdatingMaxBet, LogActionDetailId.UpdatingMaxPerMatch });

            _businessLogService.Write(BusinessLogType.CustomerBetSetting, logInfo);

            return result;
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