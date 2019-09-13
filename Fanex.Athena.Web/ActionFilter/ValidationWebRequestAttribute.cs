using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Service.Core.Utility.Interfaces;
using System;
using System.Linq;
using System.Web.Mvc;
using System.Web.Routing;

namespace Fanex.Athena.Web.ActionFilter
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
    public class ValidationWebRequestAttribute : ActionFilterAttribute
    {
        public IValidationService ValidationService { get; set; }

        public string ObjectName { get; set; }

        public bool IsValidCurrency { get; set; }

        public bool IsIncludeKeanOcean { get; set; }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);
            var model = !string.IsNullOrEmpty(ObjectName) ? filterContext.ActionParameters[ObjectName]
                 : filterContext.ActionParameters.Where(x => x.Value is IMetaModelValidation)
                      .Select(x => x.Value).FirstOrDefault();

            var result = ValidationService.IsValid(model
                ,
                 new CurrencyValidationOption
                 {
                     IsValidCurrency = IsValidCurrency,
                     IsIncludeKeanOcean = IsIncludeKeanOcean,

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
