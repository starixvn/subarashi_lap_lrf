using Fanex.Athena.Api.Base.Attributes;
using Fanex.Athena.Api.StatelessBase;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.ViewModel;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.Utilities;

using System.Web.Http;

namespace Fanex.Athena.Module.PlayerAdmin.Api
{
    [ApiOneAuthorization]
    public class PlayerBaStatusController : ExternalApiBaseController
    {
        private readonly IPlayerBaStatusService _playerBaStatusService;

        public PlayerBaStatusController(IPlayerBaStatusService playerBaStatusService)
        {
            _playerBaStatusService = playerBaStatusService;
        }

        [HttpPost]
        [ApiOneAuthorization(AllowFunctionKeys = PermissionKeys.CustomerInfoSpecialBA)]
        public ResultViewModel Update(BaStatusUpdatingMetaModel metaModel)
        {
            AssignCommonProperties(metaModel);

            return _playerBaStatusService.Update(metaModel);
        }

        private void AssignCommonProperties(PlayerUpdatingBaseMetaModel param)
        {
            param.LicenseeId = LicenseeId;
            param.UserId = UserId;
            param.Language = UpdatingUtils.GetLanguageCode(Language);
            param.Ip = ClientHelper.GetClientIpAddress(Request);
        }
    }
}