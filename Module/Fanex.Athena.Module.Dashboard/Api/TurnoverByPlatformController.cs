namespace Fanex.Athena.Module.Dashboard.Api
{
    using System;
    using System.Threading.Tasks;
    using System.Web.Http;
    using Fanex.Athena.Api.StatelessBase.Attributes;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Module.Dashboard.Data.Interfaces;
    using Fanex.Athena.Module.Dashboard.MetaModel;
    using Fanex.Athena.Module.Dashboard.ViewModel;

    [ApiOneAuthorization(AllowFunctionKeys = PermissionKeys.DashboardTurnoverByPlatform)]
    public class TurnoverByPlatformController : BaseDashboardApiController
    {
        private readonly ILicenseeDataByPlatformDataAccess _dataAccess;

        public TurnoverByPlatformController(ILicenseeDataByPlatformDataAccess licenseeDataByPlatformService)
        {
            this._dataAccess = licenseeDataByPlatformService;
        }

        [HttpGet]
        [StatelessApiAutoBindMetaModel(BindAgent = true)]
        [StatelessApiRequestValidation(ResponseContent = DefaultWidgetResult)]
        public async Task<WidgetByPlatformViewModel> GetData([FromUri] DashboardBaseModel metaModel)
        {
            var now = DateTime.Now.Date;
            metaModel.FromDate = new DateTime(now.Year, now.Month, 1);
            metaModel.ToDate = now;
            return await _dataAccess.GetTurnover(metaModel).ConfigureAwait(false);
        }
    }
}