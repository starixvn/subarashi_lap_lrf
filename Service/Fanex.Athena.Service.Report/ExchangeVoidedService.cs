using System.Collections.Generic;
using System.Threading.Tasks;
using Fanex.Athena.DataAccess.Report.Interfaces;
using Fanex.Athena.Model.Report.DTO;
using Fanex.Athena.Model.Report.MetaModel;
using Fanex.Athena.Model.Report.ViewModel;
using Fanex.Athena.Service.Report.Interfaces;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Service.Report
{
    public class ExchangeVoidedService : IExchangeVoidedService
    {
        private readonly IExchangeVoidedDataAccess _dataAccess;

        private readonly ILGAPIClient _lgClient;

        private const int SuccessCode = 1;

        public ExchangeVoidedService(
                  ILGAPIClient lgClient,
                  IExchangeVoidedDataAccess dataAccess)
        {
            _lgClient = lgClient;
            _dataAccess = dataAccess;
        }

        public async Task<ExchangeVoidedViewModel> GetData(ExchangeVoidedMetaModel metaModel)
        {
            var refNoString = metaModel.RefNo?.Trim();
            if (!string.IsNullOrEmpty(refNoString) && !int.TryParse(refNoString, out int refNo))
            {
                return CreateEmptyResult();
            }

            var userName = metaModel.UserName?.Trim();
            var custId = 0;
            if (!string.IsNullOrEmpty(userName))
            {
                custId = await _dataAccess.GetCustIdAsync(userName, metaModel.AgentListXml);

                if (custId == 0)
                {
                    return CreateEmptyResult();
                }
            }

            var apiMetaModel = new
            {
                CustId = custId,
                metaModel.SelectedDate,
                metaModel.PageIndex,
                metaModel.Environment,
                RefNo = refNoString,
                metaModel.SiteName
            };

            const string apiPath = "/ExchangeBetHistory/Index";

            return await _lgClient.PostAsync<ExchangeVoidedViewModel>(apiPath, apiMetaModel, metaModel.Language).ConfigureAwait(false);
        }

        private static ExchangeVoidedViewModel CreateEmptyResult()
        {
            return new ExchangeVoidedViewModel { DataList = new List<ExchangeVoidedItem>(), TotalPage = 0, ErrCode = SuccessCode };
        }
    }
}