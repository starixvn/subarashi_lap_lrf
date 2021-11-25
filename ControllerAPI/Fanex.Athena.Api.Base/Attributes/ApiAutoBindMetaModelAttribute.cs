using System;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using Fanex.Athena.DataAccess.Core.Configuration;
using Fanex.Athena.Extension.Helper;
using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Service.Core.Users;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.StatelessCore.Utility;

namespace Fanex.Athena.Api.Base.Attributes
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
    public sealed class ApiAutoBindMetaModelAttribute : ActionFilterAttribute
    {
        public bool BindExportAll { get; set; }

        public bool BindAgent { get; set; }

        public bool BindUserId { get; set; }

        public bool BindIp { get; set; }

        public bool BindLanguage { get; set; }

        public bool BindBalanceUpAndMoveBet { get; set; }

        public bool ApplySubsidiaryBusiness { get; set; }

        private static readonly ISessionStorage _sessionStorage = new SessionStorage();

        public ISubsidiaryService SubsidiaryService { get; set; }


        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            var userSession = _sessionStorage.UserAuthInfo;
            var licenseeSession = _sessionStorage.LicenseeAuthInfo;
            var actionArgument = actionContext.ActionArguments;
                  
            if (BindAgent)
            {
                var currencyAgentList = userSession.CurrencyAgentList;
                if (ApplySubsidiaryBusiness && MetaModelHelper.IsMetaModel(actionArgument, out IMetaModelSubsidiarySearch subsidiaryMetaModel)
                    && !SubsidiaryService.IsIgnoredSubsidiarySearch(subsidiaryMetaModel.SubsidiarySearch, subsidiaryMetaModel.SubsidiaryList, userSession.SubsidiaryViewType))
                {
                    currencyAgentList = SubsidiaryService.GetCurrencyAgentList(licenseeSession.LicenseeName, currencyAgentList, subsidiaryMetaModel.SubsidiaryList);
                }

                AutoBindMetaModelService.MapAgentXml(actionArgument, currencyAgentList);
            }

            if (BindUserId)
            {
                AutoBindMetaModelService.MapUserId(actionArgument, userSession.UserId);
            }

            if (BindIp)
            {
                AutoBindMetaModelService.MapIp(actionArgument, ClientHelper.GetClientIp(request: actionContext.Request));
            }

            if (BindLanguage)
            {
                AutoBindMetaModelService.MapLanguage(actionArgument, userSession.Language);
            }

            if (BindBalanceUpAndMoveBet)
            {
                var balanceUpDataAccess = new BalanceUpDataAccess(null, null);
                AutoBindMetaModelService.MapBalanceUpAndMoveBet(actionArgument, balanceUpDataAccess);
            }

            if (BindExportAll)
            {
                AutoBindMetaModelService.MapExportAll(actionArgument);
            }

            base.OnActionExecuting(actionContext);
        }
    }
}
