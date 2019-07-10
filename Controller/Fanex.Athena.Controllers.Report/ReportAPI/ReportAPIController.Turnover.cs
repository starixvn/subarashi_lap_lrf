// -----------------------------------------------------------------------
// <copyright file="ReportAPIController.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.Report
{
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Service.StatelessCore.Utility;
    using Fanex.Athena.Web.ActionFilter;
    using Model.Core.DataDomain;
    using Resources;

    public partial class ReportAPIController : NonCultureBaseController
    {
        [HttpPost]
        [FunctionAuthorization(PermissionKeys.ReportTurnover)]
        [CustomValidateAntiForgery]
        [ValidationWebRequest]
        public async Task<ActionResult> Turnover(TurnoverMetaModel metaModel)
        {
            var placeholderUsername = _appSettings.FakeLicenseeList.Contains(
                SessionService.LicenseeSession.LicenseeId) ?
                ViewResources.ExternalId :
                ViewResources.ExternalIdOrSystemId;
            var userSession = SessionService.UserSession;
            metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList,metaModel.CurrencyId, metaModel.IsExcludeTest);

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