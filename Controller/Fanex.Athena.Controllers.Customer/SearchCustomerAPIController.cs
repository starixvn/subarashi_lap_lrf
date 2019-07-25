namespace Fanex.Athena.Controllers.Customer
{
    using System.Threading.Tasks;
    #region Using

    using System.Web.Mvc;
    using System.Web.SessionState;
    using DataAccess.Customer.Interfaces;
    using Extension.Utility;
    using Fanex.Athena.Service.Core.Common.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Utility;
    using Fanex.Athena.Web.ActionFilter;
    using Model.Core.DataDomain;
    using ONEbook.UM.Filters;
    using Service.Core.Users.Interfaces;

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
    public class SearchCustomerAPIController : ContentBaseController
    {
        private readonly ISearchCustomerDataAccess _searchCustomerDataAccess;

        public SearchCustomerAPIController(
            ILanguageService languageService,
            ISessionService sessionService,
            ISearchCustomerDataAccess searchCustomerDataAccess)
            : base(languageService, sessionService)
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
            var userSession = SessionService.UserSession;
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