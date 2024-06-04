namespace Fanex.Athena.Api.Customer
{
    using System.Linq;
    using System.Net.Http;
    using System.Threading.Tasks;
    using System.Web.Http;
    using System.Web.Http.Results;
    using Fanex.Athena.Api.Base;
    using Fanex.Athena.Api.Base.Attributes;
    using Fanex.Athena.Excel.Customer;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
    using Fanex.Athena.Model.Customer.MetaModel;

    public partial class PlayerSegmentationController : BaseApiController
    {
        [HttpPost]
        [ApiFunctionAuthorization(PermissionKeys.SabaVirtualSetting)]
        [ValidationApiRequest(IsValidCurrencyList = true)]
        [ApiAutoBindMetaModel(BindAgent = true, ApplySubsidiaryBusiness = true, BindLanguage = true)]
        public async Task<JsonResult<ApiPagingResult<SabaVirtualPlayer>>> GetSabaVirtualPlayerList(SabaVirtualPlayerListMetaModel metaModel)
        {
            var result = await _playerService.GetSabaVirtualPlayerListAsync(metaModel);
            return JsonApi(result);
        }

        [HttpPost]
        [ApiFunctionAuthorization(PermissionKeys.SabaVirtualSetting)]
        [ValidationApiRequest(IsValidCurrencyList = true)]
        [ApiAutoBindMetaModel(BindAgent = true, ApplySubsidiaryBusiness = true, BindExportAll = true, BindLanguage = true)]
        public async Task<HttpResponseMessage> ExportSabaVirtualPlayerList(SabaVirtualPlayerListMetaModel metaModel)
        {
            metaModel.IsHideSaba = IsHideSaba;
            var dataSource = await _playerService.GetSabaVirtualPlayerListAsync(metaModel).ConfigureAwait(false);
            if (dataSource.Data.Any())
            {
                var fileName = metaModel.IsHideSaba ? "VirtualSetting.xls" : "SabaVirtualSetting.xls";
                var excel = new SabaVirtualSettingExcel(dataSource.Data, metaModel);
                excel.Export();

                var result = ExcelStream(excel.Workbook, fileName);
                return result;
            }

            return new HttpResponseMessage { StatusCode = System.Net.HttpStatusCode.NoContent };
        }
    }
}