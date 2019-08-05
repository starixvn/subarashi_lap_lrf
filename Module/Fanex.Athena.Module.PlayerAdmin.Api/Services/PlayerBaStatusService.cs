using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Model.Core.ViewModel;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using System;
using System.Globalization;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Services
{
    public class PlayerBaStatusService : IPlayerBaStatusService
    {
        private readonly IDbFactory _dbFactory;

        public PlayerBaStatusService(IDbFactory dbFactory)
        {
            _dbFactory = dbFactory;
        }

        public ResultViewModel Update(BaStatusUpdatingMetaModel metaModel)
        {
            const string UspName = "Lrf_CustomerUpdMemberBAStatus";

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

                return new ResultViewModel
                {
                    Success = code == 0,
                    Message = message,
                    ErrorCode = code,
                    ExtendedData = Convert.ToString(oddsGroup).ToUpper(CultureInfo.CurrentCulture)
                };
            }
        }
    }
}