using System.Collections.Generic;
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
        private readonly IPlayerListService playerListService;

        public PlayerListController(IPlayerListService playerListService)
        {
            this.playerListService = playerListService;
        }

        [HttpPost]
        [ApiPermissionOnData]
        [StatelessApiAutoBindMetaModel(BindSiteName = true, BindAgent = true)]
        public PlayerListResultViewModel Search(PlayerSearchingMetaModel searchParam)
        {
            return playerListService.Search(searchParam);
        }

        [HttpPost]
        [ApiPermissionOnData]
        [StatelessApiAutoBindMetaModel(BindSiteName = true, BindAgent = true)]
        public PlayerListResultViewModel GetPlayerListById(PlayerListByIdMetaModel metaModel)
        {
            metaModel.PageIndex = 1;

            return playerListService.GetPlayerListById(metaModel);
        }

        [HttpPost]
        [StatelessApiAutoBindMetaModel(BindLicenseeinfo = true)]
        public LRFFiltersViewModel LRFFilters(LRFFiltersMetaModel metaModel)
        {
            List<CommGroupViewModel> commGroups = playerListService.GetAllCommGroups(metaModel.LicenseeId);
            commGroups.Insert(0, new CommGroupViewModel());

            return new LRFFiltersViewModel
            {
                CustomerClass = playerListService.CustomerClass(SiteName),
                CommGroups = commGroups
            };
        }
    }
}
