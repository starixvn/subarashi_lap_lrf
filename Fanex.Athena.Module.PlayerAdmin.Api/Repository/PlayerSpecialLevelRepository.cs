using Fanex.Athena.DataAccess.Core;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Repository.Interfaces;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Repository
{
    public class PlayerSpecialLevelRepository : BaseDataAccess, IPlayerSpecialLevelRepository
    {
        public IResultInfo Update(SpecialLevelUpdatingMetaModel metaModel)
        {
            const string UspName = "Lrf_CustomerUpdSpecialLevel";

            using (var db = this.GetObjectDb(UspName))
            {
                db.SetParameterValue("custid", metaModel.CustId);
                db.SetParameterValue("userid", metaModel.UserId);
                db.SetParameterValue("speciallevel", metaModel.SpecialLevel);
                db.SetParameterValue("ip", metaModel.Ip);
                db.SetParameterValue("langkey", metaModel.Language);
                AddResultParam(db);
                db.ExecuteNonQuery();

                return GetResult(db);
            }
        }
    }
}