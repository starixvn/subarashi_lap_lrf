// -----------------------------------------------------------------------
// <copyright file="RngCasinoBetSettingService.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Service.BetSettings
{
    using System.Collections.Generic;
    using System.Threading.Tasks;


    using DataAccess.BetSettings.Interfaces;

    using Extension.Utility;

    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Interfaces;

    using Model.BetSettings.DTO.RngCasino;
    using Model.BetSettings.MetaModel;
    using Model.BetSettings.ViewModel;
    using Model.Core.DTO.Common;
    using Model.Customer.DTO;

    using Resources;

    public class RngCasinoBetSettingService : BetSettingBaseService, IRngCasinoBetSettingService
    {
        private readonly IRngCasinoBetSettingDataAccess _betSettingDataAccess;

        private readonly IAppSettings _appSettings;

        private readonly ILGAPIClient _lgClient;
        public RngCasinoBetSettingService(
            IAppSettings appSettings,
            IRngCasinoBetSettingDataAccess betSettingDataAccess,
            ILGAPIClient lgClient
            )
        {
            _betSettingDataAccess = betSettingDataAccess;
            _appSettings = appSettings;
            _lgClient = lgClient;
        }

        public async Task<RngCasinoBetSettingViewModel> GetViewModelAsync(int custId, CustomerInfo customer, string language)
        {
            IList<GameKind> gameKinds = new List<GameKind>();
            if (customer.SyncCasino)
            {
                const string apiPath = "/RngCasino/Settings";
                var temp = await _lgClient.PostAsync<APIResult<IList<GameKind>>>(apiPath, new { custId, customer.CurrencyID, language }, language).ConfigureAwait(false);
                if (temp != null)
                {
                    gameKinds = temp.Data;
                }
            }

            return new RngCasinoBetSettingViewModel
            {
                GameKinds = gameKinds,
                IsEnabled = IsRngCasinoEnabled(customer)
            };
        }

        public async Task<IResultInfo> UpdateStatusAsync(BetSettingCasinoStatusMetaModel metaModel)
        {
            if (metaModel.IsSyncCasino && !_appSettings.IsDisableRngCasino)
            {
                const string apiPath = "/RngCasino/Status";
                var updatingCasino = await _lgClient.PostAsync<APIResult<bool>>(apiPath,
                    metaModel, "en-US").ConfigureAwait(false);

                return updatingCasino != null && !updatingCasino.Data ? ErrorResult(ViewResources.UpdateUnSuccess) :
                    await _betSettingDataAccess.UpdateStatusAsync(metaModel);
            }

            return new ResultInfo { Code = 1, Message = ViewResources.RNGCasinoUpdateSettingUnAvailableMsg };
        }

        public async Task<IResultInfo> UpdateSettingAsync(RngCasinoBetSettingMetaModel metaModel, bool isSyncCasino, bool isDisableCasino)
        {
            if (isDisableCasino)
            {
                return ErrorResult(ViewResources.AccessDeniedMsg);
            }

            if (isSyncCasino)
            {
                if (!_appSettings.IsDisableRngCasino)
                {
                    const string apiPath = "/RngCasino/UpdateSetting";

                    var temp = await _lgClient.PostAsync<APIResult<bool>>(apiPath, new
                    {
                        StakeLevelList = metaModel.StackLevelParam,
                        RequestIP = metaModel.Ip,
                        metaModel.CustId,
                        metaModel.ModifyById,
                        metaModel.ModifyByUsername
                    }, "en-US").ConfigureAwait(false);

                    bool result = temp != null && temp.Data;
                    return result ?
                        new ResultInfo { Code = 0, Message = ViewResources.MessageSuccess }
                        : new ResultInfo { Code = 1, Message = ViewResources.Fail };
                }
                else
                {
                    return new ResultInfo { Code = 1, Message = ViewResources.RNGCasinoUpdateSettingUnAvailableMsg };
                }
            }

            return new ResultInfo { Code = 1, Message = ViewResources.RNGCasinoUpdateSettingUnAvailableMsg };
        }

        private static bool? IsRngCasinoEnabled(CustomerInfo customer)
        {
            if (!customer.DisableCasino && customer.SyncCasino)
            {
                return true;
            }

            if (!customer.SyncCasino)
            {
                return null;
            }

            return false;
        }
    }
}