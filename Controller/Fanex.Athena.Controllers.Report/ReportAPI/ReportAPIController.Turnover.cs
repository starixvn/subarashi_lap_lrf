// -----------------------------------------------------------------------
// <copyright file="ReportAPIController.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.Report
{
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Web.ActionFilter;

    using Resources;

    public partial class ReportAPIController : NonCultureBaseController
    {
        [HttpPost]
        [FunctionAuthorization(PermissionKeys.ReportTurnover)]
        [CustomValidateAntiForgery]
        [ValidationWebRequest]
        [AutoBindMetaModel(BindAgent = true)]
        public async Task<ActionResult> Turnover(TurnoverMetaModel metaModel)
        {
            var placeholderUsername = IsFakeLicensee(SessionService.LicenseeSession.LicenseeName) ?
                ViewResources.ExternalId :
                ViewResources.ExternalIdOrSystemId;
            var userSession = SessionService.UserSession;

            metaModel.Username = string.IsNullOrWhiteSpace(metaModel.Username) ||
                metaModel.Username.Trim() == placeholderUsername ? null : metaModel.Username;
            var dataList = await _turnoverService.GetDataList(metaModel).ConfigureAwait(false);

            return Json(new
            {
                TotalData = _turnoverService.SumTotalData(dataList),
                Data = dataList
            });
        }
    }
}