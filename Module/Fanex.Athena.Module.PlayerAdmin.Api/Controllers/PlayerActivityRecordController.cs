using System.Web.Http;
using Fanex.Athena.Api.StatelessBase;
using Fanex.Athena.Api.StatelessBase.Attributes;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Module.PlayerAdmin.Api.DTO;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Controllers
{
    [ApiOneAuthorization(AllowFunctionKeys = PermissionKeys.AccountInfo)]
    public class PlayerActivityRecordController : ExternalApiBaseController
    {
        private readonly IPlayerActivityRecordService _playerActivityRecordService;

        public PlayerActivityRecordController(IPlayerActivityRecordService playerActivityRecordService)
        {
            _playerActivityRecordService = playerActivityRecordService;
        }

        [HttpPost]
        [StatelessApiAutoBindMetaModel(BindSiteName = true)]
        public PlayerActivityRecord Index(PlayerActivityRecordMetaModel metaModel)
        {
            if (metaModel.IbcCustId <= 0)
            {
                return null;
            }

            return _playerActivityRecordService.GetActivityRecord(metaModel);
        }
    }
}