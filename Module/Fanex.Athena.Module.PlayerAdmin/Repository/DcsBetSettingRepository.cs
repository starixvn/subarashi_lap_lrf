namespace Fanex.Athena.Module.PlayerAdmin.Repository
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.Athena.Extension.Utility.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.DTO;
    using Fanex.Athena.Module.PlayerAdmin.Repository.Interfaces;
    using Fanex.Common.Extensions;

    public class DcsBetSettingRepository : IDcsBetSettingRepository
    {
        private readonly IDbFactory _dbFactory;

        public DcsBetSettingRepository(IDbFactory dbFactory)
        {
            _dbFactory = dbFactory;
        }

        public async Task<IEnumerable<PlayerBetSetting>> GetSettingAsync(int custId, int productId)
        {
            const string UspName = "Acc_Dep_CustSetting_BetLimitSettingSelect";

            var dataList = new List<PlayerBetSetting>();

            using (var db = _dbFactory.GetObjectDb(UspName))
            {
                db.SetParameterValue("custid", custId);
                db.SetParameterValue("productid", productId);

                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    while (reader.Read())
                    {
                        dataList.Add(new PlayerBetSetting
                        {
                            MinBet = reader.ToDecimal("minbet"),
                            BetValueMin = reader.ToDecimal("minbetmin"),
                            MaxBet = reader.ToDecimal("maxbet"),
                            BetValueMax = reader.ToDecimal("maxbetmax"),
                            MaxPerMatch = reader.ToDecimal("maxpermatch"),
                            MaxPerMatchMax = reader.ToDecimal("maxpermatchmax"),
                            Id = reader.ToString("sporttype")
                        });
                    }
                }
            }

            return dataList;
        }
    }
}
