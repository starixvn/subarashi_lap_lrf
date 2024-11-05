namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Model.Core.DTO.Common;
    using Model.Core.MetaModel.Common;

    public interface IMatchService
    {
        Task<IList<Match>> GetAllRunningMatchAsync(int sportId, string languageCode, IEnumerable<int> specialLeagues);

        Task<IList<Match>> GetForecastMatchListByLeagueAsync(int leagueId);

        Task<IList<Match>> GetMatchesByLeagueAsync(GetMatchMetaModel metaModel);
    }
}