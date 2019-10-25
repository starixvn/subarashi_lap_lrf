using System.Web.Http;
using Fanex.Athena.Api.StatelessBase;
using Fanex.Athena.Api.StatelessBase.Attributes;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.ViewModels;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Controllers
{
    [ApiOneAuthorization(AllowFunctionKeys = PermissionKeys.PlayerAdmin)]
    public class PlayerListController : ExternalApiBaseController
    {
        private readonly IPlayerListService _playerListService;

        public PlayerListController(IPlayerListService playerListService)
        {
            _playerListService = playerListService;
        }

        [HttpPost]
        [ApiPermissionOnData]
        [StatelessApiAutoBindMetaModel(BindSiteName = true, BindAgent = true)]
        public PlayerListResultViewModel Search(PlayerSearchingMetaModel searchParam)
        {
            return _playerListService.Search(searchParam);
        }

        [HttpPost]
        [ApiPermissionOnData]
        [StatelessApiAutoBindMetaModel(BindSiteName = true, BindAgent = true)]
        public PlayerListResultViewModel GetPlayerListById(PlayerListByIdMetaModel metaModel)
        {
            metaModel.PageIndex = 1;

            return _playerListService.GetPlayerListById(metaModel);
        }
    }
}