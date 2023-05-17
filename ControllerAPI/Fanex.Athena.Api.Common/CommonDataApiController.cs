namespace Fanex.Athena.Api.Base
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Caching;
    using System.Web.Http;

    using DataAccess.Core.Common.Interfaces;
    using Fanex.Athena.Api.Base.Attributes;
    using Fanex.Athena.Extension.Utility.Interfaces;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.DTO.Configuration;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Utility;

    using Model.Core.MetaModel.Common;
    using Newtonsoft.Json;
    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    using Web.ActionFilter;

    [CLSCompliant(false)]
    [XFrameOptionApi]
    [FunctionAuthorization(PermissionKeys.BettingTicketCenter)]
    [ApiUMFilter]
    public class CommonDataApiController : BaseApiController
    {
        private readonly ILanguageService _langService;

        private readonly ISportService _sportService;

        private readonly ISessionService _sessionService;

        private readonly ILeagueDataAccess _leagueDataAccess;

        private readonly IMatchDataAccess _matchDataAccess;

        private readonly IBetTypeService _betTypeService;
        private readonly IPortalApiService _portalApiService;

        private readonly IProductService _productService;
        private readonly ICustomMemoryCacheService _cacheService;

#pragma warning disable S107 // Methods should not have too many parameters

        public CommonDataApiController(
            ILanguageService langService,
            ISessionService sessionService,
            ILeagueDataAccess leagueDataAccess,
            IMatchDataAccess matchDataAccess,
            IBetTypeService betTypeService,
            IPortalApiService portalApiService,
            IProductService productService,
            ISportService sportService,
            ICustomMemoryCacheService cacheService)
            : base(langService)
#pragma warning restore S107 // Methods should not have too many parameters
        {
            _langService = langService;
            _sessionService = sessionService;
            _leagueDataAccess = leagueDataAccess;
            _matchDataAccess = matchDataAccess;
            _betTypeService = betTypeService;
            _portalApiService = portalApiService;
            _productService = productService;
            _sportService = sportService;
            _cacheService = cacheService;
        }

        protected override void Initialize(System.Web.Http.Controllers.HttpControllerContext controllerContext)
        {
            base.Initialize(controllerContext);
            var currentLanguage = _langService.GetCurrentLanguage();
            _langService.SetPageCulture(currentLanguage);
        }

        [HttpGet]
        public async Task<IEnumerable<object>> GetSports(string productCode, bool includeSabaSport = false)
        {
            productCode = _productService.GetAllowedSubProductCodeList(
                _sessionService.LicenseeSession.OfferedSubProductList,
                productCode);

            var licenseeId = _sessionService.LicenseeSession.LicenseeId;
            var lang = _sessionService.UserSession.Language;

            var sports = includeSabaSport
                ? await _sportService.GetSportAndProductAndSabaSport(licenseeId, lang, productCode)
                : await _sportService.GetSportsAndProducts(licenseeId, lang, productCode);

            return sports.Where(x => x.ParentId > -1).Select(x => new { value = x.ID, label = x.Name, status = true });
        }

        [HttpGet]
        public async Task<IEnumerable<object>> GetSportsByProducts(string productCode)
        {
            if (String.IsNullOrWhiteSpace(productCode))
            {
                return new List<SportGame>();
            }
            return await _sportService.GetSportForProductAsync(_sessionService.LicenseeSession.LicenseeName, productCode);
        }

        [HttpGet]
        public async Task<IEnumerable<CheckedItem>> GetSportsForTreeView(string productCodes)
        {
            if (String.IsNullOrWhiteSpace(productCodes))
            {
                return new List<CheckedItem>();
            }
            return await _sportService.GetSportsForTreeView(_sessionService.LicenseeSession.LicenseeId, _sessionService.UserSession.Language, productCodes);
        }

        [HttpGet]
        public async Task<IEnumerable<object>> GetBetTypes(string productCode)
        {
            productCode = _productService.GetAllowedSubProductCodeList(
                _sessionService.LicenseeSession.OfferedSubProductList,
                productCode);

            var bettypes = await _betTypeService.GetBettypesByProduct(
                _sessionService.LicenseeSession.LicenseeId,
                productCode,
                _sessionService.UserSession.Language).ConfigureAwait(false);

            return bettypes.Select(x => new { value = x.ID, label = x.Name, status = true });
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetBetTypeInTreeList(string productCodes)
        {
            const int cacheTime = 60 * 60 * 12; //12 hour
            var cacheKey = $"{CacheKey.MemorycacheBetTypeForTreeView}_{productCodes}_{LicenseeSession.LicenseeName}_{SessionService.UserSession.Language}";
            var jsonBetType = _cacheService.Get<string>(cacheKey);
            if (!string.IsNullOrWhiteSpace(jsonBetType))
            {
                return JsonNetResult(jsonBetType);
            }

            if (string.IsNullOrEmpty(productCodes))
            {
                return JsonNetResult(new List<CheckedItem>());
            }
            var betTypeList = await _betTypeService.GetBetTypeForProducts(_sessionService.LicenseeSession.LicenseeId, _sessionService.UserSession.Language, productCodes);
            var jsonString = JsonConvert.SerializeObject(betTypeList, PascalCassJsonSetting);
            _cacheService.Set(cacheKey, jsonString, cacheTime);
            return JsonNetResult(jsonString);
        }

        [HttpGet]
        public async Task<IEnumerable<object>> GetLeagues(DateTime fromDate, DateTime toDate, int sportId = 0)
        {
            var userSession = _sessionService.UserSession;
            var metaModel = new LeagueMetaModel
            {
                FromDate = fromDate,
                ToDate = toDate,
                SportId = sportId,
                UserId = userSession.UserId,
                AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList)
            };

            var specialLeagues = await _portalApiService.GetSpecialLeaguesAsync(_sessionService.LicenseeSession.LicenseeName);
            var leagues = await _leagueDataAccess.GetLeaguesBySport(metaModel, specialLeagues).ConfigureAwait(false);

            return leagues.Select(x => new { value = x.LeagueId, label = x.LeagueName });
        }

        [HttpGet]
        public async Task<IEnumerable<object>> GetMatches(DateTime fromDate, DateTime toDate, int leagueid, int sportId = 0)
        {
            var matches = await _matchDataAccess.GetMatchesByLeague(leagueid, fromDate, toDate, sportId).ConfigureAwait(false);

            return matches.Select(x => new { value = x.MatchId, label = x.MatchName });
        }
    }
}