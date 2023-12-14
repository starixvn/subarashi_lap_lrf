namespace Fanex.Athena.Controllers.TotalBets
{
    using System.Web.Mvc;
    using System.Web.SessionState;
    using Fanex.Athena.Web.ActionFilter;

    [SessionState(SessionStateBehavior.ReadOnly)]
    [UMFilter]
    public class TotalBetBaseController : CultureBaseController
    {
    }
}