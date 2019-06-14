using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Service.Core.Users;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.Core.Utility;
using Fanex.Athena.Service.Core.Utility.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
        public bool IsValidProductCodeList { get; set; }
        public bool IsValidCurrencyList { get; set; }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);
            var model = !string.IsNullOrEmpty(ObjectName) ? filterContext.ActionParameters[ObjectName]
                 : filterContext.ActionParameters.Where(x => x.Value is IMetaModelValidation)
                      .Select(x => x.Value).FirstOrDefault();

            var result = ValidationService.IsValid(new ValidationMetaModelOption
            {
                IsIncludeKeanOcean = IsIncludeKeanOcean,
                IsValidCurrency = IsValidCurrency,
                IsValidProductCodeList = IsValidProductCodeList

            }, model);

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
