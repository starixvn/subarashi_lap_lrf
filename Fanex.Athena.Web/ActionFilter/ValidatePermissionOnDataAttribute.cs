// -----------------------------------------------------------------------
// <copyright file="FunctionAuthorizationAttribute.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Web.ActionFilter
{
    using System;
    using System.Linq;
    using System.Web.Mvc;
    using Fanex.Athena.Model.Core.MetaModel;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
    public sealed class ValidatePermissionOnDataAttribute : ActionFilterAttribute
    {
        private string _custIDFieldName { get; }

        private string _currencyIDFieldName { get; }

        private readonly bool _isObject;

        public ValidatePermissionOnDataAttribute(string custIDFieldName = "custId", string currencyIDFieldName = "currencyId")
        {
            _custIDFieldName = custIDFieldName;
            _currencyIDFieldName = currencyIDFieldName;
        }

        public ValidatePermissionOnDataAttribute(bool isObject)
        {
            _isObject = isObject;
        }

        public ISessionService SessionService { get; set; }

        public IAuthorizationService AuthorizationServiceInstance { get; set; }

        public IAuthorizationService AuthorizationService { get; set; }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var userSession = SessionService.UserSession;
            var authorized = userSession != null;
            if (authorized)
            {
                var custId = 0;
                var currencyId = 0;
                if (_isObject)
                {
                    var identityModel = filterContext.ActionParameters.Where(x => x.Value is IMetalModelCustomerIdentity)
                       .Select(x => x.Value as IMetalModelCustomerIdentity).FirstOrDefault();

                    if (identityModel != null)
                    {
                        custId = identityModel.CustId;
                        currencyId = identityModel.CurrencyId;
                    }
                }
                else
                {
                    int.TryParse(filterContext.HttpContext.Request[_custIDFieldName], out custId);
                    int.TryParse(filterContext.HttpContext.Request[_currencyIDFieldName], out currencyId);
                }

                authorized = AuthorizationService.CheckCustomerBelongsTo(userSession.CurrencyAgentList, custId, currencyId);
            }

            ActionFilterAttributeHelper.OnActionExecuting(filterContext, authorized);
            base.OnActionExecuting(filterContext);
        }
    }
}