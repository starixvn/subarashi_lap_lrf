// -----------------------------------------------------------------------
// <copyright file="ReportAPIController.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.Report
{
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Web.ActionFilter;

    using Resources;

    using System.Threading.Tasks;
    using System.Web.Mvc;

    public partial class ReportAPIController : NonCultureBaseController
    {
        [HttpPost]
        [FunctionAuthorization(PermissionKeys.ReportTurnover)]
        [CustomValidateAntiForgery]
        [ValidationWebRequest]
        [AutoBindMetaModel(BindAgent = true)]
        public async Task<ActionResult> Turnover(TurnoverMetaModel metaModel)
        {
            var placeholderUsername = IsFakeLicensee(SessionServiceInstance.LicenseeSession.LicenseeName) ?
                ViewResources.ExternalId :
                ViewResources.ExternalIdOrSystemId;

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