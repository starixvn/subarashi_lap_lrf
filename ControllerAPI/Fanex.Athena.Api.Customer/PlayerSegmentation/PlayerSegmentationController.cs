namespace Fanex.Athena.Api.Customer
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Http;
    using System.Web.Http.Results;
    using Fanex.Athena.Api.Base;
    using Fanex.Athena.Api.Base.Attributes;
    using Fanex.Athena.DataAccess.Core.Common.Interfaces;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.Service.Core.Common.Interfaces;
    using Fanex.Athena.Service.Customer.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    [ApiFunctionAuthorization(PermissionKeys.PlayerSegmentation)]
    public partial class PlayerSegmentationController : BaseApiController
    {
        private const byte UploadByExternalId = 1;
        private const string VipPlayerUploadByExternalIdTemplate = "~/App_Data/Template/Customers/PlayerSegmentation/VipPlayerUploadByExternalIdTemplate.xls";
        private const string VipPlayerUploadBySystemIdTemplate = "~/App_Data/Template/Customers/PlayerSegmentation/VipPlayerUploadBySystemIdTemplate.xls";

        private const string MonitoredPlayerUploadByExternalIdTemplate = "~/App_Data/Template/Customers/PlayerSegmentation/MonitoredPlayerUploadByExternalIdTemplate.xls";
        private const string MonitoredPlayerUploadBySystemIdTemplate = "~/App_Data/Template/Customers/PlayerSegmentation/MonitoredPlayerUploadBySystemIdTemplate.xls";

        private readonly IAuthorizationService _authService;
        private readonly IPlayerSegmentationService _playerService;
        private readonly IBetListApiClient _betListApiClient;
        private readonly IProductDataAccess _productDataAccess;
        private readonly IAppSettings _appSettings;

        public PlayerSegmentationController(ILanguageService languageService,
            IAuthorizationService authService,
            IPlayerSegmentationService playerService,
            IProductDataAccess productDataAccess,
            IBetListApiClient betListApiClient,
            IAppSettings appSettings
            )
            : base(languageService)
        {
            _authService = authService;
            _playerService = playerService;
            _productDataAccess = productDataAccess;
            _betListApiClient = betListApiClient;
            _appSettings = appSettings;
        }

        [HttpPost]
        [ValidationApiRequest]
        [ApiAutoBindMetaModel(BindAgent = true, BindUserId = true, BindIp = true)]
        [ApiFunctionAuthorization(PermissionKeys.PlayerVIPManagement_Write)]
        public async Task<JsonResult<IEnumerable<UpdateStatusPlayerResult>>> UpdateVipStatus(UpdateStatusPlayerMetaModel metaModel)
        {
            metaModel.IsUseCtsApi = _appSettings.IsUseCtsApi;
            metaModel.SiteName = SessionService.LicenseeSession.LicenseeName;
            metaModel.LicenseeCustId = SessionService.LicenseeSession.LicenseeId;
            var result = await _playerService.UpdateVipStatusAsync(metaModel).ConfigureAwait(false);
            return JsonApi(result);
        }
    }
}