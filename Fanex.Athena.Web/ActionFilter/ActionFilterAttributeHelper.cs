using System.Net;
using System.Web.Mvc;
using System.Web.Routing;

namespace Fanex.Athena.Web.ActionFilter
{
    public static class ActionFilterAttributeHelper
    {
        public static void OnActionExecuting(ActionExecutingContext filterContext, bool isAllowed)
        {
            if (isAllowed)
            {
                return;
            }

            var context = filterContext.HttpContext;
            if (context.Request.IsAjaxRequest())
            {
                filterContext.HttpContext.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                filterContext.HttpContext.Response.ContentType = "application/json";
                filterContext.Result = new JsonResult
                {
                    Data = new { ErrCode = (int)HttpStatusCode.Forbidden, ErrMsg = "Access Denied." },
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
                };
            }
            else
            {
                var routeValue = new
                {
                    controller = "Utility",
                    action = "AccessDenied",
                    message = "AccessDenied"
                };

                filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(routeValue));
            }
        }
    }
}
