namespace Fanex.Athena.Controllers.Customer
{
    using System.Threading.Tasks;

    #region Using

    using System.Web.Mvc;
    using System.Web.SessionState;

    using DataAccess.Customer.Interfaces;

    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Utility;
    using Fanex.Athena.Web.ActionFilter;

    using ONEbook.UM.Filters;

    #endregion Using

    [SessionState(SessionStateBehavior.ReadOnly)]
    [CheckUMFilter]
    [FunctionAuthorization(
        PermissionKeys.ReportTurnover,
        PermissionKeys.ReportWinLossByProduct,
        PermissionKeys.ReportCustomerWinLoss,
        PermissionKeys.CustomerInfoCustomerLog,
        PermissionKeys.CustomerInfoCustomerList,
        PermissionKeys.BettingTicketCenter)]
    public class SearchCustomerAPIController : CultureBaseController
    {
        private readonly ISearchCustomerDataAccess _searchCustomerDataAccess;

        public SearchCustomerAPIController(
            ISearchCustomerDataAccess searchCustomerDataAccess)
        {
            _searchCustomerDataAccess = searchCustomerDataAccess;
        }

        [AjaxRequest]
        [HttpGet]
        public Task<JsonResult> SearchCustomer(string query)
        {
            return Search(query, false);
        }

        [AjaxRequest]
        [HttpGet]
        public Task<JsonResult> SearchActiveAndDormantCustomer(string query)
        {
            return Search(query, true);
        }

        private async Task<JsonResult> Search(string query, bool isIncludeDormant)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return null;
            }

            var userName = query.Trim();
            var userSession = SessionServiceInstance.UserSession;
            var customerNames = await _searchCustomerDataAccess.SearchCustomers(userSession.UserId, userName,
                AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList), isIncludeDormant);

            var searchResult = new
            {
                data = new[] { string.Empty },
                query = userName,
                suggestions = customerNames
            };

            return Json(searchResult, JsonRequestBehavior.AllowGet);
        }
    }
}