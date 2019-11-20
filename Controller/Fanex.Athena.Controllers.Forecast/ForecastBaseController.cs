// --------------------------------------------------------------------------
// <copyright file="ForecastBaseController.cs" company="">
// Copyright (c) . All rights reserved.
// </copyright>
// --------------------------------------------------------------------------

namespace Fanex.Athena.Controllers.Forecast
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.SessionState;

    using Extension.Utility;

    using Model.Core.DTO.Common;

    using ONEbook.UM.Filters;

    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    [SessionState(SessionStateBehavior.ReadOnly)]
    [CheckUMFilter]
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