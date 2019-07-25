// -----------------------------------------------------------------------
// <copyright file="CustomerLogController.cs" company="">
// Report controller
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.Customer.CustomerLog
{
    using System.Web.Mvc;
    using System.Web.SessionState;

    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    using Model.Core.DataDomain;

    using ONEbook.UM.Filters;

    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    [SessionState(SessionStateBehavior.ReadOnly)]
    [CheckUMFilter]
    [FunctionAuthorization(PermissionKeys.CustomerInfoCustomerLog)]
    public partial class CustomerLogController : ContentBaseController
    {
        private readonly IProductService _productService;

        public CustomerLogController(
            ILanguageService languageService,
            ISessionService sessionService,
            IProductService productService)
        : base(languageService, sessionService)
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