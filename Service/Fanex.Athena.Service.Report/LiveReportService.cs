// -----------------------------------------------------------------------
// <copyright file="LiveReportService.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Service.Report
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Fanex.Athena.DataAccess.Report.Interfaces;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Report.DTO;
    using Fanex.Athena.Model.Report.DTO.LiveReports;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Service.Report.Interfaces;

    using Model.Core.DataDomain;
    using Model.Report.ResultModel;

    using VendorAdapter.Interfaces;

    public class LiveReportService : ILiveReportService
    {
        private readonly ILiveReportDataAccess _liveReportDataAccess;

        private readonly ICacheRefAdapter _cacheRefAdapter;

        public LiveReportService(ILiveReportDataAccess dataAccess, ICacheRefAdapter cacheRefAdapter)
        {
            this._liveReportDataAccess = dataAccess;
            _cacheRefAdapter = cacheRefAdapter;
        }

        public async Task<IList<LiveReport>> GetLiveReportSummary(LiveReportMetaModel model)
        {
            return model.IsValid ?
                await _liveReportDataAccess.GetLiveReportSummary(model).ConfigureAwait(false) :
                new List<LiveReport>();
        }

        public async Task<LiveReportDetailResultModel> GetLiveReportSumaryDetail(
            LiveReportMetaModel model,
            IDictionary<int, string> currencyList,
            IEnumerable<Product> products)
        {
            if (!model.IsValid)
            {
                return new LiveReportDetailResultModel
                {
                    DataBySport = new List<LiveReport>(),
                    DataByCurrency = new List<LiveReport>(),
                    DataByBetType = new List<LiveReportByBetType>()
                };
            }

            var detailBySport = await _liveReportDataAccess.GetDetailBySport(model).ConfigureAwait(false);

            var tupleCurrencyAndBettype = await _liveReportDataAccess.GetDetailByCurrencyAndBettype(model, currencyList, products).ConfigureAwait(false);
            return new LiveReportDetailResultModel
            {
                DataBySport = detailBySport,
                DataByCurrency = tupleCurrencyAndBettype.Item1,
                DataByBetType = tupleCurrencyAndBettype.Item2
            };
        }

        public async Task<SortableList<LiveReportWinLossByMatch>> GetLiveReportWinLossByMatch(LiveReportMatchListMetalModel model)
        {
            if (model.IsValid)
            {
                var dataList = await _liveReportDataAccess.GetLiveReportWinlossByMatch(model).ConfigureAwait(false);

                foreach (var data in dataList)
                {
                    data.MatchName = GetMatchName(model, data);
                }

                if (!string.IsNullOrEmpty(model.SortColumn) && !string.IsNullOrEmpty(model.SortDirection))
                {
                    dataList.Sort(model.SortColumn, model.SortDirection.Equals("ASC", StringComparison.OrdinalIgnoreCase));
                }

                return dataList;
            }

            return new SortableList<LiveReportWinLossByMatch>();
        }

        private string GetMatchName(LiveReportMatchListMetalModel model, LiveReportWinLossByMatch data)
        {
            string matchName;

            switch (model.SportId)
            {
                case (int)SportType.LiveCasino:
                    matchName = string.Format("{0} {1} {2} ", _cacheRefAdapter.GetSportName(model.SportId), _cacheRefAdapter.GetBettype(data.BetType), data.ShowTime);
                    break;

                case (int)SportType.VirtualDogRacing:
                case (int)SportType.VirtualHorseRacing:
                    var id = !string.IsNullOrEmpty(data.Distance) ? $" - ID {data.Distance}" : string.Empty;
                    matchName = $"{ViewResources.Event} {data.VendorMatchId}{id}";
                    break;

                default:
                    matchName = string.Format("{0} vs {1}", _cacheRefAdapter.GetTeamName(data.HomeId), _cacheRefAdapter.GetTeamName(data.AwayId));
                    break;
            }

            return matchName;
        }
    }
}