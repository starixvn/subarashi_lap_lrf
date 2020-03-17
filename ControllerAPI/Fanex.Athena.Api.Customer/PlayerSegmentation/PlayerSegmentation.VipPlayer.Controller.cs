namespace Fanex.Athena.Api.Customer
{
    using Fanex.Athena.Api.Base.Attributes;
    using Fanex.Athena.Excel.Customer;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
    using Fanex.Athena.Model.Customer.MetaModel;
    using System.Linq;
    using System.Net.Http;
    using System.Threading.Tasks;
    using System.Web.Http;
    using System.Web.Http.Results;

    public partial class PlayerSegmentationController
    {
        [HttpPost]
        [ApiFunctionAuthorization(PermissionKeys.PlayerVIPManagement)]
        [ValidationApiRequest(IsValidCurrencyList = true)]
        [ApiAutoBindMetaModel(BindAgent = true)]
        public async Task<JsonResult<ApiPagingResult<PlayerInfo>>> GetVipPlayerList(VipPlayerListMetaModel metaModel)
        {
            var result = await _playerDataAccess.GetVipPlayerListAsync(metaModel).ConfigureAwait(false);
            return JsonApi(result);
        }

        [HttpPost]
        [ApiFunctionAuthorization(PermissionKeys.PlayerVIPManagement)]
        [ValidationApiRequest(IsValidCurrencyList = true)]
        [ApiAutoBindMetaModel(BindAgent = true)]
        public async Task<HttpResponseMessage> ExportVipPlayerList(VipPlayerListMetaModel metaModel)
        {
            var dataSource = await _playerDataAccess.GetVipPlayerListAsync(metaModel).ConfigureAwait(false);

            if (dataSource.Data.Any())
            {
                const string fileName = "VipPlayerList.xls";
                var excel = new VipPlayerExcel(dataSource.Data);
                excel.Export();

                var result = ExcelStream(excel.Workbook, fileName);
                return result;
            }

            return new HttpResponseMessage { StatusCode = System.Net.HttpStatusCode.NoContent };
        }
    }
}