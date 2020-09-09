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
        [ApiFunctionAuthorization(PermissionKeys.PlayerProblemManagement)]
        [ValidationApiRequest(IsValidCurrencyList = true)]
        [ApiAutoBindMetaModel(BindAgent = true, BindLanguage = true)]
        public async Task<JsonResult<ApiPagingResult<PlayerInfo>>> GetProblemPlayerList(ProblemPlayerListMetaModel metaModel)
        {
            var result = await _playerService.GetProblemPlayerListAsync(metaModel);
            return JsonApi(result);
        }

        [HttpPost]
        [ApiFunctionAuthorization(PermissionKeys.PlayerProblemManagement)]
        [ValidationApiRequest(IsValidCurrencyList = true)]
        [ApiAutoBindMetaModel(BindAgent = true, BindExportAll = true, BindLanguage = true)]
        public async Task<HttpResponseMessage> ExportProblemPlayerList(ProblemPlayerListMetaModel metaModel)
        {
            var hasVIPPermission = _authService.HasPermissions(SessionService.UserSession, PermissionKeys.PlayerVIPManagement);
            var isNormalView = _playerService.IsNormalView(metaModel);
            var dataSource = await _playerService.GetProblemPlayerListAsync(metaModel).ConfigureAwait(false);
            if (dataSource.Data.Any())
            {
                const string fileName = "ProblemPlayerList.xls";
                var excel = new ProblemPlayerExcel(dataSource.Data, metaModel.BaseCurrency, isNormalView, hasVIPPermission);
                excel.Export();

                var result = ExcelStream(excel.Workbook, fileName);
                return result;
            }

            return new HttpResponseMessage { StatusCode = System.Net.HttpStatusCode.NoContent };
        }
    }
}
