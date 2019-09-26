namespace Fanex.Athena.Web.ActionFilter
{
    using System;
    using System.Linq;
    using System.Net;
    using System.Web.Mvc;
    using System.Web.Routing;
    using Fanex.Athena.Model.Core.MetaModel;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true, Inherited = true)]
    public sealed class ValidateProductPermissionAttribute : ActionFilterAttribute
    {
        private readonly bool _isCheckDirectly;

        private readonly int _productId;

        private readonly int[] _limitedProductIds;

        private readonly string _productIdFieldName;

        public ValidateProductPermissionAttribute(string productIdFieldName = "productId", params int[] limitedProductIds)
        {
            _productIdFieldName = productIdFieldName;
            _limitedProductIds = limitedProductIds;
        }

        public ValidateProductPermissionAttribute(int productId)
        {
            _productId = productId;
            _isCheckDirectly = true;
        }

        public ISessionStorage SessionStorage { get; set; }

        public IAuthorizationService AuthorizationService { get; set; }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (!ValidateRequest(filterContext))
            {
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

            base.OnActionExecuting(filterContext);
        }

        private bool ValidateRequest(ActionExecutingContext filterContext)
        {
            var licenseeSession = SessionStorage.LicenseeAuthInfo;

            if (licenseeSession is null)
            {
                return false;
            }

            var productId = GetProductId(filterContext);

            return AuthorizationService.CheckProductBelongsTo(licenseeSession.LicenseeName, productId, _limitedProductIds);
        }

        private int GetProductId(ActionExecutingContext filterContext)
        {
            if (_isCheckDirectly)
            {
                return _productId;
            }

            var identityModel = filterContext.ActionParameters.Where(x => x.Value is IMetaModelProduct)
                    .Select(x => x.Value as IMetaModelProduct).FirstOrDefault();

            if (identityModel != null)
            {
                return identityModel.ProductId;
            }

            return int.TryParse(filterContext.HttpContext.Request[_productIdFieldName], out int value) ? value : 0;
        }
    }
}