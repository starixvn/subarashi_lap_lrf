using Fanex.Athena.Model.Core.MetaModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web.Routing;

namespace Fanex.Athena.Web.ActionFilter
{
    [AttributeUsage(AttributeTargets.All, AllowMultiple = true)]
    public class ValidationWebRequestAttribute : ActionFilterAttribute
    {
        public string MetalModelName { get; set; }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);
            var model = !string.IsNullOrEmpty(MetalModelName) ? filterContext.ActionParameters[MetalModelName] as IMetalModelValidation
                 : filterContext.ActionParameters.Where(x => x.Value is IMetalModelValidation)
                      .Select(x => (IMetalModelValidation)x.Value).FirstOrDefault();

            if (model is null || !model.IsValid)
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
