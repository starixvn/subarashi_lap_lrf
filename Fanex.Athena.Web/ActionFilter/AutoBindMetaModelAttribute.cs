using System;
using System.Linq;
using System.Web.Mvc;
using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Extension.Helper;
using Fanex.Athena.Service.Core.Users;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.Service.StatelessCore.Utility;
using System.Collections.Generic;
using Fanex.Athena.Model.Auth;

namespace Fanex.Athena.Web.ActionFilter
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
    public sealed class AutoBindMetaModelAttribute : ActionFilterAttribute
    {
        private static readonly ISessionStorage _sessionStorage = new SessionStorage();

        public IProductService ProductService { get; set; }

        public ILicenseeSettingService LicenseeSettingService { get; set; }

        public ISubsidiaryService SubsidiaryService { get; set; }

        public bool BindAgent { get; set; }

        public bool BindCurrencyList { get; set; }

        public bool BindUserId { get; set; }

        public bool BindSiteName { get; set; }

        public bool BindLicenseeContract { get; set; }

        public bool BindLanguage { get; set; }

        public bool BindIp { get; set; }

        public bool BindProductCodeList { get; set; }

        public bool BindProductOptions { get; set; }

        public bool ApplySubsidiaryBusiness { get; set; }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var userSession = _sessionStorage.UserAuthInfo;
            var licenseeSession = _sessionStorage.LicenseeAuthInfo;
            var actionArgument = filterContext.ActionParameters;
            if (BindAgent)
            {
                MapAgent(actionArgument, userSession, licenseeSession);
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
                AutoBindMetaModelService.MapLanguage(actionArgument, userSession.Language);
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

            if (BindProductCodeList)
            {
                AutoBindMetaModelService.MapProductCodeList(actionArgument, _sessionStorage.LicenseeAuthInfo.OfferedSubProductList, ProductService);
            }

            if (BindProductOptions)
            {
                AutoBindMetaModelService.MapProductOptions(actionArgument, _sessionStorage.LicenseeAuthInfo.OfferedSubProductList, ProductService);
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

        private void MapAgent(IDictionary<string, object> actionArguments, UserAuthInfo userSession, LicenseeAuthInfo licenseeSession)
        {
            var currencyAgentList = userSession.CurrencyAgentList;
            if (ApplySubsidiaryBusiness && MetaModelHelper.IsMetaModel(actionArguments, out IMetaModelSubsidiarySearch subsidiaryMetaModel)
                && !SubsidiaryService.IsIgnoredSubsidiarySearch(subsidiaryMetaModel.SubsidiarySearch, subsidiaryMetaModel.SubsidiaryList, userSession))
            {
                currencyAgentList = SubsidiaryService.GetCurrencyAgentList(licenseeSession.LicenseeName, currencyAgentList, subsidiaryMetaModel.SubsidiaryList);
            }

            AutoBindMetaModelService.MapAgentXml(actionArguments, currencyAgentList);
        }
    }
}