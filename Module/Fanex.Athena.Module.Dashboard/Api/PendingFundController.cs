namespace Fanex.Athena.Module.Dashboard.Api
{
    using Fanex.Athena.Api.StatelessBase.Attributes;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Module.Dashboard.Data.Interfaces;
    using Fanex.Athena.Module.Dashboard.MetaModel;
    using System.Threading.Tasks;
    using System.Web.Http;

    [ApiOneAuthorization(AllowFunctionKeys = PermissionKeys.DashboardPendingFund)]
    public class PendingFundController : BaseDashboardApiController
    {
        private readonly ISingleValueDataAccess _dataAccess;

        public PendingFundController(ISingleValueDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        [StatelessApiAutoBindMetaModel(BindAgent = true)]
        [StatelessApiRequestValidation(ResponseContent = "0")]
        public async Task<decimal> GetData([FromUri] DashboardBaseModel metaModel)
        {

            return await _dataAccess.GetPendingFunds(metaModel).ConfigureAwait(false);
        }
    }
}