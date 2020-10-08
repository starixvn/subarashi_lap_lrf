namespace Fanex.Athena.DataAccess.Report.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.Athena.Model.Report.DTO;
    using Fanex.Athena.Model.Report.MetaModel;
    using Model.Core.ResultModel;

    public interface ISabaVirtualSportsWinLossDataAccess
    {
        Task<SortableReportResultModel<LicenseeWinLoss>> GetAgentWinlossDetail(
            SabaVirtualSportsWinLossMetaModel metaModel,
            IDictionary<int, string> currencyList);

        Task<SortableReportResultModel<LicenseeWinLoss>> GetCustomerWinlossDetail(
            SabaVirtualSportsWinLossMetaModel metaModel,
            IDictionary<int, string> currencyList);

        Task<SortableReportResultModel<LicenseeWinLoss>> GetSummaryWinloss(
            SabaVirtualSportsWinLossMetaModel metaModel,
            IDictionary<int, string> currencyList);
    }
}