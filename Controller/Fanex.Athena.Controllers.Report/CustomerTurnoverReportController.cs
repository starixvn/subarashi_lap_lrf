namespace Fanex.Athena.Controllers.Report
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Hosting;
    using System.Web.Mvc;
    using DataAccess.Core.Common.Interfaces;
    using Fanex.Athena.Excel.Report;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.MetaModel;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Service.Core.Common.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Utility;
    using Fanex.Athena.Web.ActionFilter;
    using Fanex.Athena.Web.ResultExtension;
    using Model.Core.DTO.Common;
    using Model.Core.ResultModel;
    using Model.Report.DTO;
    using Newtonsoft.Json;
    using Resources;
    using Service.Report.Interfaces;

    [FunctionAuthorization(PermissionKeys.ReportCustomerTurnover)]
    public class CustomerTurnoverReportController : ReportBaseController
    {
        private readonly ISportTypeDataAccess _sportTypeDataAccess;

        private readonly ICustomerTurnoverService _customerTurnoverService;

        private readonly IAppSettings _appSettings;

        private readonly ICompressService _compressService;
        private readonly IFileService _fileService;

        public CustomerTurnoverReportController(
            ISportTypeDataAccess sportTypeDataAccess,
            ICustomerTurnoverService customerTurnoverService,
            IAppSettings appSettings,
            ICompressService compressService,
            IFileService fileService)
        {
            _sportTypeDataAccess = sportTypeDataAccess;
            _customerTurnoverService = customerTurnoverService;
            _appSettings = appSettings;
            _compressService = compressService;
            _fileService = fileService;
        }

        [HttpGet]
        public ActionResult Index()
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var model = new CustomerTurnoverViewModel
            {
                Param = new CustomerTurnoverMetaModel { LicenseeId = licenseeSession.LicenseeId },
                IsAllowedCustomerCommission = licenseeSession.IsAllowedCustomerComm,
                CurrencyList = SessionServiceInstance.UserSession.CurrencyList,
                IsAllowSLT = licenseeSession.OfferedSubProductList.IsPresent(_ => _ == Product.SLT)
            };

            return View("~/Views/Desktop/Report/CustomerTurnover/Main.cshtml", model);
        }

        [HttpGet]
        [AjaxRequest]
        public async Task<ActionResult> GetSportsAndProducts()
        {
            var listItem = new List<SportProductItem>();

            var productCode = ProductServiceInstance.GetAllowedSubProductCodeList(
               SessionServiceInstance.LicenseeSession.OfferedSubProductList,
               $"{Product.SB},{Product.NG},{Product.VS},{Product.VS2},{Product.VS3},{Product.LG}");

            var data = await _sportTypeDataAccess.GetSportsAndProducts(
                SessionServiceInstance.LicenseeSession.LicenseeId,
                SessionServiceInstance.UserSession.Language,
                productCode)
                .ConfigureAwait(false);

            listItem.AddRange(data);
            var parlayProduct = new SportProductItem
            {
                Checked = true,
                ID = ProductTypes.Parlay,
                Name = ViewResources.Parlay,
                ParentId = ProductTypes.Sportsbook
            };
            listItem.Add(parlayProduct);

            return Json(listItem, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [ValidateInput(false)]
        [CustomValidateAntiForgery]
        public async Task<ActionResult> Excel(string excelParam)
        {
            if (string.IsNullOrEmpty(excelParam))
            {
                return null;
            }

            var metaModel = JsonConvert.DeserializeObject<CustomerTurnoverMetaModel>(excelParam);
            if (!metaModel.IsValid)
            {
                return null;
            }

            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList
                , metaModel.CurrencyId);
            const string FileName = "CustomerTurnover";
            metaModel.IsExportExcel = true;

            var templatePath = HostingEnvironment.MapPath(@"~/App_Data/Template/CustomerReports/CustomerTurnover.xls");
            var formatDateTime = metaModel.ReportBy == 1 ? "MM/dd/yyyy" : "MM/yyyy";

            var showingOption = new ShowingOption
            {
                CustomerCommVisible = licenseeSession.IsAllowedCustomerComm
            };
            var currencyName = userSession.CurrencyList
                .Where(i => i.Key == metaModel.CurrencyId).Select(i => i.Value).SingleOrDefault();

            var result = await _customerTurnoverService.GetDataList(metaModel, userSession.CurrencyList, userSession.Language);
            var pageDatas = PagingData(result);
            var reportTitle = GenerateReportTitle(metaModel, currencyName);

            if (pageDatas.Count() <= 1)
            {
                var excel = CreateExcel(templatePath, formatDateTime, showingOption, result, reportTitle);
                excel.Export();
                return new ExcelResult(excel.Workbook, FileName);
            }

            var listExcel = new List<ZipEntry>();
            var pageIndex = 0;
            foreach (var item in pageDatas)
            {
                var excel = CreateExcel(templatePath, formatDateTime, showingOption, item, reportTitle);
                excel.Export();
                var entry = WriteExcelFile(excel, $"{FileName}_{pageIndex}");
                listExcel.Add(entry);
                pageIndex++;
            }
            var zipFileName = _compressService.CompressDataToFile(listExcel, true);
            var stream = new FileStream(zipFileName, FileMode.Open, FileAccess.Read, FileShare.None, 4096, FileOptions.DeleteOnClose);
            return File(stream, "application/zip", $"{FileName}.zip");
        }

        private ZipEntry WriteExcelFile(CustomerTurnoverExcel excel, string fileName)
        {
            var path = _compressService.EnsureFolderPath();
            var excelFilePath = Path.Combine(path, $"{Guid.NewGuid()}.xls");
            var excelBytes = WriteExcelToByte(excel);
            _fileService.WriteAllBytes(excelFilePath, excelBytes);
            return new ZipEntry
            {
                Path = excelFilePath,
                FileName = $"{fileName}.xls"
            };
        }

        private static byte[] WriteExcelToByte(CustomerTurnoverExcel excel)
        {
            var workbook = excel.Workbook;
            try
            {
                using (var stream = new MemoryStream())
                {
                    workbook.Write(stream);
                    return stream.ToArray();
                }
            }
            finally
            {
                workbook.Close();
            }
        }

        private IEnumerable<ReportResultModel<CustTurnover>> PagingData(ReportResultModel<CustTurnover> result)
        {
            var listPagingDatas = new List<ReportResultModel<CustTurnover>>();
            var pagingItem = CopyData(result);
            var dataList = new List<CustTurnover>();
            var totalRow = 0;
            int lastIndex = -1;
            var lastRow = result.DataList.LastOrDefault();
            foreach (var item in result.DataList)
            {
                if (lastIndex != -1 && item.Index != lastIndex)
                {
                    pagingItem.DataList = dataList;
                    listPagingDatas.Add(pagingItem);
                    totalRow = 0;
                    lastIndex = -1;
                    pagingItem = CopyData(result);
                    dataList = new List<CustTurnover>();
                }
                totalRow++;
                dataList.Add(item);
                if (item == lastRow)
                {
                    pagingItem.DataList = dataList;
                    listPagingDatas.Add(pagingItem);
                    break;
                }
                if (totalRow == _appSettings.MaxRowPerExcelFile)
                {
                    lastIndex = item.Index;
                }
            }

            return listPagingDatas;
        }

        private ReportResultModel<CustTurnover> CopyData(ReportResultModel<CustTurnover> result)
        {
            return new ReportResultModel<CustTurnover>
            {
                TotalData = result.TotalData,
                TotalDataList = result.TotalDataList,
                SummaryTotal = result.SummaryTotal,
                TotalRows = result.TotalRows,
            };
        }

        protected internal virtual CustomerTurnoverExcel CreateExcel(
            string templatePath,
            string formatDateTime,
            ShowingOption showingOption,
            ReportResultModel<CustTurnover> result,
            string reportTitle)
        {
            return new CustomerTurnoverExcel(templatePath, showingOption, result.DataList, result.TotalData, formatDateTime, reportTitle);
        }

        private static string GenerateReportTitle(CustomerTurnoverMetaModel metaModel, string currencyName)
        {
            var usernameExcelTitle = string.IsNullOrEmpty(metaModel.Username) ?
                            string.Empty
                            : "- " + ViewResources.Username + ": " + metaModel.Username;
            var reportTitle = string.Format(
                "{0}, {1} --> {2} - {3}: {4} - {5}: {6} {7}",
                                            ViewResources.CustomerTurnover,
                                            metaModel.FromDate.ToString("MM/dd/yyyy"),
                                            metaModel.ToDate.ToString("MM/dd/yyyy"),
                                            ViewResources.Currency,
                                            currencyName,
                                            ViewResources.MinimumOdds,
                                            metaModel.Odds,
                                            usernameExcelTitle);
            return reportTitle;
        }
    }
}