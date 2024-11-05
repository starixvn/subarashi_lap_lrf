// -----------------------------------------------------------------------
// <copyright file="IMatchDataAccess.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.DataAccess.Core.Common.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Model.Core.DTO.Common;
    using Model.Core.MetaModel.Common;

    public interface IMatchDataAccess
    {
        Task<IList<Match>> GetForecastMatchListByLeague(int leagueId);

        Task<IList<Match>> GetAllRunningMatch(int sportId, IEnumerable<int> specialLeagues);

        Task<IList<Match>> GetMatchesByLeague(GetMatchMetaModel metaModel);
    }
}