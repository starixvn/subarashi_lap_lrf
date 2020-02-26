namespace Fanex.Athena.Api.Customer
{
    using Fanex.Athena.Api.Base;
    using Fanex.Athena.Api.Base.Attributes;
    using Fanex.Athena.DataAccess.Customer.Interfaces;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.Service.Core.Common.Interfaces;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Http;
    using System.Web.Http.Results;

    [ApiFunctionAuthorization(PermissionKeys.CustomerInfoCustomerLog)]
    public partial class PlayerSegmentationController : BaseApiController
    {
        private readonly IPlayerSegmentationDataAccess _playerDataAccess;

        public PlayerSegmentationController(ILanguageService languageService, IPlayerSegmentationDataAccess playerDataAccess)
            : base(languageService)
        {
            _playerDataAccess = playerDataAccess;
        }

        [HttpPost]
        [ValidationApiRequest]
        [ApiAutoBindMetaModel(BindAgent = true, BindUserId = true, BindIp = true)]
        public async Task<JsonResult<IEnumerable<UpdateStatusPlayerResult>>> UpdateVipStatus(UpdateStatusPlayerMetaModel metaModel)
        {
            var result = await _playerDataAccess.UpdateVipStatusAsync(metaModel).ConfigureAwait(false);
            return JsonApi(result);
        }
    }
}