namespace Fanex.Athena.Controllers.Report
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.DTO.Users;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.Core.DataDomain;
    using Model.Core.MetaModel.Product;
    using Model.Report.ViewModel;


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
            var model = new SubsidiaryPerformanceViewModel
            {
                ProductOptionList = productAccess.ProductList.Select(i => new ProductOption
                {
                    Code = i.ProductCode,
                    Name = i.ProductName,
                    Status = true
                }).ToList(),
                GroupSubsidiaryList = _subsidiaryService.GetSubsidiaryTree(userSession, licenseeSession.LicenseeName),
                IsSubsidiaryMasterView = userSession.SubsidiaryViewType == (int)SubsidiaryViewType.MasterManagement
            };
            ViewBag.DefaultSelectedBaseCurrency = userSession.DefaultBaseCurrency;
            return View("~/Views/Desktop/Report/SubsidiaryPerformance/Main.cshtml", model);
        }
    }
}