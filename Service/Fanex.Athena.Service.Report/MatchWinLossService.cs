// -----------------------------------------------------------------------
// <copyright file="MatchWinLossService.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Service.Report
{
    using System.Collections.Generic;
    using System.Data;
    using System.Globalization;
    using System.Linq;
    using System.Threading.Tasks;

    using DataAccess.Report.Interfaces;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.Helper;
    using Fanex.Athena.Model.Report.DTO;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Service.Report.Interfaces;

    using Model.Core.DataDomain;

    using Resources;

    using VendorAdapter.Interfaces;

    public class MatchWinLossService : IMatchWinLossService
    {
        private const string KickOfTimeFormat = "{0:MM/dd/yyyy hh:mm:ss tt}";

        private static readonly CultureInfo EnglishCulture = new CultureInfo("en-US");

        private readonly IMatchWinLossDataAccess _matchWinLossDataAccess;

        private readonly ICacheRefAdapter _cacheRefAdapter;

        public MatchWinLossService(IMatchWinLossDataAccess matchWinLossDataAccess, ICacheRefAdapter cacheRefAdapter)
        {
            this._matchWinLossDataAccess = matchWinLossDataAccess;
            _cacheRefAdapter = cacheRefAdapter;
        }

        #region IMatchWinLossService Members

        public async Task<IList<MatchWinLoss>> GetDataList(MatchWinLossMetaModel metaModel)
        {
            var dataList = await _matchWinLossDataAccess.GetDataList(metaModel).ConfigureAwait(false);

            foreach (var data in dataList)
            {
                data.LeagueName = GetLeagueName(data);
                data.MatchName = GetMatchName(data);
                data.HomeName = GetHomeName(data);
                data.AwayName = GetAwayName(data);
            }

            return OrderByProduct(dataList);
        }

        public async Task<DataSet> GetDetailDataSet(MatchWinLossMetaModel metaModel)
        {
            return await _matchWinLossDataAccess.GetDetailDataSet(metaModel).ConfigureAwait(false);
        }

        public async Task<IList<MatchWinLoss>> GetDetailDataList(MatchWinLossMetaModel metaModel)
        {
            return await _matchWinLossDataAccess.GetDetailDataList(metaModel).ConfigureAwait(false);
        }

        public async Task<IList<MatchWinLoss>> GetOutrightParlayList(MatchWinLossMetaModel metaModel)
        {
            return await _matchWinLossDataAccess.GetOutrightParlayList(metaModel).ConfigureAwait(false);
        }

        #endregion IMatchWinLossService Members

        #region Utility

        private static IList<MatchWinLoss> OrderByProduct(IList<MatchWinLoss> dataList)
        {
            var result = dataList.Where(p => p.ProductName == Product.SB || p.ProductName == Product.BA)
                                 .GroupBy(p => p.MatchId)
                                 .Select(g => new MatchWinLoss
                                 {
                                     LeagueId = g.Select(r => r.LeagueId).FirstOrDefault(),
                                     LeagueName = g.Select(r => r.LeagueName).FirstOrDefault(),
                                     SportType = g.Select(r => r.SportType).FirstOrDefault(),
                                     MatchId = g.Select(r => r.MatchId).FirstOrDefault(),
                                     MatchName = g.Select(r => r.MatchName).FirstOrDefault(),
                                     MatchCode = g.Select(r => r.MatchCode).FirstOrDefault(),
                                     HomeName = g.Select(r => r.HomeName).FirstOrDefault(),
                                     AwayName = g.Select(r => r.AwayName).FirstOrDefault(),
                                     ProductName = Product.SB,
                                     IsLive = g.Select(r => r.IsLive).FirstOrDefault(),
                                     HomeId = g.Select(r => r.HomeId).FirstOrDefault(),
                                     AwayId = g.Select(r => r.AwayId).FirstOrDefault(),
                                     BetType = g.Select(r => r.BetType).FirstOrDefault(),
                                     IsNeutral = g.Select(r => r.IsNeutral).FirstOrDefault(),
                                     EventType = g.Select(r => r.EventType).FirstOrDefault(),
                                     Turnover = g.Sum(r => r.Turnover),
                                     TotalTransaction = g.Sum(r => r.TotalTransaction),
                                     CustomerWL = g.Sum(r => r.CustomerWL),
                                     CustomerComm = g.Sum(r => r.CustomerComm),
                                     LicenseeWL = g.Sum(r => r.LicenseeWL),
                                     BACommission = g.Sum(r => r.BACommission),
                                     AmtDueToBA = g.Sum(r => r.AmtDueToBA)
                                 })
                                 .OrderBy(m => m.LeagueName).ThenBy(m => m.MatchName).ToList();
            result.AddRange(
                dataList.Where(p => p.ProductName == Product.NG).OrderBy(m => m.LeagueName).ThenBy(m => m.MatchName));
            result.AddRange(
                dataList.Where(p => p.ProductName == Product.VS).OrderBy(m => m.LeagueName).ThenBy(m => m.MatchName));

            return result;
        }

        private string GetHomeName(MatchWinLoss matchWinLoss)
        {
            if (matchWinLoss.ProductName == Product.NG)
            {
                return string.Empty;
            }

            return _cacheRefAdapter.GetTeamName(matchWinLoss.HomeId, matchWinLoss.SportType) + (matchWinLoss.IsNeutral ? " " + ViewResources.IsNeutral : string.Empty);
        }

        private string GetAwayName(MatchWinLoss matchWinLoss)
        {
            return matchWinLoss.ProductName == Product.NG ?
                    string.Empty :
                    _cacheRefAdapter.GetTeamName(matchWinLoss.AwayId, matchWinLoss.SportType);
        }

        private string GetLeagueName(MatchWinLoss matchWinLoss)
        {
            return _cacheRefAdapter.GetLeagueName(matchWinLoss.LeagueId, matchWinLoss.SportType);
        }

        private string GetMatchName(MatchWinLoss matchWinLoss)
        {
            if (matchWinLoss.ProductName == Product.NG)
            {
                var prefix = matchWinLoss.SportType == (int)SportType.NumberGameHappy5 ? ViewResources.No + "." : ViewResources.NumberGameNo;
                return prefix + " " + matchWinLoss.MatchCode;
            }

            if (SportHelper.IsVSSportTypes(matchWinLoss.SportType))
            {
                return string.Format(EnglishCulture, KickOfTimeFormat, matchWinLoss.KickOffTime);
            }

            if (SportHelper.IsVirtualBetRadarSports(matchWinLoss.SportType))
            {
                var id = !string.IsNullOrEmpty(matchWinLoss.Distance) ? $" - ID {matchWinLoss.Distance}" : string.Empty;
                return $"{ViewResources.Event} {matchWinLoss.VendorMatchId}{id}";
            }

            var homeName = _cacheRefAdapter.GetTeamName(matchWinLoss.HomeId, matchWinLoss.SportType) +
                           (matchWinLoss.IsNeutral ? " " + ViewResources.IsNeutral : string.Empty);
            var awayName = _cacheRefAdapter.GetTeamName(matchWinLoss.AwayId, matchWinLoss.SportType);
            return homeName + "-vs-" + awayName;
        }

        #endregion Utility
    }
}