namespace Fanex.Athena.Module.PlayerAdmin.Repositories
{
    using System.Threading.Tasks;
    using Fanex.Athena.Extension.Utility.Interfaces;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Module.PlayerAdmin.DTO;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Repositories.Interfaces;
    using Fanex.Common;
    using Fanex.Data;

    public class AGCasinoBetLimitRepository : IAGCasinoBetLimitRepository
    {
        private readonly IDbFactory _db;

        public AGCasinoBetLimitRepository(IDbFactory dbFactory)
        {
            _db = dbFactory;
        }

        public async Task<AgCasinoBetSetting> GetBetSettingAsync(int custId)
        {
            const string UspName = "Lrf_AGC_SelCustSetting";

            using (var db = _db.GetObjectDb(UspName))
            {
                AddBetSettingParameter(db, custId);

                await db.ExecuteNonQueryAsync().ConfigureAwait(false);

                return ReadBetSetting(db);
            }
        }

        public async Task<IResultInfo> UpdateSettingAsync(PlayerBetLimitUpdateMetaModel<AgCasinoBetLimitMetaModel> metaModel)
        {
            const string UspName = "Lrf_AGC_UpdCustSetting";

            using (var db = _db.GetObjectDb(UspName))
            {
                AddUpdateParameter(db, metaModel);

                await db.ExecuteNonQueryAsync().ConfigureAwait(false);

                var errorCode = db.GetParameterValue("ErrCode");
                var errorMessage = db.GetParameterValue("ErrMsg");

                return new ResultInfo
                {
                    Code = Converter.ToInt(errorCode),
                    Message = Converter.ToString2(errorMessage)
                };
            }
        }

        private static void AddUpdateParameter(IObjectDb db, PlayerBetLimitUpdateMetaModel<AgCasinoBetLimitMetaModel> metaModel)
        {
            db.SetParameterValue("aggroup", metaModel.Setting.Group);
            db.SetParameterValue("ip", metaModel.Ip);
            db.SetParameterValue("language", metaModel.Language);
            db.SetParameterValue("userid", metaModel.UserId);
            db.SetParameterValue("custid", metaModel.CustId);

            db.SetParameterValue("ErrCode", null);
            db.SetParameterValue("ErrMsg", null);
        }

        private static void AddBetSettingParameter(IObjectDb db, int custId)
        {
            db.SetParameterValue("CustID", custId);
            db.SetParameterValue("Currency", null);
            db.SetParameterValue("AGGroup", null);
            db.SetParameterValue("IsEnabled", null);
            db.SetParameterValue("IsLineEnabled", null);
            db.SetParameterValue("CheckedGroups", null);
        }

        private static AgCasinoBetSetting ReadBetSetting(IObjectDb db)
        {
            return new AgCasinoBetSetting
            {
                CurrencyId = Converter.ToInt(db.GetParameterValue("Currency")),
                AgGroup = Converter.ToString2(db.GetParameterValue("AGGroup")),
                IsEnabled = Converter.ToBool(db.GetParameterValue("IsEnabled")),
                IsLineEnabled = Converter.ToBool(db.GetParameterValue("IsLineEnabled")),
                CheckedGroups = Converter.ToString2(db.GetParameterValue("CheckedGroups")).Split(',')
            };
        }
    }
}
