// --------------------------------------------------------------------------
// <copyright file="TotalBetController : TotalBetBaseController.cs" company="">
// Copyright (c) . All rights reserved.
// </copyright>
// --------------------------------------------------------------------------

namespace Fanex.Athena.Controllers.TotalBets
{
    using ONEbook.UM.Filters;

    using System.Web.Mvc;
    using System.Web.SessionState;

    [SessionState(SessionStateBehavior.ReadOnly)]
    [CheckUMFilter]
    public class TotalBetBaseController : CultureBaseController
    {
    }
}