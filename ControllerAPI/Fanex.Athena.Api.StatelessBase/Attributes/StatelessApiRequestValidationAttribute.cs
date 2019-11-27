using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Resources;
using Fanex.Athena.Service.StatelessCore;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Api.StatelessBase.Attributes
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
    public sealed class StatelessApiRequestValidationAttribute : ActionFilterAttribute
    {
        private static readonly IStatelessValidationService _service = new StatelessValidationService();

        public string ResponseContent { get; set; }

        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            base.OnActionExecuting(actionContext);
            ValidateRequest(actionContext);
        }

        private void ValidateRequest(HttpActionContext actionContext)
        {
            var model = actionContext.ActionArguments.Where(x => x.Value is IMetaModelValidation)
                      .Select(x => x.Value).FirstOrDefault();

            if (!_service.IsValid(model as IMetaModelValidation))
            {
                actionContext.Response = ResponseContent != null
                    ? new HttpResponseMessage
                    {
                        StatusCode = HttpStatusCode.OK,
                        Content = new StringContent(ResponseContent)
                    } : new HttpResponseMessage
                    {
                        StatusCode = HttpStatusCode.Forbidden,
                        Content = new StringContent(ViewResources.InvalidRequestMsg)
                    };
            }
        }
    }
}