namespace Fanex.Athena.Api.Customer
{
    using Fanex.Athena.Api.Base;
    using Fanex.Athena.Api.Base.Attributes;
    using Fanex.Athena.DataAccess.Customer.Interfaces;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.Service.Core.Common.Interfaces;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Http;
    using System.Web.Http.Results;

    [ApiFunctionAuthorization(PermissionKeys.PlayerSegmentation)]
    public partial class PlayerSegmentationController : BaseApiController
    {
        private readonly IPlayerSegmentationDataAccess _playerDataAccess;
        private readonly IAuthorizationService _authService;
        private readonly ISubsidiaryService _subsidiaryService;

        public PlayerSegmentationController(ILanguageService languageService,
            IPlayerSegmentationDataAccess playerDataAccess,
            IAuthorizationService authService,
            ISubsidiaryService subsidiaryService
            )
            : base(languageService)
        {
            _playerDataAccess = playerDataAccess;
            _authService = authService;
            _subsidiaryService = subsidiaryService;
        }

        protected UserAuthInfo CurrentUser => SessionService.UserSession;
        protected LicenseeAuthInfo CurrentLicensee => SessionService.LicenseeSession;

        [HttpPost]
        [ValidationApiRequest]
        [ApiAutoBindMetaModel(BindAgent = true, BindUserId = true, BindIp = true)]
        [ApiFunctionAuthorization(PermissionKeys.PlayerVIPManagement)]
        public async Task<JsonResult<IEnumerable<UpdateStatusPlayerResult>>> UpdateVipStatus(UpdateStatusPlayerMetaModel metaModel)
        {
            var result = await _playerDataAccess.UpdateVipStatusAsync(metaModel).ConfigureAwait(false);
            return JsonApi(result);
        }

        private void BindAgentListBySubsidiaryBiz(BasePlayerListMetaModel metaModel)
        {
            if (CurrentUser.UserLevel == UserLevelType.Subsidiary
                || CurrentUser.SubsidiaryViewType == (byte)SubsidiaryViewType.NotManagement
                || string.IsNullOrWhiteSpace(metaModel.SubsidiaryList))
            {
                return;
            }

            metaModel.AgentListXml = _subsidiaryService.GenerateAgentList(
                CurrentUser,
                CurrentLicensee.LicenseeName,
                metaModel.SubsidiaryList,
                metaModel.CurrencyIdList);
        }
    }
}