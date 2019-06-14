using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Service.Core.Utility;
using Fanex.Athena.Service.Core.Utility.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web.Routing;

namespace Fanex.Athena.Web.ActionFilter
{
    [AttributeUsage(AttributeTargets.All, AllowMultiple = true)]
    public class ValidationWebRequestAttribute : ActionFilterAttribute
    {
        private readonly IValidationService _validationService;
        public ValidationWebRequestAttribute() : this(null)
        {

        }
        public ValidationWebRequestAttribute(IValidationService validationService)
        {
            _validationService = validationService ?? new ValidationService();
        }
        public string ObjectName { get; set; }
        public bool IsValidCurrency { get; set; }
        public bool IsIncludeKeanOcean { get; set; }
        public bool IsValidProductCodeList { get; set; }
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);
            var model = !string.IsNullOrEmpty(ObjectName) ? filterContext.ActionParameters[ObjectName] as IMetaModelValidation
                 : filterContext.ActionParameters.Where(x => x.Value is IMetaModelValidation)
                      .Select(x => (IMetaModelValidation)x.Value).FirstOrDefault();

            var result = _validationService.IsValidMetalModel(model);

            if(!result)
            {
                filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new
                {
                    controller = "Utility",
                    action = "Error",
                    err = "400"
                }));
            }

        }


    }
}
