using Fanex.Athena.Api.StatelessBase;
using Fanex.Athena.Api.StatelessBase.Attributes;
using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.Core.ViewModel;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.Utilities;
using System.Web.Http;

namespace Fanex.Athena.Module.PlayerAdmin.Api
{
    [ApiOneAuthorization(AllowFunctionKeys = PermissionKeys.PlayerAdminUpdateBaStatus)]
    public class PlayerBaStatusController : ExternalApiBaseController
    {
        private readonly IPlayerBaStatusService _playerBaStatusService;

        public PlayerBaStatusController(IPlayerBaStatusService playerBaStatusService)
        {
            _playerBaStatusService = playerBaStatusService;
        }

        [HttpPost]
        [ApiPermissionOnData]
        [StatelessApiAutoBindMetaModel(BindSiteName = true, BindUserId = true, BindLanguage = true, BindIp = true)]
        public ResultViewModel Update(BaStatusUpdatingMetaModel metaModel)
        {
            return _playerBaStatusService.Update(metaModel);
        }

    }
}