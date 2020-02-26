namespace Fanex.Athena.Api.Customer
{
    using Fanex.Athena.Api.Base;
    using Fanex.Athena.Api.Base.Attributes;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
    using Fanex.Athena.Model.Customer.MetaModel;
    using System.Threading.Tasks;
    using System.Web.Http;
    using System.Web.Http.Results;

    [ApiFunctionAuthorization(PermissionKeys.CustomerInfoCustomerLog)]
    public partial class PlayerSegmentationController : BaseApiController
    {
        [HttpPost]
        [ValidationApiRequest]
        [ApiAutoBindMetaModel(BindAgent = true)]
        public async Task<JsonResult<ApiPagingResult<PlayerInfo>>> GetProblemPlayerList(ProblemPlayerListMetaModel metaModel)
        {
            var result = await _playerDataAccess.GetProblemPlayerListAsync(metaModel).ConfigureAwait(false);
            return JsonApi(result);
        }
    }
}