using System;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using System.Web.Routing;
using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Resources;
using Fanex.Athena.Service.Core.Utility.Interfaces;

namespace Fanex.Athena.Web.ActionFilter
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
    public sealed class ValidationWebRequestAttribute : ActionFilterAttribute
    {
        public IValidationService ValidationService { get; set; }

        public string ObjectName { get; set; }

        public bool IsValidCurrency { get; set; }

        public bool IsValidCurrencyList { get; set; }

        public bool IsValidProductCodeList { get; set; }

        public bool IsSingleWallet { get; set; }

        public string FunctionConfig { get; set; }

        public bool IsIncludeKeanOcean { get; set; }
        public bool HandlingAjaxRequestWithJsonResult { get; set; }
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
                var request = filterContext.RequestContext.HttpContext.Request;
                if (request.IsAjaxRequest() && request.HttpMethod.Equals("POST", StringComparison.OrdinalIgnoreCase))
                {
                    if (HandlingAjaxRequestWithJsonResult)
                    {
                        filterContext.Result = new JsonResult
                        {
                            Data = new { Code = 1, Message = ViewResources.InvalidParams },
                        };
                    }
                    else
                    {
                        filterContext.Result = new HttpStatusCodeResult(HttpStatusCode.Forbidden, ViewResources.InvalidRequestMsg);
                    }
                }
                else
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
}