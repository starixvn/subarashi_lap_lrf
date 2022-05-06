namespace Fanex.Athena.Controllers.Customer.CustomerLog
{
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    using System.Web.Mvc;
    using System.Web.SessionState;

    [SessionState(SessionStateBehavior.ReadOnly)]
    [UMFilter]
    [FunctionAuthorization(PermissionKeys.CustomerInfoCustomerLog)]
    public partial class CustomerLogController : CultureBaseController
    {
        private readonly IProductService _productService;

        public CustomerLogController(
            IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public ActionResult Index()
        {
            return LogInLog();
        }
    }
}