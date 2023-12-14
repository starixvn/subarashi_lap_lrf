using System;
using System.Collections.Generic;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using Fanex.Athena.DataAccess.Core.Configuration;
using Fanex.Athena.Extension.Helper;
using Fanex.Athena.Model.Auth;
using Fanex.Athena.Model.Core.Helper;
using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Service.Core.Users;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.Service.StatelessCore.Utility;

namespace Fanex.Athena.Api.Base.Attributes
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
    public sealed class ApiAutoBindMetaModelAttribute : ActionFilterAttribute
    {
        private static readonly ISessionService _sessionService = new SessionService();

        public IProductService ProductService { get; set; }

        public ISubsidiaryService SubsidiaryService { get; set; }

        public bool BindExportAll { get; set; }

        public bool BindAgent { get; set; }

        public bool BindUserId { get; set; }

        public bool BindIp { get; set; }

        public bool BindLanguage { get; set; }

        public bool BindBalanceUpAndMoveBet { get; set; }

        public bool ApplySubsidiaryBusiness { get; set; }

        public bool BindProductCodeList { get; set; }

        public bool BindProductOptions { get; set; }

        public bool BindShowingBetFromIP { get; set; }

        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            var userSession = _sessionService.UserSession;
            var licenseeSession = _sessionService.LicenseeSession;
            var actionArguments = actionContext.ActionArguments;

            if (BindAgent)
            {
                MapAgent(actionArguments, userSession, licenseeSession);
            }

            if (BindUserId)
            {
                AutoBindMetaModelService.MapUserId(actionArguments, userSession.UserId);
            }

            if (BindIp)
            {
                AutoBindMetaModelService.MapIp(actionArguments, ClientHelper.GetClientIp(request: actionContext.Request));
            }

            if (BindLanguage)
            {
                AutoBindMetaModelService.MapLanguage(actionArguments, userSession.Language);
            }

            if (BindBalanceUpAndMoveBet)
            {
                var balanceUpDataAccess = new BalanceUpDataAccess(null, null);
                AutoBindMetaModelService.MapBalanceUpAndMoveBet(actionArguments, balanceUpDataAccess);
            }

            if (BindExportAll)
            {
                AutoBindMetaModelService.MapExportAll(actionArguments);
            }

            if (BindShowingBetFromIP)
            {
                AutoBindMetaModelService.MapShowingBetFromIP(actionArguments, userSession.IsShowIp, userSession.IsShowIpvn);
            }

            if (BindProductCodeList)
            {
                AutoBindMetaModelService.MapProductCodeList(actionArguments, _sessionService.LicenseeSession.OfferedSubProductList, ProductService);
            }

            if (BindProductOptions)
            {
                AutoBindMetaModelService.MapProductOptions(actionArguments, _sessionService.LicenseeSession.OfferedSubProductList, ProductService);
            }

            base.OnActionExecuting(actionContext);
        }

        private void MapAgent(IDictionary<string, object> actionArguments, UserAuthInfo userSession, LicenseeAuthInfo licenseeSession)
        {
            var currencyAgentList = userSession.CurrencyAgentList;
            if (ApplySubsidiaryBusiness && MetaModelHelper.TryMetaModel(actionArguments, out IMetaModelSubsidiarySearch subsidiaryMetaModel)
                && !SubsidiaryService.IsIgnoredSubsidiarySearch(subsidiaryMetaModel.SubsidiarySearch, subsidiaryMetaModel.SubsidiaryList, userSession))
            {
                currencyAgentList = SubsidiaryService.GetCurrencyAgentList(licenseeSession.LicenseeName, currencyAgentList, subsidiaryMetaModel.SubsidiaryList);
            }

            AutoBindMetaModelService.MapAgentXml(actionArguments, currencyAgentList);
        }
    }
}