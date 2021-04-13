using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Fanex.Athena.Api.StatelessBase;
using Fanex.Athena.Api.StatelessBase.Attributes;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Module.PlayerAdmin.Api.Attributes;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.ViewModels;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.StatelessCore.Utility;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Controllers
{
    [ApiOneAuthorization(AllowFunctionKeys = PermissionKeys.PlayerAdmin)]
    public class PlayerListController : ExternalApiBaseController
    {
        private readonly IPlayerListService playerListService;
        private readonly IPlayerSubsidiaryService playerSubsidiaryService;
        private readonly IOneAuthenticationService oneAuthenticationService;

        public PlayerListController(
            IPlayerListService playerListService,
            IPlayerSubsidiaryService playerSubsidiaryService,
            IOneAuthenticationService oneAuthenticationService)
        {
            this.playerListService = playerListService;
            this.playerSubsidiaryService = playerSubsidiaryService;
            this.oneAuthenticationService = oneAuthenticationService;
        }

        [HttpPost]
        [ApiPermissionOnData]
        [PlayerAdminAutoBindMetaModel]
        public PlayerListResultViewModel Search(PlayerSearchingMetaModel searchParam)
        {
            searchParam.AgentListXml = GetAgentListXml(searchParam);
            return playerListService.Search(searchParam);
        }

        [HttpPost]
        [ApiPermissionOnData]
        [PlayerAdminAutoBindMetaModel]
        public PlayerListResultViewModel GetPlayerListById(PlayerListByIdMetaModel metaModel)
        {
            metaModel.AgentListXml = GetAgentListXml(metaModel);
            return playerListService.GetPlayerListById(metaModel);
        }

        [AllowAnonymous]
        [HttpPost]
        [PlayerAdminAutoBindMetaModel]
        public LRFFiltersViewModel LRFFilters(LRFFiltersMetaModel metaModel)
        {
            List<CommGroupViewModel> commGroups = playerListService.GetAllCommGroups(metaModel.LicenseeId);
            commGroups.Insert(0, new CommGroupViewModel());

            var subsidiaryParam = CreateSubsidiaryParam(metaModel);

            var subsidiaries = playerSubsidiaryService.GetSubsidiaries(subsidiaryParam);
            var viewTypeParam = new GetSubsidiaryViewTypeMetaModel
            {
                UserLevel = subsidiaryParam.UserLevel,
                ViewType = subsidiaryParam.ViewType,
                WhiteLabelID = subsidiaryParam.WhiteLabelId,
                HasSubsidiary = subsidiaries.Any()
            };

            return new LRFFiltersViewModel
            {
                CustomerClass = playerListService.CustomerClass(SiteName),
                CommGroups = commGroups,
                Subsidiaries = playerSubsidiaryService.GetSubsidiaries(subsidiaryParam),
                SubsidiaryViewType = (byte)playerSubsidiaryService.GetSubsidiaryViewType(viewTypeParam),
                HasSpecialLevelWrite = HasWritePermission(metaModel, PermissionKeys.PlayerAdminUpdateSpecialLevel),
                HasOddsGroupWrite = HasWritePermission(metaModel, PermissionKeys.PlayerAdminUpdateOddsGroup)
            };
        }

        private GetSubsidiariesMetaModel CreateSubsidiaryParam(LRFFiltersMetaModel metaModel)
        {
            var tokenInfo = metaModel.Token;
            var userInfo = oneAuthenticationService.GetUserInfo(tokenInfo);
            var viewType = SubsidiaryManagementHelper.GetView(userInfo.IsEnabledSubsidiary, tokenInfo.IsMasterLicensee, userInfo.UserLevel, tokenInfo.WhiteLabelID);
            return new GetSubsidiariesMetaModel
            {
                LicenseeName = tokenInfo.SiteName,
                CurrencyAgentList = metaModel.GetCurrencyAgentListDict(),

                OperatorId = userInfo.OperatorID,
                WhiteLabelId = tokenInfo.WhiteLabelID,
                UserLevel = userInfo.UserLevel,
                ViewType = (byte)viewType
            };
        }

        private string GetAgentListXml(PlayerListBaseMetaModel metaModel)
        {
            if (!metaModel.SearchBySubsidiary)
            {
                return metaModel.AgentListXml;
            }

            var subsidiaryParam = CreateSubsidiaryParam(metaModel);
            var isSubsidiary = subsidiaryParam.UserLevel == UserLevelType.Subsidiary;
            if (isSubsidiary)
            {
                return metaModel.AgentListXml;
            }

            var agentIdListByCurrency = playerSubsidiaryService.GetCurrencyAgentList(subsidiaryParam, metaModel.Subsidiaries);
            var currencyIdList = metaModel.CurrencyIdList.Split(new[] { ',' }).Select(c => int.Parse(c)).ToList();
            var agentListXml = AuthParameterHelper.GenerateAgentListXml(agentIdListByCurrency, currencyIdList);

            return agentListXml;
        }

        private static bool HasWritePermission(LRFFiltersMetaModel metaModel, string permissionKey)
        {
            return metaModel.Token.IsAdminstrator
                || metaModel.Token.Permissions.Any(p => string.Equals(p.FunctionKey, permissionKey, StringComparison.OrdinalIgnoreCase)
                || (p.SubFunctionKeys != null && p.SubFunctionKeys.Contains(permissionKey)));
        }
    }
}
