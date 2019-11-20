// -----------------------------------------------------------------------
// <copyright file="ReportController.SettledMatchCount.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.Report
{
    using System.Threading.Tasks;
    using System.Web.Mvc;

    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;
    using Service.Report.Interfaces;

    using Web.ActionFilter;

    [FunctionAuthorization(PermissionKeys.ReportSettledMatchCount)]
    public class SettledMatchCountReportController : ReportBaseController
    {
        private readonly ISettledMatchCountService _settledMatchCountService;

        public SettledMatchCountReportController(ISettledMatchCountService settledMatchCountService)
        {
            _settledMatchCountService = settledMatchCountService;
        }

        [HttpGet]
        public async Task<ActionResult> Index()
        {
            var licenseeId = SessionServiceInstance.LicenseeSession.LicenseeId;
            var producAccess = ProductServiceInstance.GetProductAccess(licenseeId, SessionServiceInstance.UserSession.Language);
            var model = await _settledMatchCountService.GetDataList(AppSettingInstance.IsShowAllDataForSettleMatchCountReport, licenseeId, producAccess).ConfigureAwait(false);

            return View("~/Views/Desktop/Report/SettledMatchCount/Main.cshtml", model);
        }
    }
}