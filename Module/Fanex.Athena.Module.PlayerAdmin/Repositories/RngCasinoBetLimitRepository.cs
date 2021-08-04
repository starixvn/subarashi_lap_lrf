namespace Fanex.Athena.Module.PlayerAdmin.Repositories
{
    using System.Threading.Tasks;
    using Fanex.Athena.Extension.Utility.Interfaces;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Repositories.Interfaces;
    using Fanex.Common;
    using Fanex.Data;

    public class RngCasinoBetLimitRepository : IRngCasinoBetLimitRepository
    {
        private readonly IDbFactory _db;

        public RngCasinoBetLimitRepository(IDbFactory dbFactory)
        {
            _db = dbFactory;
        }

        public async Task<IResultInfo> UpdateStatusAsync(PlayerBetLimitProductStatusUpdateMetaModel metaModel, int sportId)
        {
            const string UspName = "Lrf_CustomerUpdCasinoStatus";

            using (var db = _db.GetObjectDb(UspName))
            {
                db.SetParameterValue("userid", metaModel.UserId);
                db.SetParameterValue("custid", metaModel.CustId);
                db.SetParameterValue("sportid", sportId);
                db.SetParameterValue("language", metaModel.Language);
                db.SetParameterValue("ip", metaModel.Ip);
                db.SetParameterValue("status", metaModel.Status ? 0 : 1);
                db.SetParameterValue("ErrCode", null);
                db.SetParameterValue("ErrMsg", null);

                await db.ExecuteNonQueryAsync().ConfigureAwait(false);

                return GetResult(db);
            }
        }

        protected static IResultInfo GetResult(IObjectDb db)
        {
            var errorCode = db.GetParameterValue("ErrCode");
            var errorMessage = db.GetParameterValue("ErrMsg");

            return new ResultInfo
            {
                Code = Converter.ToInt(errorCode),
                Message = Converter.ToString2(errorMessage)
            };
        }
    }
}