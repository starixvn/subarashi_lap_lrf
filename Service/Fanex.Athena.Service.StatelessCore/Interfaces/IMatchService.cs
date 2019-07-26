// -----------------------------------------------------------------------
// <copyright file="IMatchService.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Fanex.Athena.Model.Core.DTO.Common;

    public interface IMatchService
    {
        Task<IList<Match>> GetAllRunningMatchAsync(int sportId, string languageCode);

        Task<IList<Match>> GetForecastMatchListByLeagueAsync(int leagueId);

        Task<IList<Match>> GetMatchesByLeagueAsync(int leagueId, DateTime fromDate, DateTime toDate);
    }
}