namespace Fanex.Athena.Api.Report
{
    using Base;

    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    public class ApiReportBaseController : BaseApiController
    {
        protected ApiReportBaseController(
            ISessionService sessionService,
            IProductService productService,
            ILanguageService langService)
            : base(sessionService, productService, langService)
        {
        }
    }
}