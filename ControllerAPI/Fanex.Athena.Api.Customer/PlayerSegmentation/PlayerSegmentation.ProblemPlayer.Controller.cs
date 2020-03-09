namespace Fanex.Athena.Api.Customer
{
    using Fanex.Athena.Api.Base;
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

    public partial class PlayerSegmentationController : BaseApiController
    {
        [HttpPost]
        [ApiFunctionAuthorization(PermissionKeys.PlayerProblemManagement)]
        [ValidationApiRequest(IsValidCurrencyList = true)]
        [ApiAutoBindMetaModel(BindAgent = true)]
        public async Task<JsonResult<ApiPagingResult<PlayerInfo>>> GetProblemPlayerList(ProblemPlayerListMetaModel metaModel)
        {
            var result = await _playerDataAccess.GetProblemPlayerListAsync(metaModel).ConfigureAwait(false);
            return JsonApi(result);
        }

        [HttpPost]
        [ApiFunctionAuthorization(PermissionKeys.PlayerProblemManagement)]
        [ValidationApiRequest(IsValidCurrencyList = true)]
        [ApiAutoBindMetaModel(BindAgent = true)]
        public async Task<HttpResponseMessage> ExportProblemPlayerList(ProblemPlayerListMetaModel metaModel)
        {
            if (metaModel.IsValid)
            {
                var userSession = SessionService.UserSession;
                var haveVIPPermission = _authService.HasPermissions(userSession, PermissionKeys.PlayerVIPManagement);

                metaModel.PageIndex = 1;
                metaModel.PageSize = int.MaxValue - 1000;

                var dataSource = await _playerDataAccess.GetProblemPlayerListAsync(metaModel).ConfigureAwait(false);
                if (dataSource.Data.Any())
                {
                    const string fileName = "ProblemPlayerList.xls";
                    var excel = new ProblemPlayerExcel(dataSource.Data, haveVIPPermission);
                    excel.Export();

                    var result = ExcelStream(excel.Workbook, fileName);
                    return result;
                }
            }

            return new HttpResponseMessage { StatusCode = System.Net.HttpStatusCode.NoContent };
        }
    }
}