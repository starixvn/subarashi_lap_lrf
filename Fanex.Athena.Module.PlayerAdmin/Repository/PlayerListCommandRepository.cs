using Fanex.Athena.DataAccess.Core;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Module.PlayerAdmin.MetaModel;
using System.Globalization;

namespace Fanex.Athena.Module.PlayerAdmin.Repository
{
    public class PlayerListCommandRepository : BaseDataAccess, IPlayerListCommandRepository
    {
        public IResultInfo UpdateBaStatus(UpdateBaStatusMetaModel metaModel)
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
                db.SetParameterValue("AgentList", metaModel.AgentListXml);
                db.SetParameterValue("OddsGroup", null);
                AddResultParam(db);
                db.ExecuteNonQuery();

                var resultInfo = GetResult(db);
                resultInfo.ExtendedData = Common.Converter.ToString2(db.GetParameterValue("OddsGroup")).ToUpper(CultureInfo.CurrentCulture);

                return resultInfo;
            }
        }

        public IResultInfo UpdateOddsGroup(UpdateOddsGroupMetaModel metaModel)
        {
            const string UspName = "Lrf_CustomerUpdOddsGroup";

            using (var db = this.GetObjectDb(UspName))
            {
                db.SetParameterValue("custid", metaModel.CustId);
                db.SetParameterValue("userid", metaModel.UserId);
                db.SetParameterValue("oddsgroup", metaModel.OddsGroup);
                db.SetParameterValue("ip", metaModel.Ip);
                db.SetParameterValue("langkey", metaModel.Language);
                AddResultParam(db);
                db.ExecuteNonQuery();

                return GetResult(db);
            }
        }

        public IResultInfo UpdateSpecialLevel(UpdateSpecialLevelMetaModel metaModel)
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