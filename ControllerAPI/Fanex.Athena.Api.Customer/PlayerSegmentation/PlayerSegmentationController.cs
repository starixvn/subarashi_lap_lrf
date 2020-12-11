namespace Fanex.Athena.Api.Customer
{
    using Fanex.Athena.Api.Base;
    using Fanex.Athena.Api.Base.Attributes;
    using Fanex.Athena.DataAccess.Core.Common.Interfaces;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.Service.Core.Common.Interfaces;
    using Fanex.Athena.Service.Customer.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Http;
    using System.Web.Http.Results;

    [ApiFunctionAuthorization(PermissionKeys.PlayerSegmentation)]
    public partial class PlayerSegmentationController : BaseApiController
    {
        private readonly IAuthorizationService _authService;
        private readonly IPlayerSegmentationService _playerService;
        private readonly IBetListApiClient _betListApiClient;
        private readonly IProductDataAccess _productDataAccess;

        public PlayerSegmentationController(ILanguageService languageService,
            IAuthorizationService authService,
            IPlayerSegmentationService playerService,
            IProductDataAccess productDataAccess,
            IBetListApiClient betListApiClient
            )
            : base(languageService)
        {
            _authService = authService;
            _playerService = playerService;
            _productDataAccess = productDataAccess;
            _betListApiClient = betListApiClient;
        }

        [HttpPost]
        [ValidationApiRequest]
        [ApiAutoBindMetaModel(BindAgent = true, BindUserId = true, BindIp = true)]
        [ApiFunctionAuthorization(PermissionKeys.PlayerVIPManagement)]
        public async Task<JsonResult<IEnumerable<UpdateStatusPlayerResult>>> UpdateVipStatus(UpdateStatusPlayerMetaModel metaModel)
        {
            var result = await _playerService.UpdateVipStatusAsync(metaModel).ConfigureAwait(false);
            return JsonApi(result);
        }
    }
}