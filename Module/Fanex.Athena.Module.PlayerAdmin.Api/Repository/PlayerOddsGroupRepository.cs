using Fanex.Athena.DataAccess.Core;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Repository.Interfaces;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Repository
{
    public class PlayerOddsGroupRepository : BaseDataAccess, IPlayerOddsGroupRepository
    {
        public IResultInfo Update(OddsGroupUpdatingMetaModel metaModel)
        {
            const string UspName = "Lrf_CustomerUpdUgroup";

            using (var db = this.GetObjectDb(UspName))
            {
                db.SetParameterValue("UserId", metaModel.UserId);
                db.SetParameterValue("CustId", metaModel.CustId);
                db.SetParameterValue("OddsGroup", metaModel.OddsGroup);
                db.SetParameterValue("IP", metaModel.Ip);
                db.SetParameterValue("Langkey", metaModel.Language);

                AddResultParam(db);
                db.ExecuteNonQuery();

                return GetResult(db);
            }
        }
    }
}