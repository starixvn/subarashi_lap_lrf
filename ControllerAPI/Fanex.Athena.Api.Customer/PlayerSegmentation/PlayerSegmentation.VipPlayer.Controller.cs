namespace Fanex.Athena.Api.Customer
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Net.Http;
    using System.Threading.Tasks;
    using System.Web.Hosting;
    using System.Web.Http;
    using System.Web.Http.Results;
    using Fanex.Athena.Api.Base.Attributes;
    using Fanex.Athena.Excel.Customer;
    using Fanex.Athena.Excel.Customer.PlayerSegmentation;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.Resources;

    public partial class PlayerSegmentationController
    {
        private const int PAGESIZE = 100000;

        [HttpPost]
        [ApiFunctionAuthorization(PermissionKeys.PlayerVIPManagement)]
        [ValidationApiRequest(IsValidCurrencyList = true)]
        [ApiAutoBindMetaModel(BindAgent = true, ApplySubsidiaryBusiness = true)]
        public async Task<JsonResult<ApiPagingResult<PlayerInfo>>> GetVipPlayerList(VipPlayerListMetaModel metaModel)
        {
            var result = await _playerService.GetVipPlayerListAsync(metaModel).ConfigureAwait(false);
            return JsonApi(result);
        }

        [HttpPost]
        [ApiFunctionAuthorization(PermissionKeys.PlayerVIPManagement_Write)]
        public Task<HttpResponseMessage> ExportVipPlayerListTemplateExcel(byte uploadBy = UploadByExternalId)
        {
            const string fileName = "VipPlayerList.xls";

            var templatePath = HostingEnvironment.MapPath(uploadBy == UploadByExternalId ? VipPlayerUploadByExternalIdTemplate : VipPlayerUploadBySystemIdTemplate);

            var headers = uploadBy == UploadByExternalId
                ? new[] { ViewResources.ExternalId }
                : new[] { ViewResources.SystemId };

            var excel = new SampleExcel(templatePath, headers);
            excel.Export();
            var result = ExcelStream(excel.Workbook, fileName);
            return Task.FromResult(result);
        }

        [HttpPost]
        [ApiFunctionAuthorization(PermissionKeys.PlayerVIPManagement)]
        [ValidationApiRequest(IsValidCurrencyList = true)]
        [ApiAutoBindMetaModel(BindAgent = true, ApplySubsidiaryBusiness = true)]
        public async Task<HttpResponseMessage> ExportVipPlayerList(VipPlayerListMetaModel metaModel)
        {
            metaModel.PageSize = PAGESIZE;
            metaModel.PageIndex = 1;
            var isNormalView = _playerService.IsNormalView(metaModel);
            var dataSource = await _playerService.GetVipPlayerListAsync(metaModel).ConfigureAwait(false);

            if (dataSource.TotalItem > AppSettingInstance.MaxRowPerExcelFile)
            {
                return await BuildZipFile(dataSource, metaModel, isNormalView);
            }

            return ExportXls(dataSource.Data, isNormalView);
        }

        private HttpResponseMessage ExportXls(IEnumerable<PlayerInfo> dataList, bool isNormalView)
        {
            if (dataList.Any())
            {
                const string fileName = "VipPlayerList.xls";
                var excel = new VipPlayerExcel(dataList, isNormalView);
                excel.Export();

                return ExcelStream(excel.Workbook, fileName);
            }

            return new HttpResponseMessage { StatusCode = System.Net.HttpStatusCode.NoContent };
        }

        private async Task<HttpResponseMessage> BuildZipFile(ApiPagingResult<PlayerInfo> dataPage, VipPlayerListMetaModel metaModel, bool isNormalView)
        {
            var excelFiles = new List<VipPlayerExcel>();
            const string fileName = "VipPlayerList.zip";

            excelFiles.AddRange(BuildExcelFiles(dataPage.Data, isNormalView));

            while (dataPage.TotalItem > metaModel.PageIndex * metaModel.PageSize)
            {
                metaModel.PageIndex++;
                dataPage = await _playerService.GetVipPlayerListAsync(metaModel).ConfigureAwait(false);
                excelFiles.AddRange(BuildExcelFiles(dataPage.Data, isNormalView));
            }

            return ZipFileSteam(CreateZipFile(excelFiles), fileName);
        }

        private IEnumerable<VipPlayerExcel> BuildExcelFiles(IEnumerable<PlayerInfo> dataList, bool isNormalView)
        {
            var excelFiles = new List<VipPlayerExcel>();
            var dataSource = dataList.ToList();

            var data = dataSource.Select((x, i) => new { Index = i, Value = x })
            .GroupBy(x => x.Index / AppSettingInstance.MaxRowPerExcelFile)
            .Select(x => x.Select(v => v.Value).ToList()).ToList();

            foreach (var item in data)
            {
                var excel = new VipPlayerExcel(item, isNormalView);
                excel.Export();
                excelFiles.Add(excel);
            }

            return excelFiles.ToList();
        }
    }
}