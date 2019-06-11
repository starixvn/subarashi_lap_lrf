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
        public string ObjectName { get; set; }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);
            var model = !string.IsNullOrEmpty(ObjectName) ? filterContext.ActionParameters[ObjectName] as IMetaModelValidation
                 : filterContext.ActionParameters.Where(x => x.Value is IMetaModelValidation)
                      .Select(x => (IMetaModelValidation)x.Value).FirstOrDefault();

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
