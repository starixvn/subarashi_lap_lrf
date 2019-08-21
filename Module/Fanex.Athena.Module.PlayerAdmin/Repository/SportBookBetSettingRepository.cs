namespace Fanex.Athena.Module.PlayerAdmin.Repository
{
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Threading.Tasks;
    using Fanex.Athena.Extension.Utility.Interfaces;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Module.PlayerAdmin.DTO;
    using Fanex.Athena.Module.PlayerAdmin.Repository.Interfaces;
    using Fanex.Common.Extensions;

    public class SportBookBetSettingRepository : ISportBookBetSettingRepository
    {
        private const string MixedSportId = "99MP";

        private readonly IDbFactory _dbFactory;

        private static readonly string[] _sportTypes =
        {
            ((int)SportType.Soccer).ToString(),
            ((int)SportType.BasketBall).ToString(),
            ((int)SportType.FootBall).ToString(),
            ((int)SportType.Tennis).ToString(),
            ((int)SportType.BaseBall).ToString(),
            ((int)SportType.Golf).ToString(),
            ((int)SportType.Motorsports).ToString(),
            ((int)SportType.OtherSports).ToString()
        };

        public SportBookBetSettingRepository(IDbFactory dbFactory)
        {
            _dbFactory = dbFactory;
        }

        public async Task<IEnumerable<PlayerBetSetting>> GetSettingAsync(int custId, bool isShowMixedSport)
        {
            const string UspName = "Lrf_CustomerSelEditCustomer";

            using (var db = _dbFactory.GetObjectDb(UspName))
            {
                db.SetParameterValue("CustID", custId);
                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    if (reader.Read())
                    {
                        return GetBetSettings(reader, isShowMixedSport);
                    }
                }
            }

            return Enumerable.Empty<PlayerBetSetting>();
        }

        private List<PlayerBetSetting> GetBetSettings(IDataReader reader, bool isShowMixedSport)
        {
            var sportList = new List<PlayerBetSetting>();

            foreach(var type in _sportTypes)
            {
                sportList.Add(ReadForSport(reader, type));
            }

            if (isShowMixedSport)
            {
                sportList.Add(ReadForSport(reader, MixedSportId));
            }

            return sportList;
        }

        private PlayerBetSetting ReadForSport(IDataReader reader, string sportId)
        {
            var sportSuffix = sportId != ((int)SportType.Soccer).ToString() ? "v" + sportId : string.Empty;
            //var sportName = _cacheRefAdapter.GetSportName(sportId);

            //sportName = string.IsNullOrEmpty(sportName) ? GetSportName(sportId) : sportName;

            var sport = new PlayerBetSetting
            {
                MaxBet = reader.ToDecimal("maxbet" + sportSuffix),
                MinBet = reader.ToDecimal("minbet" + sportSuffix),
                MaxPerMatch = reader.ToDecimal("MaxPerMatch" + sportSuffix),
                MaxPerMatchMax = reader.ToDecimal("MaxPerMatch" + sportSuffix + "_Max"),
                MaxPerMatchMin = reader.ToDecimal("MaxPerMatch" + sportSuffix + "_Min"),
                BetValueMax = reader.ToDecimal("MaxBet" + sportSuffix + "_Min"),
                BetValueMin = reader.ToDecimal("MinBet" + sportSuffix + "_Max"),
                //BetSettingType = sportName,
                Id = sportId
            };

            return sport;
        }
    }
}
