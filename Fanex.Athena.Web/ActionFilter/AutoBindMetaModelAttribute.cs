using System;
using System.Linq;
using System.Web.Mvc;
using Fanex.Athena.Model.Auth;
using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Extension.Helper;
using Fanex.Athena.Service.Core.Users;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.Service.StatelessCore.Utility;

namespace Fanex.Athena.Web.ActionFilter
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
    public sealed class AutoBindMetaModelAttribute : ActionFilterAttribute
    {
        private static readonly ISessionStorage _sessionStorage = new SessionStorage();

        public bool BindAgent { get; set; }

        public bool BindCurrencyList { get; set; }

        public bool BindUserId { get; set; }
        public bool BindSiteName { get; set; }
        public bool BindLicenseeContract { get; set; }

        public bool BindLanguage { get; set; }

        public bool BindIp { get; set; }
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
            if (BindSiteName)
            {
                var licensee = _sessionStorage.LicenseeAuthInfo;
                AutoBindMetaModelService.MapSiteName(actionArgument, licensee.LicenseeName);
            }
            if (BindLanguage)
            {
                AutoBindMetaModelService.MapLanguage(actionArgument);
            }

            if (BindIp)
            {
                AutoBindMetaModelService.MapIp(actionArgument,
                    ClientHelper.GetClientIp(httpContext: filterContext.HttpContext)
                    );
            }
            if (BindLicenseeContract)
            {
                MapLicenseeContract(filterContext);
            }
            if (BindCurrencyList)
            {
                AutoBindMetaModelService.MapCurrencyList(actionArgument, userSession.CurrencyList);
            }

            base.OnActionExecuting(filterContext);
        }

        private void MapLicenseeContract(ActionExecutingContext filterContext)
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

                metaModel.HasComm = licenseeSession.IsAllowedCustomerComm;
                metaModel.IsAllowedBA = productAccess.IsAllowBA;
                metaModel.SystemIdVisible = !LicenseeSettingService.IsFakeLicensee(licenseeSession.LicenseeName);

                filterContext.ActionParameters[item.Key] = metaModel;
            }
        }
    }
}