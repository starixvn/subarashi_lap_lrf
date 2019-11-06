using System;
using System.Linq;
using System.Web.Mvc;
using System.Web.Routing;
using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Service.Core.Utility.Interfaces;

namespace Fanex.Athena.Web.ActionFilter
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
    public class ValidationWebRequestAttribute : ActionFilterAttribute
    {
        public IValidationService ValidationService { get; set; }

        public string ObjectName { get; set; }

        public bool IsValidCurrency { get; set; }

        public bool IsValidCurrencyList { get; set; }

        public bool IsValidProductCodeList { get; set; }

        public bool IsSingleWallet { get; set; }

        public string FunctionConfig { get; set; }

        public bool IsIncludeKeanOcean { get; set; }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);
            var model = !string.IsNullOrEmpty(ObjectName) ? filterContext.ActionParameters[ObjectName]
                 : filterContext.ActionParameters.Where(x => x.Value is IMetaModelValidation)
                      .Select(x => x.Value).FirstOrDefault();

            var result = ValidationService.IsValid(model,
                 new CurrencyValidationOption
                 {
                     IsValidCurrency = IsValidCurrency,
                     IsIncludeKeanOcean = IsIncludeKeanOcean,
                     IsValidCurrencyList = IsValidCurrencyList
                 },
                 new ProductValidationOption
                 {
                     IsValidProductCodeList = IsValidProductCodeList,
                     IsSingleWallet = IsSingleWallet,
                     FunctionConfig = FunctionConfig
                 });

            if (!result)
            {
                filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new
                {
                    controller = "Utility",
                    action = "Error",
                    err = "400"
                }));
            }
        }
    }
}