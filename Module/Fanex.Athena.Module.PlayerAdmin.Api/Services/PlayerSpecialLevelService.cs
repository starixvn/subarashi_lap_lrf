using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Model.Core.ViewModel;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using System;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Services
{
    public class PlayerSpecialLevelService : IPlayerSpecialLevelService
    {
        private readonly IDbFactory _dbFactory;

        public PlayerSpecialLevelService(IDbFactory dbFactory)
        {
            _dbFactory = dbFactory;
        }

        public ResultViewModel Update(SpecialLevelUpdatingMetaModel metaModel)
        {
            const string UspName = "Lrf_CustomerUpdSpecialLevel";

            using (var db = _dbFactory.GetObjectDb(UspName))
            {
                db.SetParameterValue("custid", metaModel.CustId);
                db.SetParameterValue("userid", metaModel.UserId);
                db.SetParameterValue("speciallevel", metaModel.SpecialLevel);
                db.SetParameterValue("ip", metaModel.Ip);
                db.SetParameterValue("langkey", metaModel.Language);
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