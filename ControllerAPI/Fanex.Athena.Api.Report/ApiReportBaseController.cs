namespace Fanex.Athena.Api.Report
{
    using Base;
    using Service.Core.Common.Interfaces;

    public class ApiReportBaseController : BaseApiController
    {
        protected ApiReportBaseController(
            ILanguageService langService)
            : base(langService)
        {
        }
    }
}