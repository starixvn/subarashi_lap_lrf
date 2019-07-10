using Fanex.Athena.DataAccess.Core;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Repository.Interfaces;
using System;
using System.Globalization;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Repository
{
    public class PlayerBaStatusRepository : BaseDataAccess, IPlayerBaStatusRepository
    {
        public IResultInfo Update(BaStatusUpdatingMetaModel metaModel)
        {
            const string UspName = "Lrf_CustomerUpdMemberBAStatus";

            using (var db = this.GetObjectDb(UspName))
            {
                db.SetParameterValue("LicenseeID", metaModel.LicenseeId);
                db.SetParameterValue("CustID", metaModel.CustId);
                db.SetParameterValue("ModifyBy", metaModel.UserId);
                db.SetParameterValue("IsBA", metaModel.IsBa);
                db.SetParameterValue("langkey", metaModel.Language);
                db.SetParameterValue("IP", metaModel.Ip);
                db.SetParameterValue("OddsGroup", null);
                AddResultParam(db);
                db.ExecuteNonQuery();

                var resultInfo = GetResult(db);
                resultInfo.ExtendedData = Convert.ToString(db.GetParameterValue("OddsGroup")).ToUpper(CultureInfo.CurrentCulture);

                return resultInfo;
            }
        }
    }
}