// -----------------------------------------------------------------------
// <copyright file="WeeklyLiveMatchReportController.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.Report
{
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Web.ActionFilter;

    using System.Web.Mvc;

    [FunctionAuthorization(PermissionKeys.ReportWeeklyLiveMatches)]
    public class WeeklyLiveMatchReportController : ReportBaseController
    {
        [HttpGet]
        public ActionResult Index()
        {
            var metaModel = new WeeklyLiveMatchMetaModel();
            return View("~/Views/Desktop/Report/WeeklyLiveMatch/Main.cshtml", metaModel);
        }
    }
}