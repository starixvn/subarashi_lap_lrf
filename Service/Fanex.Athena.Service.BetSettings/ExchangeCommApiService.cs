// -----------------------------------------------------------------------
// <copyright file="LiveCasinoBetSettingService.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Service.BetSettings
{
    using System.Threading.Tasks;

    using DataAccess.BetSettings.Interfaces;
    using DataAccess.Core.Common.Constants;
    using DataAccess.Core.Common.Interfaces;

    using Extension.Utility;
    using Fanex.Athena.Model.BetSettings.DTO.Exchange;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Interfaces;

    using Model.Core.DataDomain;
    using Model.Core.DTO.Common;
    using Model.Core.MetaModel.Common;

    using Resources;

    public class ExchangeCommApiService : BetSettingBaseService, IExchangeCommApiService
    {
        private const int AccessDeniedCode = 1;

        private const int ApiProcessingErrorCode = 102;

        private const int SuccessStatus = 1;

        private readonly ISPLogDataAccess _userLogDataAccess;

        private readonly IAppSettings _appSetting;

        private readonly ILGAPIClient _lgClient;

        private readonly IDcsBetSettingDataAccess _betSettingDataAccess;

        public ExchangeCommApiService(
            ISPLogDataAccess userLogDataAccess,
            IDcsBetSettingDataAccess betSettingDataAccess,
            IAppSettings appSetting,
            ILGAPIClient lgClient)
        {
            _userLogDataAccess = userLogDataAccess;
            _betSettingDataAccess = betSettingDataAccess;
            _appSetting = appSetting;
            _lgClient = lgClient;
        }

        public async Task<IResultInfo<double>> GetCommission(int custId, string language)
        {
            const string apiPath = "/Exchange/GetCommission";
            var result = await _lgClient.PostAsync<APIResult<ExchangeCommission>>(apiPath, new { custId, environment = _appSetting.Environment }, language).ConfigureAwait(false);

            return result.Data == null ? CreateApiErrorResult() : CreateApiResult(result.Data.Status, result.Data.Commission);
        }

        public async Task<IResultInfo<double>> UpdateCommissionAsync(
            int userId, int custId, double oldCommission, double newCommission, string language)
        {
            var isEnable = await _betSettingDataAccess.GetStatusAsync(custId, ProductTypes.Exchange).ConfigureAwait(false);

            if (isEnable != true)
            {
                return CreateAccessDeniedResult();
            }

            const string apiPath = "/Exchange/UpdateCommission";
            var requestParam = new { custId, commission = newCommission, environment = _appSetting.Environment };
            var result = await _lgClient.PostAsync<APIResult<ExchangeCommission>>(apiPath, requestParam, language).ConfigureAwait(false);

            await _userLogDataAccess.WriteLog(new SPLogMetaModel
            {
                ActionID = UserLogAction.ExchangeCommission,
                UserId = userId,
                CustID = custId,
                Doing = $"<ChargeCommission OldValue='{oldCommission}' NewValue='{newCommission}' />"
            }).ConfigureAwait(false);

            return result.Data == null ? CreateApiErrorResult() : CreateApiResult(result.Data.Status, result.Data.Commission);
        }

        private static IResultInfo<double> CreateApiResult(int status, double commission)
        {
            if (status == SuccessStatus)
            {
                return new ResultInfo<double>
                {
                    Code = 0,
                    Message = ViewResources.UpdateSuccess,
                    ExtendedData = commission
                };
            }

            return new ResultInfo<double>
            {
                Code = status == 0 ? 1 : status,
                Message = ViewResources.ErrorProcessingMsg,
                ExtendedData = commission
            };
        }

        private static IResultInfo<double> CreateAccessDeniedResult()
        {
            return new ResultInfo<double>
            {
                Code = AccessDeniedCode,
                Message = ViewResources.FunctionDeniedMsg
            };
        }

        private static IResultInfo<double> CreateApiErrorResult()
        {
            return new ResultInfo<double>
            {
                Code = ApiProcessingErrorCode,
                Message = ViewResources.ErrorProcessingMsg
            };
        }
    }
}