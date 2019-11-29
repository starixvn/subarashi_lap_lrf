namespace Fanex.Athena.Module.Dashboard.Api
{
    using Fanex.Athena.Api.StatelessBase.Attributes;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Module.Dashboard.Data.Interfaces;
    using Fanex.Athena.Module.Dashboard.MetaModel;
    using System;
    using System.Threading.Tasks;
    using System.Web.Http;

    [ApiOneAuthorization(AllowFunctionKeys = PermissionKeys.DashboardTodayDeposit)]
    public class TodayDepositController : BaseDashboardApiController
    {
        private readonly ISingleValueDataAccess _dataAccess;

        public TodayDepositController(ISingleValueDataAccess dataAccess)
        {
            this._dataAccess = dataAccess;
        }

        [StatelessApiAutoBindMetaModel(BindAgent = true)]
        [StatelessApiRequestValidation(ResponseContent = "0")]
        public async Task<decimal> GetData([FromUri] DashboardBaseModel metaModel)
        {
            metaModel.FromDate = DateTime.Now.Date;
            return await _dataAccess.GetTodayDeposit(metaModel).ConfigureAwait(false);
        }
    }
}