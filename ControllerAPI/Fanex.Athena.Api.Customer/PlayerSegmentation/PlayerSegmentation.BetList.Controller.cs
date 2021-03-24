namespace Fanex.Athena.Api.Customer
{
    using Fanex.Athena.Api.Base;
    using Fanex.Athena.Api.Base.Attributes;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Customer.MetaModel;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Http;

    public partial class PlayerSegmentationController : BaseApiController
    {
        [HttpPost]
        [ApiFunctionAuthorization(PermissionKeys.PlayerProblemManagement, PermissionKeys.PlayerVIPManagement)]
        [ValidationApiRequest]
        [ApiAutoBindMetaModel(BindAgent = true)]
        public async Task<dynamic> AbnormalBets(AbnormalBetListMetaModel metaModel)
        {
            const string betlistApi = "/PlayerSegmentationBetList/AbnormalBets";

            BindAbnormalBetsMetaModel(metaModel);

            metaModel.IsShowIpvn = SessionService.UserSession.IsShowIpvn;

            var result = await _betListApiClient.PostAsync(
                    betlistApi,
                    metaModel,
                    SessionService.UserSession.Language).ConfigureAwait(false);

            return result;
        }

        private void BindAbnormalBetsMetaModel(AbnormalBetListMetaModel metaModel)
        {
            metaModel.IsAllowedCustomerComm = SessionService.LicenseeSession.IsAllowedCustomerComm;

            var listProduct = _productDataAccess.GetProductAccessList(SessionService.LicenseeSession.LicenseeId);
            metaModel.ListProductCode = listProduct.Select(_ => _.ProductCode);
        }
    }
}