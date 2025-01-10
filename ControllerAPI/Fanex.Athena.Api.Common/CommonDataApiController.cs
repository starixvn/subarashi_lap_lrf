namespace Fanex.Athena.Api.Common
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Http;
    using System.Web.Http.Controllers;
    using Base;
    using Base.Attributes;
    using DataAccess.Core.Common.Interfaces;
    using Extension.Utility.Interfaces;
    using Model.Auth.DataDomain;
    using Model.Core;
    using Model.Core.DTO.Common;
    using Model.Core.DTO.Configuration;
    using Model.Core.MetaModel.Common;
    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;
    using Service.StatelessCore.Interfaces;
    using Service.StatelessCore.Utility;
    using ServiceStack.Text;

    [CLSCompliant(false)]
    [XFrameOptionApi]
    [ApiUMFilter]
    public class CommonDataApiController : BaseApiController
    {
        private readonly IBetTypeService _betTypeService;
        private readonly ICustomMemoryCacheService _cacheService;
        private readonly ILanguageService _langService;

        private readonly ILeagueDataAccess _leagueDataAccess;

        private readonly IMatchService _matchService;
        private readonly IPortalApiService _portalApiService;

        private readonly IProductService _productService;

        private readonly ISessionService _sessionService;

        private readonly ISportService _sportService;

#pragma warning disable S107 // Methods should not have too many parameters

        public CommonDataApiController(
            ILanguageService langService,
            ISessionService sessionService,
            ILeagueDataAccess leagueDataAccess,
            IMatchService matchService,
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
            _matchService = matchService;
            _betTypeService = betTypeService;
            _portalApiService = portalApiService;
            _productService = productService;
            _sportService = sportService;
            _cacheService = cacheService;
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
                ? await _sportService.GetSportAndProductAndSabaSport(licenseeId, lang, IsHideSaba, productCode)
                : await _sportService.GetSportsAndProducts(licenseeId, lang, productCode);

            return sports.Where(x => x.ParentId > -1).Select(x => new { value = x.ID, label = x.Name, status = true });
        }

        [HttpGet]
        public async Task<IEnumerable<object>> GetSportsByProducts(string productCode)
        {
            if (string.IsNullOrWhiteSpace(productCode))
            {
                return new List<SportGame>();
            }

            return await _sportService.GetSportForProductAsync(_sessionService.LicenseeSession.LicenseeName, productCode);
        }

        [HttpGet]
        public async Task<IEnumerable<CheckedItem>> GetSportsForTreeView(string productCodes)
        {
            if (string.IsNullOrWhiteSpace(productCodes))
            {
                return new List<CheckedItem>();
            }

            return await _sportService.GetSportsForTreeView(
                _sessionService.LicenseeSession.LicenseeId,
                _sessionService.UserSession.Language,
                productCodes,
                IsHideSaba);
        }

        [HttpGet]
        public async Task<IEnumerable<object>> GetBetTypes(string productCode)
        {
            productCode = _productService.GetAllowedSubProductCodeList(
                _sessionService.LicenseeSession.OfferedSubProductList,
                productCode);

            var bettypes = await _betTypeService
                .GetBettypesByProduct(
                    _sessionService.LicenseeSession.LicenseeId,
                    productCode,
                    _sessionService.UserSession.Language,
                    IsHideSaba)
                .ConfigureAwait(false);

            return bettypes.Select(x => new { value = x.ID, label = x.Name, status = true });
        }

        [HttpGet]
        [CompressFilter(Order = 1)]
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

            JsConfig.ExcludeTypeInfo = true;
            var betTypeList = await _betTypeService
                .GetBetTypeForProducts(
                    _sessionService.LicenseeSession.LicenseeId,
                    _sessionService.UserSession.Language,
                    productCodes,
                    IsHideSaba);
            var jsonString = JsonSerializer.SerializeToString(betTypeList);
            _cacheService.Set(cacheKey, jsonString, cacheTime);
            return JsonNetResult(jsonString);
        }

        [HttpGet]
        public async Task<IEnumerable<object>> GetLeagues(DateTime fromDate, DateTime toDate, int sportId = 0)
        {
            var isSabaSport = sportId < 0;
            var sabaSports = _sportService.GetSabaSports();
            var selectedSabaSport = isSabaSport ? sabaSports.FirstOrDefault(s => s.Id == sportId) : null;
            var sportTypeId = isSabaSport ? selectedSabaSport?.SportTypeId : sportId;

            var userSession = _sessionService.UserSession;
            var isHideSaba = IsHideSaba;
            var metaModel = new LeagueMetaModel
            {
                FromDate = fromDate,
                ToDate = toDate,
                SportId = sportTypeId.GetValueOrDefault(),
                UserId = userSession.UserId,
                AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList)
            };

            var specialLeagues = await _portalApiService.GetSpecialLeaguesAsync(_sessionService.LicenseeSession.LicenseeName);
            var leagues = await _leagueDataAccess.GetLeaguesBySport(metaModel, specialLeagues).ConfigureAwait(false);

            var excludeSabaSport = sabaSports.Where(s => s.SportTypeId == sportId);

            var leagueList = isSabaSport
                ? GetSabaSportLeagueList(leagues, selectedSabaSport)
                : GetLeagueListExcludeSabaSport(leagues, excludeSabaSport);

            if (isHideSaba)
            {
                foreach (var league in leagueList)
                {
                    league.LeagueName = SabaHelper.RemoveSabaText(league.LeagueName);
                }
            }

            return leagueList.Select(x => new { value = x.LeagueId, label = x.LeagueName });
        }

        [HttpGet]
        public async Task<IEnumerable<object>> GetMatches(DateTime fromDate, DateTime toDate, int leagueid, int sportId = 0)
        {
            var isSabaSport = sportId < 0;
            var sabaSports = _sportService.GetSabaSports().ToList();
            var selectedSabaSport = isSabaSport ? sabaSports.FirstOrDefault(s => s.Id == sportId) : null;
            var sportTypeId = isSabaSport ? selectedSabaSport?.SportTypeId : sportId;
            var userSession = _sessionService.UserSession;

            var metaModel = new GetMatchMetaModel
            {
                FromDate = fromDate,
                ToDate = toDate,
                LeagueId = leagueid,
                SportId = sportTypeId.GetValueOrDefault(),
                AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList)
            };

            var matches = await _matchService.GetMatchesByLeagueAsync(metaModel).ConfigureAwait(false);

            var excludeSabaSport = sabaSports.Where(s => s.SportTypeId == sportId);

            return (isSabaSport ? GetSabaSportMatchList(matches, selectedSabaSport) : GetMatchListExcludeSabaSport(matches, excludeSabaSport))
                .Select(x => new { value = x.MatchId, label = x.MatchName });
        }

        protected override void Initialize(HttpControllerContext controllerContext)
        {
            base.Initialize(controllerContext);
            var currentLanguage = _langService.GetCurrentLanguage();
            _langService.SetPageCulture(currentLanguage);
        }

        private static IEnumerable<League> GetSabaSportLeagueList(IEnumerable<League> leagueList, SabaSport selectedSabaSport)
        {
            if (selectedSabaSport == null)
            {
                return leagueList;
            }

            return leagueList.Where(m => selectedSabaSport.LeagueGroupIds.Any(id => id == m.LeagueGroupId));
        }

        private static IEnumerable<League> GetLeagueListExcludeSabaSport(IEnumerable<League> leagueList, IEnumerable<SabaSport> excludeSabaSports)
        {
            if (excludeSabaSports == null || !excludeSabaSports.Any())
            {
                return leagueList;
            }

            var excludeLeagueGroupIds = excludeSabaSports.SelectMany(s => s.LeagueGroupIds).Distinct();
            return leagueList.Where(m => !excludeLeagueGroupIds.Any(id => id == m.LeagueGroupId));
        }

        private static IEnumerable<Match> GetSabaSportMatchList(IEnumerable<Match> matchList, SabaSport selectedSabaSport)
        {
            if (selectedSabaSport == null)
            {
                return matchList;
            }

            return matchList.Where(m => selectedSabaSport.LeagueGroupIds.Any(id => id == m.LeagueGroupId));
        }

        private static IEnumerable<Match> GetMatchListExcludeSabaSport(IEnumerable<Match> matchList, IEnumerable<SabaSport> excludeSabaSports)
        {
            if (excludeSabaSports == null || !excludeSabaSports.Any())
            {
                return matchList;
            }

            var excludeLeagueGroupIds = excludeSabaSports.SelectMany(s => s.LeagueGroupIds).Distinct();
            return matchList.Where(m => !excludeLeagueGroupIds.Any(id => id == m.LeagueGroupId));
        }
    }
}