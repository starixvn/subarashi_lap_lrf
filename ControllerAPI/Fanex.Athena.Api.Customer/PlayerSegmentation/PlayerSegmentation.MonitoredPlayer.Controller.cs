namespace Fanex.Athena.Api.Customer
{
    using System.Linq;
    using System.Net.Http;
    using System.Threading.Tasks;
    using System.Web.Http;
    using Fanex.Athena.Api.Base;
    using Fanex.Athena.Api.Base.Attributes;
    using Fanex.Athena.Excel.Customer;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.Service.StatelessCore.Utility;

    public partial class PlayerSegmentationController : BaseApiController
    {
        [HttpPost]
        [ApiFunctionAuthorization(PermissionKeys.MonitoredPlayer)]
        [ValidationApiRequest(IsValidCurrencyList = true)]
        [ApiAutoBindMetaModel(BindAgent = true, ApplySubsidiaryBusiness = true)]
        public async Task<IHttpActionResult> GetMonitoredPlayerList(MonitoredPlayerListMetaModel metaModel)
        {
            var result = await _playerService.GetMonitoredPlayerListAsync(metaModel);
            return JsonApi(result);
        }

        [HttpPost]
        [ApiFunctionAuthorization(PermissionKeys.MonitoredPlayer)]
        [ValidationApiRequest]
        public async Task<IHttpActionResult> GetMonitoredPlayerReachedHistory(MonitoredPlayerReachedHistoryMetaModel metaModel)
        {
            var result = await _playerService.GetMonitoredPlayerReachedHistoryAsync(metaModel);
            return JsonApi(result);
        }

        [HttpPost]
        [ApiFunctionAuthorization(PermissionKeys.MonitoredPlayer_Write)]
        [ValidationApiRequest]
        [ApiAutoBindMetaModel(BindAgent = true, BindUserId = true, BindIp = true)]
        public async Task<IHttpActionResult> InsertMonitoredPlayer(InsertMonitoredPlayerMetaModel metaModel)
        {
            var result = await _playerService.InsertMonitoredPlayerAsync(metaModel);
            return JsonApi(result);
        }

        [HttpPost]
        [ApiFunctionAuthorization(PermissionKeys.MonitoredPlayer_Write)]
        [ValidationApiRequest]
        [ApiAutoBindMetaModel(BindAgent = true, BindUserId = true, BindIp = true)]
        public async Task<IHttpActionResult> UpdateMonitoredPlayer(UpdateMonitoredPlayerMetaModel metaModel)
        {
            var result = await _playerService.UpdateMonitoredPlayerAsync(metaModel);
            return JsonApi(result);
        }

        [HttpPost]
        [ApiFunctionAuthorization(PermissionKeys.MonitoredPlayer_Write)]
        [ValidationApiRequest]
        [ApiAutoBindMetaModel(BindAgent = true, BindUserId = true, BindIp = true)]
        public async Task<IHttpActionResult> DeleteMonitoredPlayer(DeleteMonitoredPlayerMetaModel metaModel)
        {
            var result = await _playerService.DeleteMonitoredPlayerAsync(metaModel);
            return JsonApi(result);
        }

        [HttpPost]
        [ApiFunctionAuthorization(PermissionKeys.MonitoredPlayer_Write)]
        [ValidationApiRequest]
        [ApiAutoBindMetaModel(BindAgent = true, BindUserId = true, BindIp = true)]
        public async Task<IHttpActionResult> BatchUpdateMonitoredPlayer(BatchUpdateMonitoredPlayerMetaModel metaModel)
        {
            var result = await _playerService.BatchUpdateMonitoredPlayerAsync(metaModel);
            return JsonApi(result);
        }

        [HttpPost]
        [ApiFunctionAuthorization(PermissionKeys.MonitoredPlayer)]
        [ValidationApiRequest(IsValidCurrencyList = true)]
        [ApiAutoBindMetaModel(BindAgent = true, ApplySubsidiaryBusiness = true, BindExportAll = true)]
        public async Task<HttpResponseMessage> ExportMonitoredPlayerList(MonitoredPlayerListMetaModel metaModel)
        {
            var dataSource = await _playerService.GetMonitoredPlayerListAsync(metaModel);
            if (dataSource.Data.Any())
            {
                const string fileName = "ProblemPlayerList.xls";

                BindSelectedCurrencyCodes(metaModel);

                var excel = new MonitoredPlayerExcel(dataSource.Data, metaModel,
                    _authService.HasPermissions(SessionService.UserSession, PermissionKeys.PlayerProblemManagement),
                    _authService.HasPermissions(SessionService.UserSession, PermissionKeys.PlayerVIPManagement));
                excel.Export();

                var result = ExcelStream(excel.Workbook, fileName);
                return result;
            }

            return new HttpResponseMessage { StatusCode = System.Net.HttpStatusCode.NoContent };
        }

        [HttpPost]
        [ApiFunctionAuthorization(PermissionKeys.MonitoredPlayer)]
        [ValidationApiRequest]
        public async Task<HttpResponseMessage> ExportMonitoredPlayerReachedHistory(MonitoredPlayerReachedHistoryMetaModel metaModel)
        {
            var data = await _playerService.GetMonitoredPlayerReachedHistoryAsync(metaModel);
            if (data.Any())
            {
                const string fileName = "NotificationHistory.xls";

                var excel = new MonitoredPlayerReachedHistoryExcel(data, metaModel);
                excel.Export();

                var result = ExcelStream(excel.Workbook, fileName);
                return result;
            }

            return new HttpResponseMessage { StatusCode = System.Net.HttpStatusCode.NoContent };
        }

        private void BindSelectedCurrencyCodes(MonitoredPlayerListMetaModel metaModel)
        {
            var userCurrencyList = UserSession.CurrencyList;
            var selectedCurrencies = AuthParameterHelper.ParseCurrencyIdList(metaModel.CurrencyIdList);
            metaModel.SelectedCurrencyCodes = string.Join(", ", selectedCurrencies.Select(_ => userCurrencyList[_]));
        }
    }
}