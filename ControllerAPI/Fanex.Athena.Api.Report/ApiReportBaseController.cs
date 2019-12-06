namespace Fanex.Athena.Api.Report
{
    using Base;

    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    public class ApiReportBaseController : BaseApiController
    {
        protected ApiReportBaseController(
            ILanguageService langService)
            : base(langService)
        {
        }
    }
}