using System;
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
    public class PlayerOddsGroupService : IPlayerOddsGroupService
    {
        private readonly IDbFactory _dbFactory;

        private readonly IBusinessLogService _businessLogService;

        public PlayerOddsGroupService(IDbFactory dbFactory,
            [KeyFilter("PlayerAdminCommonCustomerSettingLogService")]IBusinessLogService businessLogService)
        {
            _dbFactory = dbFactory;
            _businessLogService = businessLogService;
        }

        public ResultViewModel Update(OddsGroupUpdatingMetaModel metaModel)
        {
            const string UspName = "Lrf_CustomerUpdUgroup";
            ResultViewModel result;

            using (var db = _dbFactory.GetObjectDb(UspName))
            {
                db.SetParameterValue("UserId", metaModel.UserId);
                db.SetParameterValue("CustId", metaModel.CustId);
                db.SetParameterValue("OddsGroup", metaModel.OddsGroup);
                db.SetParameterValue("IP", metaModel.Ip);
                db.SetParameterValue("Langkey", metaModel.Language);

                db.SetParameterValue("ErrCode", null);
                db.SetParameterValue("ErrMsg", null);
                db.ExecuteNonQuery();

                var code = Convert.ToInt32(db.GetParameterValue("ErrCode"));
                var message = Convert.ToString(db.GetParameterValue("ErrMsg"));

                result = new ResultViewModel
                {
                    Success = code == 0,
                    Message = message,
                    ErrorCode = code
                };
            }

            var logMetaModel = new PlayerUpdatingLogMetaModel
            {
                LicenseeCustId = metaModel.LicenseeCustId,
                SiteName = metaModel.SiteName,
                UserId = metaModel.UserId,
                CustId = metaModel.CustId,
                ActionId = LogActionId.PlayerAdminUpdateOddsGroup,
                ActionDetailId = LogActionDetailId.UpdatingOddsGroup,
                Status = result.Success ? LogText.Success : LogText.False,
                NewValue = metaModel.OddsGroup,
                OldValue = metaModel.OldValue
            };
            _businessLogService.Write(BusinessLogType.CustomerUpdateOddsGroup, logMetaModel);

            return result;
        }
    }
}