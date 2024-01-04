namespace Fanex.Athena.Controllers.Forecast
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.SessionState;
    using Fanex.Athena.Web.ActionFilter;
    using Model.Core.DTO.Common;

    [SessionState(SessionStateBehavior.ReadOnly)]
    [UMFilter]
    public class ForecastBaseController : CultureBaseController
    {
        protected static int GetLeagueId(int leagueId, IEnumerable<League> leagueList)
        {
            if (leagueList.Any(l => l.LeagueId == leagueId))
            {
                return leagueId;
            }
            else
            {
                var first = leagueList.FirstOrDefault();
                return first != null ? first.LeagueId : -1;
            }
        }
    }
}