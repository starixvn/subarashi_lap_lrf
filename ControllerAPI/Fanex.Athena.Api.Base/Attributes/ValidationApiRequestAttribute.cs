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

        /// <summary>
        /// Option: IsIncludeKeanOcean
        /// </summary>
        public bool IsValidCurrency { get; set; }

        public bool IsValidCurrencyList { get; set; }

        public bool IsIncludeKeanOcean { get; set; }
        /// <summary>
        /// Required :FunctionKey
        /// </summary>
        public bool IsValidProductCodeList { get; set; }
        public string FunctionKey { get; set; }
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

            if (!validationService.IsValid(root,
               new CurrencyValidationOption
               {
                   IsValidCurrency = IsValidCurrency,
                   IsIncludeKeanOcean = IsIncludeKeanOcean,
                   IsValidCurrencyList = IsValidCurrencyList

               }, new ProductValidationOption
               {
                   IsValidProductCodeList = IsValidProductCodeList,
                   FunctionKey = FunctionKey

               }))
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
