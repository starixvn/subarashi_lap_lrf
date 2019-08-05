using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Model.Core.ViewModel;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using System;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Services
{
    public class PlayerOddsGroupService : IPlayerOddsGroupService
    {
        private readonly IDbFactory _dbFactory;

        public PlayerOddsGroupService(IDbFactory dbFactory)
        {
            _dbFactory = dbFactory;
        }

        public ResultViewModel Update(OddsGroupUpdatingMetaModel metaModel)
        {
            const string UspName = "Lrf_CustomerUpdUgroup";

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

                return new ResultViewModel
                {
                    Success = code == 0,
                    Message = message,
                    ErrorCode = code
                };
            }
        }
    }
}