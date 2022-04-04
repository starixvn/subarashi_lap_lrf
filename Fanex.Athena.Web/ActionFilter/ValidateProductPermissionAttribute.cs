namespace Fanex.Athena.Web.ActionFilter
{
    using System;
    using System.Linq;
    using System.Web.Mvc;
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

        public ISessionService SessionService { get; set; }

        public IAuthorizationService AuthorizationService { get; set; }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var authorized = ValidateRequest(filterContext);
            ActionFilterAttributeHelper.OnActionExecuting(filterContext, authorized);
            base.OnActionExecuting(filterContext);
        }

        private bool ValidateRequest(ActionExecutingContext filterContext)
        {
            var licenseeSession = SessionService.LicenseeSession;

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
