using System.Web.Http;
using Fanex.Athena.Api.StatelessBase;
using Fanex.Athena.Api.StatelessBase.Attributes;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.ViewModel;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Controllers
{
    [ApiOneAuthorization(AllowFunctionKeys = PermissionKeys.PlayerAdminUpdateBaStatus)]
    [ApiProductPermission(ProductTypes.BA)]
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