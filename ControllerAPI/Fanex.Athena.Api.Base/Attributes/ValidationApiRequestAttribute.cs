using Fanex.Athena.Api.Base.Attributes.Extensions;
using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Resources;
using Fanex.Athena.Service.Core.Utility.Interfaces;
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

        public bool IsValidCurrency { get; set; }
        public bool IsValidCurrencyList { get; set; }
        public bool IsIncludeKeanOcean { get; set; }
        public bool IsValidProductCodeList { get; set; }

        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            base.OnActionExecuting(actionContext);
            ValidateRequest(actionContext);

        }

        private void ValidateRequest(HttpActionContext actionContext)
        {
            var root = !string.IsNullOrEmpty(ObjectName) ? actionContext.ActionArguments[ObjectName]
                 : actionContext.ActionArguments.Where(x => x.Value is IMetaModelValidation)
                      .Select(x => x.Value).FirstOrDefault();

            var scope = actionContext.Request.GetDependencyScope();

            var validationService = scope.Resolve<IValidationService>();

            if (!validationService.IsValid(new ValidationMetaModelOption
            {
                IsValidProductCodeList = IsValidProductCodeList,
                IsIncludeKeanOcean = IsIncludeKeanOcean,
                IsValidCurrency = IsValidCurrency,
                IsValidCurrencyList = IsValidCurrencyList
            }, root))
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
