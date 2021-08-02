namespace Fanex.Athena.Module.PlayerAdmin.Repositories
{
    using System.Threading.Tasks;
    using Fanex.Athena.DataAccess.Core;
    using Fanex.Athena.Extension.Utility.Interfaces;
    using Fanex.Athena.Model.BetSettings.DTO;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Repositories.Interfaces;
    using Fanex.Common;

    public class ThirdPartyBetLimitRepository : BaseDataAccess, IThirdPartyBetLimitRepository
    {
        private readonly IDbFactory _db;

        public ThirdPartyBetLimitRepository(IDbFactory dbFactory)
        {
            _db = dbFactory;
        }

        public async Task<ThirdPartyBetSetting> GetBetSettingAsync(int custId, int productid)
        {
            const string UspName = "Lrf_3rdProductSelCustStatus";
            using (var db = _db.GetObjectDb(UspName))
            {
                db.SetParameterValue("CustID", custId);
                db.SetParameterValue("ProductId", productid);
                db.SetParameterValue("IsEnabled", null);
                db.SetParameterValue("IsLineEnabled", null);
                db.SetParameterValue("Currency", null);

                await db.ExecuteNonQueryAsync().ConfigureAwait(false);

                return new ThirdPartyBetSetting
                {
                    IsEnabled = Converter.ToBool(db.GetParameterValue("IsEnabled")),
                    IsLineEnabled = Converter.ToBool(db.GetParameterValue("IsLineEnabled")),
                    CurrencyId = Converter.ToInt(db.GetParameterValue("Currency"))
                };
            }
        }

        public async Task<IResultInfo> UpdateStatusAsync(PlayerBetLimitProductStatusUpdateMetaModel metaModel)
        {
            const string UspName = "Lrf_3rdProductUpdCustStatus";

            using (var db = _db.GetObjectDb(UspName))
            {
                db.SetParameterValue("custid", metaModel.CustId);
                db.SetParameterValue("userid", metaModel.UserId);
                db.SetParameterValue("productid", metaModel.ProductId);
                db.SetParameterValue("isenabled", metaModel.Status);
                db.SetParameterValue("ip", metaModel.Ip);
                db.SetParameterValue("language", metaModel.Language);

                db.SetParameterValue("ErrMsg", null);

                await db.ExecuteNonQueryAsync().ConfigureAwait(false);

                var errorMessage = db.GetParameterValue("ErrMsg");

                return new ResultInfo
                {
                    Code = 0,
                    Message = Converter.ToString2(errorMessage)
                };
            }
        }
    }
}