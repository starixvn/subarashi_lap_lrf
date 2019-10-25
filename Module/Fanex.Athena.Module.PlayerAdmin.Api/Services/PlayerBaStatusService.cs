using System;
using System.Globalization;
using Autofac.Features.AttributeFilters;
using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.ViewModel;
using Fanex.Athena.Module.PlayerAdmin.Api.DataDomains;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Services
{
    public class PlayerBaStatusService : IPlayerBaStatusService
    {
        private readonly IDbFactory _dbFactory;

        private readonly IBusinessLogService _businessLogService;

        public PlayerBaStatusService(IDbFactory dbFactory,
            [KeyFilter("PlayerAdminCommonCustomerSettingLogService")]IBusinessLogService businessLogService)
        {
            _dbFactory = dbFactory;
            _businessLogService = businessLogService;
        }

        public ResultViewModel Update(BaStatusUpdatingMetaModel metaModel)
        {
            const string UspName = "Lrf_CustomerUpdMemberBAStatus";
            ResultViewModel result;

            using (var db = _dbFactory.GetObjectDb(UspName))
            {
                db.SetParameterValue("LicenseeName", metaModel.SiteName);
                db.SetParameterValue("CustID", metaModel.CustId);
                db.SetParameterValue("ModifyBy", metaModel.UserId);
                db.SetParameterValue("IsBA", metaModel.IsBa);
                db.SetParameterValue("langkey", metaModel.Language);
                db.SetParameterValue("IP", metaModel.Ip);
                db.SetParameterValue("OddsGroup", null);
                db.SetParameterValue("ErrCode", null);
                db.SetParameterValue("ErrMsg", null);
                db.ExecuteNonQuery();

                var code = Convert.ToInt32(db.GetParameterValue("ErrCode"));
                var message = Convert.ToString(db.GetParameterValue("ErrMsg"));
                var oddsGroup = db.GetParameterValue("OddsGroup");

                result = new ResultViewModel
                {
                    Success = code == 0,
                    Message = message,
                    ErrorCode = code,
                    ExtendedData = Convert.ToString(oddsGroup).ToUpper(CultureInfo.CurrentCulture)
                };
            }

            var logMetaModel = new PlayerUpdatingLogMetaModel
            {
                LicenseeCustId = metaModel.LicenseeCustId,
                SiteName = metaModel.SiteName,
                UserId = metaModel.UserId,
                CustId = metaModel.CustId,
                ActionId = LogActionId.PlayerAdminUpdateBAStatus,
                ActionDetailId = LogActionDetailId.UpdatingBA,
                Status = result.Success ? LogText.Success : LogText.False,
                NewValue = metaModel.IsBa ? LogText.On : LogText.Off,
                OldValue = !metaModel.IsBa ? LogText.On : LogText.Off
            };
            _businessLogService.Write(BusinessLogType.CustomerUpdateBA, logMetaModel);

            return result;
        }
    }
}