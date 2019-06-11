using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace Fanex.Athena.Api.Base.Attributes
{
    [AttributeUsage(AttributeTargets.All, AllowMultiple = true)]
    public class ValidationApiRequestAttribute : ActionFilterAttribute
    {
        public string ObjectName { get; set; }

        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            base.OnActionExecuting(actionContext);
            ValidateRequest(actionContext);

        }

        private void ValidateRequest(HttpActionContext actionContext)
        {
            var model = !string.IsNullOrEmpty(ObjectName) ? actionContext.ActionArguments[ObjectName] as IMetaModelValidation
                 : actionContext.ActionArguments.Where(x => x.Value is IMetaModelValidation)
                      .Select(x => (IMetaModelValidation)x.Value).FirstOrDefault();

            if (model is null || !model.IsValid)
            {
                actionContext.Response = new HttpResponseMessage
                {
                    StatusCode = HttpStatusCode.Forbidden,
                    Content = new StringContent(ViewResources.InvalidRequestMsg)
                };
            }
        }

    }
}
