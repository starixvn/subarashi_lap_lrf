using System;
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
    public class PlayerBettingStatisticsController : ExternalApiBaseController
    {
        private readonly IPlayerBettingStatisticsService _playerBettingStatisticsService;

        public PlayerBettingStatisticsController(IPlayerBettingStatisticsService playerBettingStatisticsService)
        {
            _playerBettingStatisticsService = playerBettingStatisticsService;
        }

        [HttpPost]
        [ApiPermissionOnData(isObject: true)]
        [StatelessApiAutoBindMetaModel(BindBalanceUpAndMoveBetDay = true)]
        public PlayerBettingStatistics GetData(PlayerBettingStatisticsMetaModel metaModel)
        {
            var now = DateTime.Now;
            metaModel.FromDate = new DateTime(now.Year, now.Month, 1);
            metaModel.ToDate = now;

            return _playerBettingStatisticsService.GetPlayerBettingStatistics(metaModel);
        }
    }
}