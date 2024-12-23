namespace Fanex.Athena.Api.Customer
{
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Http;
    using Base;
    using Base.Attributes;
    using Model.Auth.DataDomain;
    using Model.Customer.MetaModel;

    public partial class PlayerSegmentationController : BaseApiController
    {
        [HttpPost]
        [ApiFunctionAuthorization(PermissionKeys.PlayerVIPManagement)]
        [ValidationApiRequest]
        [ApiAutoBindMetaModel(BindAgent = true, BindShowingBetFromIP = true)]
        public async Task<dynamic> AbnormalBets(AbnormalBetListMetaModel metaModel)
        {
            const string betlistApi = "/PlayerSegmentationBetList/AbnormalBets";

            BindAbnormalBetsMetaModel(metaModel);

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