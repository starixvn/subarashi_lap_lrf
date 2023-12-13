using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using Fanex.Athena.Api.StatelessBase.Utility;
using ONEbook.UM;
using ONEbook.UM.Configurations;
using ONEbook.UM.Services;

namespace Fanex.Athena.Api.Base.Attributes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = true, AllowMultiple = true)]
    [CLSCompliant(false)]
    public sealed class ApiUMFilterAttribute : ActionFilterAttribute
    {
        private readonly IMaintenanceService maintenanceService;

        private readonly UMClientConfiguration configuration;

        public ApiUMFilterAttribute() : this(null, null)
        {
        }

        public ApiUMFilterAttribute(IMaintenanceService maintenanceService, UMClientConfiguration configuration)
        {
            this.maintenanceService = maintenanceService ??
                new MaintenanceService(
                      UMClientManager.RestClient,
                      UMClientManager.CacheService,
                      UMClientManager.UMClientConfigs,
                      UMClientManager.HttpContext);
            this.configuration = configuration ?? UMClientManager.UMClientConfigs;
        }

        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            var isUnderMaintenance = maintenanceService.IsUnderMaintenance();

            if (isUnderMaintenance)
            {
                actionContext.Response = BuildUmResponse(actionContext.ActionDescriptor.ActionName.Equals("ReportViews"));
            }

            if (!string.IsNullOrWhiteSpace(configuration.ErrorUMPageUrl)
                && maintenanceService.GetUnderMaintenanceTime().ConnectionResult.IsNotOk)
            {
                actionContext.Response = BuildUmErrorResponse(actionContext.ActionDescriptor.ActionName.Equals("ReportViews"));
            }
        }

        private HttpResponseMessage BuildUmResponse(bool isViewRequest)
        {
            if (isViewRequest)
            {
                return RequestHelper.HostRedirectResponse(configuration.UMPageUrl);
            }

            return BuildResponse("{ \"code\": 999999, \"message\": \"Under maintenance time.\" }");
        }

        private HttpResponseMessage BuildUmErrorResponse(bool isViewRequest)
        {
            if (isViewRequest)
            {
                return RequestHelper.HostRedirectResponse(configuration.ErrorUMPageUrl);
            }

            return BuildResponse("{ \"code\": 999998, \"message\": \"UM Error\" }");
        }

        private static HttpResponseMessage BuildResponse(string content)
        {
            var responseMessage = new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.ServiceUnavailable,
                Content = new StringContent(content),
            };
            responseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return responseMessage;
        }
    }
}