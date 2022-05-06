using ONEbook.UM;
using ONEbook.UM.Configurations;
using ONEbook.UM.Services;
using System;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace Fanex.Athena.Web.ActionFilter
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = true, AllowMultiple = true)]
    [CLSCompliant(false)]
    public sealed class UMFilterAttribute : ActionFilterAttribute
    {
        private readonly IMaintenanceService maintenanceService;
        private readonly UMClientConfiguration configuration;

        public UMFilterAttribute() : this(null, null)
        {
        }

        public UMFilterAttribute(IMaintenanceService maintenanceService, UMClientConfiguration configuration)
        {
            this.maintenanceService = maintenanceService ??
                new MaintenanceService(
                      UMClientManager.RestClient,
                      UMClientManager.CacheService,
                      UMClientManager.UMClientConfigs,
                      UMClientManager.HttpContext);
            this.configuration = configuration ?? UMClientManager.UMClientConfigs;
        }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var isUnderMaintenance = maintenanceService.IsUnderMaintenance();

            if (isUnderMaintenance)
            {
                UnderMaintenanceAction(filterContext);
            }

            if (!string.IsNullOrWhiteSpace(configuration.ErrorUMPageUrl)
                && maintenanceService.GetUnderMaintenanceTime().ConnectionResult.IsNotOk)
            {
                ErrorUnderMaintenanceAction(filterContext);
            }
        }

        public void UnderMaintenanceAction(ActionExecutingContext filterContext)
        {
            var response = filterContext.HttpContext.Response;

            if (filterContext.HttpContext.Request.IsAjaxRequest())
            {
                response.Clear();
                response.Write("{ \"code\": 999999, \"message\": \"Under maintenance time.\" }");
                filterContext.Result = new HttpStatusCodeResult(HttpStatusCode.ServiceUnavailable);
                filterContext.Result.ExecuteResult(filterContext.Controller.ControllerContext);
                response.TrySkipIisCustomErrors = true;
                response.End();
            }
            else
            {
                var underMaintenancePageAbsoluteUrl = VirtualPathUtility.ToAbsolute(configuration.UMPageUrl).ToLowerInvariant();
                var currentPageAbsoluteUrl = filterContext.HttpContext.Request.Url.AbsolutePath.ToLowerInvariant();

                if (underMaintenancePageAbsoluteUrl != currentPageAbsoluteUrl)
                {
                    filterContext.Result = new RedirectResult(configuration.UMPageUrl);
                }
            }
        }

        public void ErrorUnderMaintenanceAction(ActionExecutingContext filterContext)
        {
            HttpResponseBase response = filterContext.HttpContext.Response;

            if (filterContext.HttpContext.Request.IsAjaxRequest())
            {
                response.Clear();
                response.Write("{ \"code\": 999998, \"message\": \"UM Error\" }");
                filterContext.Result = new HttpStatusCodeResult(HttpStatusCode.ServiceUnavailable);
                filterContext.Result.ExecuteResult(filterContext.Controller.ControllerContext);
                response.TrySkipIisCustomErrors = true;
                response.End();
            }
            else
            {
                var underMaintenancePageAbsoluteUrl = VirtualPathUtility.ToAbsolute(configuration.ErrorUMPageUrl).ToLowerInvariant();
                var currentPageAbsoluteUrl = filterContext.HttpContext.Request.Url.AbsolutePath.ToLowerInvariant();
                if (underMaintenancePageAbsoluteUrl != currentPageAbsoluteUrl)
                {
                    filterContext.Result = new RedirectResult(configuration.ErrorUMPageUrl);
                }
            }
        }
    }
}
