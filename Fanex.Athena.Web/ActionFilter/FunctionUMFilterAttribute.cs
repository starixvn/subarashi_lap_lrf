using Fanex.Athena.Model.Core.Enum;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.Service.StatelessCore.Utility;
using System;
using System.Net;
using System.Web.Mvc;
using System.Web.Routing;

namespace Fanex.Athena.Web.ActionFilter
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = true, AllowMultiple = true)]
    public class FunctionUMFilterAttribute : ActionFilterAttribute
    {
        private readonly FunctionUMType _functionUMType;

        public IFunctionUMService UMService { get; set; }

        public FunctionUMFilterAttribute(FunctionUMType functionUMType)
        {
            _functionUMType = functionUMType;
        }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            (bool isUM, string timeFrom, string timeTo) = UMService.GetUnderMaintenanceInfo(_functionUMType);
            if (isUM)
            {
                var context = filterContext.HttpContext;

                if (context.Request.IsAjaxRequest())
                {
                    filterContext.Result = new JsonResult
                    {
                        Data = FunctionUMHelper.CreateUMResult(timeFrom, timeTo)
                    };
                }
                else
                {
                    var routeValue = new
                    {
                        controller = "Utility",
                        action = "FunctionUnderMaintenance",
                        timeFrom,
                        timeTo
                    };

                    filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(routeValue));
                }
            }
        }
    }
}
