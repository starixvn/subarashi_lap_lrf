using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using Fanex.Athena.Api.StatelessBase.Attributes.Extensions;
using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Api.StatelessBase.Attributes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true, Inherited = true)]
    public sealed class ApiProductPermissionAttribute : ActionFilterAttribute
    {
        private readonly bool _isCheckDirectly;

        private readonly int _productId;

        private readonly int[] _limitedProductIds;

        private readonly string _productIdFieldName;

        public ApiProductPermissionAttribute(string productIdFieldName = "productId", params int[] limitedProductIds)
        {
            _productIdFieldName = productIdFieldName;
            _limitedProductIds = limitedProductIds;
        }

        public ApiProductPermissionAttribute(int productId)
        {
            _productId = productId;
            _isCheckDirectly = true;
        }

        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            if (!ValidateRequest(actionContext))
            {
                var content = new
                {
                    ErrCode = (int)HttpStatusCode.Forbidden,
                    ErrMsg = "Access Denied."
                };

                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Forbidden, content);
            }

            base.OnActionExecuting(actionContext);
        }

        private bool ValidateRequest(HttpActionContext actionContext)
        {
            if (!actionContext.ActionArguments.ContainsKey("sitename"))
            {
                return false;
            }

            var scope = actionContext.Request.GetDependencyScope();
            var authorizationService = scope.Resolve<IAuthorizationService>();

            var licenseeName = actionContext.ActionArguments["sitename"].ToString();

            var productId = GetProductId(actionContext);

            return authorizationService.CheckProductBelongsTo(licenseeName, productId, _limitedProductIds);
        }

        private int GetProductId(HttpActionContext actionContext)
        {
            if (_isCheckDirectly)
            {
                return _productId;
            }

            var identityModel = actionContext.ActionArguments.Where(x => x.Value is IMetaModelProduct)
                    .Select(x => x.Value as IMetaModelProduct).FirstOrDefault();

            if (identityModel != null)
            {
                return identityModel.ProductId;
            }

            return int.TryParse(actionContext.ActionArguments[_productIdFieldName]?.ToString(), out int value) ? value : 0;
        }
    }
}