// -----------------------------------------------------------------------
// <copyright file="LiveReportController.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.Report
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Hosting;
    using System.Web.Mvc;
    using DataAccess.Core.Configuration.Interfaces;
    using Fanex.Athena.Excel.Base.Entities;
    using Fanex.Athena.Excel.Report;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Model.Report.ViewModel.LiveReports;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Utility;
    using Fanex.Athena.VendorAdapter;
    using Fanex.Athena.Web.ActionFilter;
    using Fanex.Athena.Web.ResultExtension;
    using Model.Core.DataDomain;
    using Model.Core.DTO.Common;
    using Model.Report.ResultModel;
    using Service.Report.Interfaces;

    [FunctionAuthorization(PermissionKeys.ReportLiveReport)]
    public class LiveReportController : ReportBaseController
    {
        private const string ProductCodeAll = "ALL";

        private readonly IBalanceUpDataAccess _balanceUpDataAccess;
        private readonly ILiveReportService _liveReportService;
        private readonly ISubsidiaryService _subsidiaryService;

        private bool IsOneworksMaster =>
           SessionServiceInstance.UserSession.UserLevel == UserLevelType.Oneworks
           && SessionServiceInstance.UserSession.SubsidiaryViewType == (byte)SubsidiaryViewType.NormalManagement;

        public LiveReportController(
            IBalanceUpDataAccess balanceUpDataAccess,
            ILiveReportService liveReportService,
            ISubsidiaryService subsidiaryService
            )
        {
            _balanceUpDataAccess = balanceUpDataAccess;
            _liveReportService = liveReportService;
            _subsidiaryService = subsidiaryService;
        }

        [HttpGet]
        public ActionResult Index()
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var subsidiaryList = _subsidiaryService.GetWhiteLabelTree(userSession, licenseeSession.LicenseeName);

            var metaModel = new LiveReportMetaModel
            {
                FromDate = DateTimeHelper.Now,
                ToDate = DateTimeHelper.Now,
                LicenseeId = licenseeSession.LicenseeId,
                UserId = userSession.UserId,
                CurrencyId = 0,
                LiveIndicator = 1,
                BaseCurrency = userSession.DefaultBaseCurrency,
            };

            var productAccess = GetProductAccess(licenseeSession.LicenseeId, userSession.Language);

            var model = CreateViewModel(
                licenseeSession.LicenseeName,
                licenseeSession.IsAllowedCustomerComm,
                userSession.CurrencyList,
                metaModel,
                productAccess,
                subsidiaryList,
                IsOneworksMaster);

            return View("~/Views/Desktop/Report/LiveReport/Main.cshtml", model);
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [ValidationWebRequest]
        [AutoBindMetaModel(BindAgent = true, ApplySubsidiaryBusiness = true)]
        public async Task<ActionResult> Index(LiveReportMetaModel metaModel)
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            metaModel.LicenseeId = licenseeSession.LicenseeId;
            var subsidiaryList = GetSubsidiarySelected(
                _subsidiaryService.GetWhiteLabelTree(userSession, licenseeSession.LicenseeName),
                !string.IsNullOrEmpty(metaModel.SubsidiaryList) ? metaModel.SubsidiaryList.Split(',') : null);

            var productAccess = GetProductAccess(metaModel.LicenseeId, userSession.Language);
            metaModel.ProductCodeList = string.Join(",", productAccess.ProductList.Select(x => x.ProductCode));
            AutoBindMetaModelService.BindProductCodeList(metaModel, SessionServiceInstance.LicenseeSession.OfferedSubProductList, ProductServiceInstance);

            var model = CreateViewModel(
                licenseeSession.LicenseeName,
                licenseeSession.IsAllowedCustomerComm,
                userSession.CurrencyList,
                metaModel,
                productAccess,
                subsidiaryList,
                IsOneworksMaster);

            model.MainResult = await _liveReportService.GetLiveReportSummary(metaModel);
            model.ShowEmptyContent = false;
            return metaModel.IsExportExcel
                       ? await Excel(model).ConfigureAwait(false)
                       : View("~/Views/Desktop/Report/LiveReport/Main.cshtml", model);
        }

        private IEnumerable<CheckedItem> GetSubsidiarySelected(IEnumerable<CheckedItem> subsidiaryList, string[] subsidiarySelected)
        {
            if (subsidiaryList == null || !subsidiaryList.Any())
            {
                return subsidiaryList;
            }

            var result = subsidiaryList.ToList();
            for (int i = 0; i < result.Count; i++)
            {
                result[i].Checked = HasAllChildrenSelected(result[i], subsidiarySelected);
                result[i].Children = GetSubsidiarySelected(result[i].Children, subsidiarySelected);
            }

            return result;
        }

        private bool HasAllChildrenSelected(CheckedItem subsidiaryItem, string[] subsidiarySelected)
        {
            if (subsidiarySelected == null
                || subsidiarySelected.Length == 0
                || subsidiarySelected.Contains(subsidiaryItem.Value)
                || subsidiarySelected.Contains(subsidiaryItem.Name))
            {
                return true;
            }

            if (subsidiaryItem.Children == null || !subsidiaryItem.Children.Any())
            {
                return false;
            }

            var count = 0;
            foreach (var subsidiary in subsidiaryItem.Children)
            {
                if (!HasAllChildrenSelected(subsidiary, subsidiarySelected))
                {
                    return false;
                }
                count++;
            }

            return count == subsidiaryItem.Children.Count();
        }

        [HttpGet]
        [ValidationWebRequest]
        [AutoBindMetaModel(BindAgent = true, ApplySubsidiaryBusiness = true)]
        public async Task<ActionResult> MatchList(LiveReportMatchListMetalModel metaModel)
        {
            var model = await GetMatchData(metaModel);
            return View("~/Views/Desktop/Report/LiveReport/MatchList/Index.cshtml", model);
        }

        [HttpGet]
        [ValidationWebRequest]
        [AutoBindMetaModel(BindAgent = true, ApplySubsidiaryBusiness = true)]
        public async Task<ActionResult> MatchListSort(LiveReportMatchListMetalModel metaModel)
        {
            var model = await GetMatchData(metaModel);
            return PartialView("~/Views/Desktop/Report/LiveReport/MatchList/Content.cshtml", model);
        }

        [HttpPost]
        [ValidationWebRequest]
        [AutoBindMetaModel(BindAgent = true, ApplySubsidiaryBusiness = true)]
        public async Task<ActionResult> MatchListExport(LiveReportMatchListMetalModel metaModel)
        {
            var model = await GetMatchData(metaModel);
            return MatchListExcel(model);
        }

        private ActionResult MatchListExcel(LiveReportMatchListViewModel viewModel)
        {
            const string FileName = "LiveReport";
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var productAccess = GetProductAccess(licenseeSession.LicenseeId, SessionServiceInstance.UserSession.Language);
            var templatePath = HostingEnvironment.MapPath("~/App_Data/Template/Reports/LiveReportMatchList.xls");

            var showingOption = new ShowingOption
            {
                CustomerCommVisible = licenseeSession.IsAllowedCustomerComm,
                BAVisible = productAccess.IsAllowBA,
                HasAmountDueToColumn = AppSettingInstance.HasAmountDueToColumn
            };

            var convertingOption = new ConvertingOption
            {
                IsConvert = viewModel.Param.IsConvert,
                BaseCurrency = viewModel.Param.BaseCurrency,
                CurrencyName = viewModel.Param.CurrencyName
            };

            var _cacheRefAdapter = new CacheRefAdapter();

            var excel = new LiveReportWinLossByMatchExcel(templatePath, convertingOption, showingOption, viewModel, _cacheRefAdapter.GetSportName(viewModel.Param.SportId));

            excel.Export();

            return new ExcelResult(excel.Workbook, FileName);
        }

        private async Task<LiveReportMatchListViewModel> GetMatchData(LiveReportMatchListMetalModel metaModel)
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;

            var productAccess = GetProductAccess(licenseeSession.LicenseeId, userSession.Language);
            var dataList = await _liveReportService.GetLiveReportWinLossByMatch(metaModel).ConfigureAwait(false);

            var model = new LiveReportMatchListViewModel
            {
                MainResult = dataList,
                Param = metaModel,
                IsAllowedCustomerCommission = licenseeSession.IsAllowedCustomerComm,
                ProductAccess = productAccess,
                CurrencyName = metaModel.CurrencyName,
            };

            return model;
        }

        [HttpPost]
        [AjaxRequest]
        [CustomValidateAntiForgery]
        [ValidationWebRequest]
        [AutoBindMetaModel(BindAgent = true, ApplySubsidiaryBusiness = true)]
        public async Task<ActionResult> Detail(LiveReportMetaModel metaModel, string productCode)
        {
            var licenseeSession = this.SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            metaModel.LicenseeId = licenseeSession.LicenseeId;

            var productAccess = GetProductAccess(licenseeSession.LicenseeId, userSession.Language);
            var balanceUpDay = _balanceUpDataAccess.GetBalanceUp().BalanceUpDay;

            var resultModel = await GetDetailResult(metaModel, productAccess, productCode).ConfigureAwait(false);

            return View(
                "~/Views/Desktop/Report/LiveReport/AjaxTemplate/LiveReportDetail.cshtml",
                new LiveReportDetailViewModel
                {
                    IsAllowedCustomerCommission = licenseeSession.IsAllowedCustomerComm,
                    BySports = resultModel.DataBySport,
                    ByCurrencies = resultModel.DataByCurrency,
                    ByBetType = resultModel.DataByBetType,
                    IsShowedDetailLink = metaModel.FromDate >= balanceUpDay,
                    Param = metaModel,
                    ProductAccess = productAccess
                });
        }

        private LiveReportViewModel CreateViewModel(
            string licenseeName,
            bool isAllowedCustomerComm,
            IDictionary<int, string> currencyList,
            LiveReportMetaModel metaModel,
            ProductAccess productAccess,
            IEnumerable<CheckedItem> subsidiaryList,
            bool isOneworksMaster)
        {
            return new LiveReportViewModel
            {
                ShowEmptyContent = true,
                Param = metaModel,
                CurrencyList = currencyList,
                IsAllowedNumberGame = productAccess.IsAllowNG,
                BalanceUpDate = GetBalanceUpDay(),
                IsAllowedCustomerCommission = isAllowedCustomerComm,
                ProductAccess = productAccess,
                IsFakeLicensee = IsFakeLicensee(licenseeName),
                HasAmountDueToColumn = AppSettingInstance.HasAmountDueToColumn,
                SubsidiaryList = subsidiaryList,
                SubsidiaryViewType = IsOneworksMaster ? (byte)SubsidiaryViewType.MasterManagement : SessionServiceInstance.UserSession.SubsidiaryViewType,
                IsOneworksMaster = isOneworksMaster,
                SubsidiarySearch = metaModel.SubsidiarySearch
            };
        }

        private async Task<LiveReportDetailResultModel> GetDetailResult(LiveReportMetaModel metaModel, ProductAccess productAccess, string productCode)
        {
            IEnumerable<Product> productList;
            if (productCode == ProductCodeAll)
            {
                productList = productAccess.ProductList.ToList();
                metaModel.ProductCodeList = string.Join(",", productAccess.ProductList.Select(x => x.ProductCode));
            }
            else
            {
                productList = productAccess.ProductList.Where(i => i.ProductCode == productCode).ToList();
                metaModel.ProductCodeList = productCode;
            }

            AutoBindMetaModelService.BindProductCodeList(metaModel, SessionServiceInstance.LicenseeSession.OfferedSubProductList, ProductServiceInstance);
            return await _liveReportService.GetLiveReportSumaryDetail(metaModel, SessionServiceInstance.UserSession.CurrencyList, productList).ConfigureAwait(false);
        }

        private async Task<ActionResult> Excel(LiveReportViewModel viewModel)
        {
            var templatePath = HostingEnvironment.MapPath("~/App_Data/Template/Reports/LiveReport.xls");
            const string FileName = "LiveReport";
            var productCode = Request.Form["productCode"];
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var productAccess = GetProductAccess(licenseeSession.LicenseeId, SessionServiceInstance.UserSession.Language);
            var showingOption = new ShowingOption
            {
                CustomerCommVisible = licenseeSession.IsAllowedCustomerComm,
                BAVisible = productAccess.IsAllowBA,
                HasAmountDueToColumn = AppSettingInstance.HasAmountDueToColumn
            };
            var convertingOption = new ConvertingOption
            {
                IsConvert = viewModel.Param.IsConvert,
                BaseCurrency = viewModel.Param.BaseCurrency,
                CurrencyName = viewModel.Param.CurrencyName
            };

            var resultModel = string.IsNullOrEmpty(productCode) ?
                new LiveReportDetailResultModel() :
                await GetDetailResult(viewModel.Param, productAccess, productCode).ConfigureAwait(false);

            var liveReportDetail = new LiveReportDetailViewModel
            {
                BySports = resultModel.DataBySport,
                ByCurrencies = resultModel.DataByCurrency,
                ByBetType = resultModel.DataByBetType,
                Param = viewModel.Param,
            };
            var excel = CreateExcel(templatePath, viewModel, showingOption, convertingOption, liveReportDetail);
            excel.Export();

            return new ExcelResult(excel.Workbook, FileName);
        }

        protected internal virtual LiveReportExcel CreateExcel(
            string templatePath,
            LiveReportViewModel viewModel,
            ShowingOption showingOption,
            ConvertingOption convertingOption,
            LiveReportDetailViewModel liveReportDetail)
        {
            return new LiveReportExcel(templatePath, convertingOption, showingOption, viewModel.MainResult, liveReportDetail);
        }

        protected ProductAccess GetProductAccess(int licenseeId, string language)
        {
            return ProductServiceInstance.GetProductAccess(licenseeId, language, FunctionNames.LiveReport);
        }

        private DateTime GetBalanceUpDay()
        {
            var balanceUp = _balanceUpDataAccess.GetBalanceUp();
            return balanceUp != null ? balanceUp.BalanceUpDay : DateTimeHelper.Now;
        }
    }
}