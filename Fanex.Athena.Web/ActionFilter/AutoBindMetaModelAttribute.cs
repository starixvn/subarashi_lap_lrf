using System;
using System.Linq;
using System.Web.Mvc;
using Fanex.Athena.Model.Auth;
using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Service.Core.Users;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.Service.StatelessCore.Utility;

namespace Fanex.Athena.Web.ActionFilter
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
    public sealed class AutoBindMetaModelAttribute : ActionFilterAttribute
    {
        public bool BindAgent { get; set; }
        public bool BindDictionaryCurrencyList { get; set; }
        public bool BindCurrencyList { get; set; }
        public bool BindUserId { get; set; }
        public bool BindLicenseeContract { get; set; }

        private static readonly ISessionStorage _sessionStorage = new SessionStorage();
        public IProductService ProductService { get; set; }
        public ILicenseeSettingService LicenseeSettingService { get; set; }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var userSession = _sessionStorage.UserAuthInfo;

            var actionArgument = filterContext.ActionParameters;
            if (BindAgent)
            {
                AutoBindMetaModelService.MapAgentXml(actionArgument, userSession.CurrencyAgentList);
            }

            if (BindUserId)
            {
                AutoBindMetaModelService.MapUserId(actionArgument, userSession.UserId);
            }

            if (BindDictionaryCurrencyList)
            {
                AutoBindMetaModelService.MapDictionaryCurrencyList(actionArgument, userSession.CurrencyList);
            }
            if (BindCurrencyList)
            {
                AutoBindMetaModelService.MapCurrencyList(actionArgument, userSession.CurrencyList);
            }
            if (BindLicenseeContract)
            {
                MapLicenseeContract(filterContext, userSession);
            }
            base.OnActionExecuting(filterContext);
        }

        private void MapLicenseeContract(ActionExecutingContext filterContext, UserAuthInfo userSession)
        {
            var item = filterContext.ActionParameters.Where(x => x.Value is IMetaModelFunctionContract)
                    .Select(x => x).FirstOrDefault();

            if (item.Value is IMetaModelFunctionContract metaModel)
            {
                var licenseeSession = _sessionStorage.LicenseeAuthInfo;
                var productAccess = ProductService.GetSingleWalletProductAccess(
                    licenseeSession.LicenseeId,
                    "en-US",
                    metaModel.FunctionKey);

                metaModel.IsAllowedCustomerComm = licenseeSession.IsAllowedCustomerComm;
                metaModel.IsAllowBA = productAccess.IsAllowBA;
                metaModel.SystemIdVisible = !LicenseeSettingService.IsFakeLicensee(licenseeSession.LicenseeName);

                filterContext.ActionParameters[item.Key] = metaModel;
            }
        }
    }
}