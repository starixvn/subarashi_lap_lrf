namespace Fanex.Athena.VendorAdapter
{
    using System;
    using System.Globalization;
    using System.Linq;
    using System.Threading;
    using Interfaces;
    using Model.Core.DataDomain;
    using Model.Core.DTO.Common;
    using RemotingRef;
    using Resources;

    public class CacheRefAdapter : ICacheRefAdapter
    {
        private static readonly string[] SabaBetTypeMap =
        {
            "228",
            "229"
        };

        private readonly Lazy<IRemotingRefService> _remotingRefService = new Lazy<IRemotingRefService>(() => new RemotingRefService());

        public static CacheRefAdapter Instance { get; } = new CacheRefAdapter();

#pragma warning disable CS3003 // Type is not CLS-compliant

        public IRemotingRefService RemotingRefService => _remotingRefService.Value;
#pragma warning restore CS3003 // Type is not CLS-compliant

        public string GetBettype(object bettypeId)
        {
            if (!IsValidId(bettypeId))
            {
                return string.Empty;
            }

            return RemotingRefService.GetBetTypeName(bettypeId.ToString(), GetCurrentIBCLanguageCode());
        }

        /// <summary>
        ///     Get bet type text by bet type and live indicator.
        /// </summary>
        /// <param name="betType">Bet type value.</param>
        /// <param name="liveIndicator">Live or NonLive.</param>
        /// <returns>Bet type text.</returns>
        public string GetBettype(int betType, bool liveIndicator)
        {
            const int SBMinOfMaxBettype = 120;
            if (betType == 0)
            {
                return string.Empty;
            }

            var betTypeName = RemotingRefService.GetBetTypeName(betType.ToString(CultureInfo.InvariantCulture), GetCurrentIBCLanguageCode());

            if (betType == (int)BetType.NgNumberGroup)
            {
                betTypeName += liveIndicator ? " (" + ViewResources.LiveGame + ")" : " (" + ViewResources.PreGame + ")";
                return betTypeName;
            }

            if (betType >= (int)BetType.NG1StBallOU && betType < SBMinOfMaxBettype)
            {
                return GetNumberGameBettypeName(betType, liveIndicator, betTypeName);
            }

            return betTypeName;
        }

        public string GetSportName(object sportId, string languageCode = null)
        {
            if (!IsValidId(sportId))
            {
                return string.Empty;
            }

            return RemotingRefService.GetSportName(sportId.ToString(), GetCurrentIBCLanguageCode(languageCode), string.Empty);
        }

        public string GetTeamName(object teamId)
        {
            if (!IsValidId(teamId))
            {
                return string.Empty;
            }

            return RemotingRefService.GetTeamName(teamId.ToString(), GetCurrentIBCLanguageCode(), string.Empty);
        }

        public string GetLeague3rdName(object leagueId)
        {
            if (!IsValidId(leagueId))
            {
                return string.Empty;
            }

            return RemotingRefService.GetLeagueName3rd(leagueId.ToString(), GetCurrentIBCLanguageCode(), string.Empty);
        }

        public string GetBetTypeName(object bettypeId, string languageCode, bool isHideSaba)
        {
            if (!IsValidId(bettypeId))
            {
                return string.Empty;
            }

            if (isHideSaba && SabaBetTypeMap.Contains(bettypeId.ToString()))
            {
                return ViewResources.ResourceManager.GetString($"BetType_{bettypeId}");
            }

            return RemotingRefService.GetBetTypeName(bettypeId.ToString(), languageCode);
        }

        public string GetBettypeWithProductName(int betType, string productCode = "", bool liveIndicator = false)
        {
            var betTypeName = GetBettype(betType, liveIndicator);

            if (productCode == Product.VS)
            {
                return betTypeName + " (" + ViewResources.ProductVS + ")";
            }

            return betTypeName;
        }

        public string[] GetCombinationTypeCombo(string betTeam, string betCheck, decimal handicap1, decimal handicap2)
        {
            return RemotingRefService.GetCombinationTypeCombo(
                betTeam,
                betCheck,
                Convert.ToInt32(handicap1),
                Convert.ToInt32(handicap2),
                GetCurrentIBCLanguageCode());
        }

        public string GetDummySportName(object sportId, string languageCode = null)
        {
            if (!IsValidId(sportId))
            {
                return string.Empty;
            }

            return RemotingRefService.GetResourceDataByRefIdAndResourceId(
                "DummySport",
                sportId.ToString(),
                GetCurrentIBCLanguageCode(languageCode),
                string.Empty);
        }

        public string GetLeagueName(object leagueId, string langCode = null)
        {
            if (!IsValidId(leagueId))
            {
                return string.Empty;
            }

            return RemotingRefService.GetLeagueName(leagueId.ToString(), GetCurrentIBCLanguageCode(langCode), string.Empty);
        }

        private static string GetNumberGameBettypeName(int betType, bool liveIndicator, string betTypeName)
        {
            if ((betType == (int)BetType.NgOuFt || betType == (int)BetType.NgOeFt) && liveIndicator)
            {
                return ViewResources.Next + " " + betTypeName;
            }

            if (betType == (int)BetType.NgOeFt)
            {
                return ViewResources.FT + " " + betTypeName;
            }

            return betTypeName;
        }

        private static bool IsValidId(object id)
        {
            return id != null && id.ToString() != string.Empty && id.ToString() != "0";
        }

        private static string GetCurrentIBCLanguageCode(string languageCode = null)
        {
            return string.IsNullOrEmpty(languageCode) ? Thread.CurrentThread.CurrentUICulture.IetfLanguageTag : languageCode;
        }
    }
}