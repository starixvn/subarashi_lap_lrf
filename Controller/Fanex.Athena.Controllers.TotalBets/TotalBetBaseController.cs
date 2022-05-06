namespace Fanex.Athena.Controllers.TotalBets
{
    using Fanex.Athena.Web.ActionFilter;
    using System.Web.Mvc;
    using System.Web.SessionState;

    [SessionState(SessionStateBehavior.ReadOnly)]
    [UMFilter]
    public class TotalBetBaseController : CultureBaseController
    {
    }
}