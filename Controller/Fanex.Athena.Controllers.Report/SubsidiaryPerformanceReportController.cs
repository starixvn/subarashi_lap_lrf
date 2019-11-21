namespace Fanex.Athena.Controllers.Report
{
    using Fanex.Athena.Model.Auth.DataDomain;

    using Model.Core.DataDomain;
    using Model.Core.DTO.Common;
    using Model.Core.MetaModel.Product;
    using Model.Report.ViewModel;

    using Service.Report.Interfaces;

    using System.Linq;
    using System.Web.Mvc;

    using Web.ActionFilter;

    [FunctionAuthorization(PermissionKeys.ReportSubsidiaryPerformance)]
    public class SubsidiaryPerformanceReportController : ReportBaseController
    {
        private readonly ISubsidiaryService _subsidiaryService;

        public SubsidiaryPerformanceReportController(
            ISubsidiaryService subsidiaryService)
        {
            _subsidiaryService = subsidiaryService;
        }

        public ActionResult Index()
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var productAccess = this.ProductServiceInstance.GetSingleWalletProductAccess(
                licenseeSession.LicenseeId,
                userSession.Language,
                FunctionNames.SubsidiaryPerformance);
            var subsidiaryNames = userSession.IsManageableSubsidiary ? _subsidiaryService.GetSubsidiaryNames() : null;

            var model = new SubsidiaryPerformanceViewModel
            {
                ProductOptionList = productAccess.ProductList.Select(i => new ProductOption
                {
                    Code = i.ProductCode,
                    Name = i.ProductName,
                    Status = true
                }).ToList(),
                SubsidiaryList = subsidiaryNames?.Select(x => new CheckedItem
                {
                    Name = x,
                    Checked = true
                }).ToList()
            };
            ViewBag.DefaultSelectedBaseCurrency = userSession.DefaultBaseCurrency;
            return View("~/Views/Desktop/Report/SubsidiaryPerformance/Main.cshtml", model);
        }
    }
}