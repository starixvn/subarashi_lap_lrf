namespace Fanex.Athena.Api.Customer
{
    using Fanex.Athena.Api.Base.Attributes;
    using Fanex.Athena.Excel.Customer;
    using Fanex.Athena.Excel.Customer.PlayerSegmentation;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.Resources;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net.Http;
    using System.Threading.Tasks;
    using System.Web.Hosting;
    using System.Web.Http;
    using System.Web.Http.Results;

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
            var data = dataSource.Data.ToList();

            while (dataSource.TotalItem > metaModel.PageIndex * metaModel.PageSize)
            {
                metaModel.PageIndex++;
                dataSource = await _playerService.GetVipPlayerListAsync(metaModel).ConfigureAwait(false);
                data.AddRange(dataSource.Data);
            }

            if (data.Count > AppSettingInstance.MaxRowPerExcelFile)
            {
                return BuildZip(data, isNormalView);
            }

            return ExportXls(data, isNormalView);
        }

        private HttpResponseMessage ExportXls(IEnumerable<PlayerInfo> dataList, bool isNormalView)
        {
            if (dataList.Any())
            {
                const string fileName = "VipPlayerList.xls";
                var excel = new VipPlayerExcel(dataList, isNormalView);
                excel.Export();

                var result = ExcelStream(excel.Workbook, fileName);
                return result;
            }
            return new HttpResponseMessage { StatusCode = System.Net.HttpStatusCode.NoContent };
        }

        private HttpResponseMessage BuildZip(IEnumerable<PlayerInfo> dataList, bool isNormalView)
        {
            var excelFiles = new List<VipPlayerExcel>();
            VipPlayerExcel excel;

            const string fileName = "VipPlayerList.zip";

            // split 10k from datalist
            var data = new List<PlayerInfo>();
            var dataSource = dataList.ToList();
            for (int i = 0; i < dataSource.Count; i++)
            {
                if (data.Count == AppSettingInstance.MaxRowPerExcelFile)
                {
                    excel = new VipPlayerExcel(data, isNormalView);
                    excel.Export();

                    excelFiles.Add(excel);

                    data = new List<PlayerInfo>();
                }

                data.Add(dataSource[i]);
            }

            excel = new VipPlayerExcel(data, isNormalView);
            excel.Export();

            excelFiles.Add(excel);

            return ZipFileSteam(CreateZipFile(excelFiles), fileName);
        }
    }
}