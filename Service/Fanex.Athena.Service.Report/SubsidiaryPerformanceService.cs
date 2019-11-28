namespace Fanex.Athena.Service.Report
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Core.Users.Interfaces;

    using DataAccess.Report.Interfaces;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Core.DTO.Users;
    using Fanex.Athena.Model.Report.DTO.SubsidiaryPerformance;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Service.Report.Interfaces;

    using Model.Core.ResultModel;

    using Resources;

    public class SubsidiaryPerformanceService : ISubsidiaryPerformanceService
    {
        private readonly ISessionService _sessionService;

        private readonly ISubsidiaryService _subsidiaryService;

        private readonly ISubsidiaryPerformanceDataAccess _subLicenseePerformanceDataAccess;

        public SubsidiaryPerformanceService(
            ISessionService sessionService,
            ISubsidiaryService subsidiaryService,
            ISubsidiaryPerformanceDataAccess subLicenseePerformanceDataAccess)
        {
            _sessionService = sessionService;
            _subsidiaryService = subsidiaryService;
            _subLicenseePerformanceDataAccess = subLicenseePerformanceDataAccess;
        }

        public async Task<SubsidiaryResultViewModel> GetData(SubsidiaryPerformanceMetaModel metaModel, IDictionary<int, string> currencyList)
        {
            var userSession = _sessionService.UserSession;
            var dataList = await _subLicenseePerformanceDataAccess.GetData(metaModel, currencyList);

            if (dataList.Any())
            {
                return BuildSummaryResult(dataList, metaModel, userSession);
            }

            return new SubsidiaryResultViewModel
            {
                Data = new List<SubsidiaryPerformanceGroup>()
            };
        }

        public async Task<ReportResultModel<SubsidiaryPerformanceDetail>> GetDetailData(
            SubsidiaryPerformanceMetaModel metaModel, IDictionary<int, string> currencyList)
        {
            return await _subLicenseePerformanceDataAccess.GetDetailData(metaModel, currencyList).ConfigureAwait(false);
        }

        private static void AssignSumData(SubsidiaryPerformanceBase total, SubsidiaryPerformanceBase detail)
        {
            total.BetCount += detail.BetCount;
            total.Turnover += detail.Turnover;
            total.SubsidiaryWinLoss += detail.SubsidiaryWinLoss;
            total.CustomerWinLoss += detail.CustomerWinLoss;
        }

        private SubsidiaryResultViewModel BuildSummaryResult(
            IEnumerable<SubsidiaryPerformance> entityDataList,
            SubsidiaryPerformanceMetaModel metaModel,
            UserAuthInfo user)
        {     
            var mainModel = new List<SubsidiaryPerformanceSummary>();
            var totalModel = new Dictionary<string, SubsidiaryPerformanceBase>();
            var grandTotal = new SubsidiaryPerformanceBase { CurrencyName = metaModel.BaseCurrency.ToUpperInvariant() };

            var operators = _subsidiaryService.GetSubsidiaryList(user, metaModel.LicenseeName, metaModel.SubsidiaryList);
            var totalItem = 0;

            var subsidiaryGroup = operators.Join(
                entityDataList,
                oper => oper.AgentId,
                data => data.SubsidiaryId,
                (oper, data) => new { Subsidiary = oper.OperatorId, Data = data })
                .GroupBy(
                data => data.Subsidiary,
                (subsidiary, subsidiaryData) => new
                {
                    Subsidiary = subsidiary,
                    Details = subsidiaryData.GroupBy(x => x.Data.CurrencyId, (currency, currencyData) => new { CurrencyId = currency, Details = currencyData.Select(y => y.Data) })
                });

            foreach (var subsidiary in subsidiaryGroup)
            {
                var main = new SubsidiaryPerformanceSummary
                {
                    Subsidiary = subsidiary.Subsidiary,
                    Details = new Dictionary<string, IEnumerable<SubsidiaryPerformanceBase>>()
                };
                var total = new SubsidiaryPerformanceBase { CurrencyName = grandTotal.CurrencyName };
                var currencyData = subsidiary.Details.OrderBy(x => x.CurrencyId);

                foreach (var currency in currencyData)
                {
                    var products = GetProducts(currency.Details, total);

                    main.Details.Add(currency.Details.First().CurrencyName, products);
                    main.TotalItem += products.Count;
                }

                mainModel.Add(main);
                totalModel.Add(subsidiary.Subsidiary, total);
                AssignSumData(grandTotal, total);
                totalItem += main.TotalItem;
            }

            if (string.IsNullOrWhiteSpace(metaModel.WhiteLabelList))
            {
                return new SubsidiaryResultViewModel
                {
                    Data = new[] { new SubsidiaryPerformanceGroup { WhiteLabel = string.Empty, Details = mainModel, TotalItem = totalItem } },
                    Total = totalModel,
                    GrandTotal = grandTotal
                };
            }

            var whiteLabels = _subsidiaryService.GetGroupSubsidiaryList(
                user, metaModel.LicenseeName, metaModel.SubsidiaryList, metaModel.WhiteLabelList);

            return new SubsidiaryResultViewModel
            {
                Data = GroupSubsidiaryByWhiteLabel(mainModel, whiteLabels),
                Total = GroupSubsidiaryTotalByWhiteLabel(totalModel, whiteLabels, metaModel.BaseCurrency.ToUpperInvariant()),
                GrandTotal = grandTotal
            };
        }

        private static IDictionary<string, SubsidiaryPerformanceBase> GroupSubsidiaryTotalByWhiteLabel(
            IDictionary<string, SubsidiaryPerformanceBase> subsidiaryTotal,
            IEnumerable<GroupSubsidiary> whiteLabels,
            string currencyName)
        {
            return subsidiaryTotal
                .Join(
                    whiteLabels,
                    sub => sub.Key,
                    label => label.OperatorId,
                    (sub, label) => new { WhiteLabel = label.WhiteLabelName, Total = sub.Value },
                    StringComparer.OrdinalIgnoreCase)
                .GroupBy(
                    data => data.WhiteLabel,
                    (whiteLabel, group) => new
                    {
                        WhiteLabel = whiteLabel ?? ViewResources.Others,
                        Total = new SubsidiaryPerformanceBase
                        {
                            BetCount = group.Sum(x => x.Total.BetCount),
                            Turnover = group.Sum(x => x.Total.Turnover),
                            CustomerWinLoss = group.Sum(x => x.Total.CustomerWinLoss),
                            SubsidiaryWinLoss = group.Sum(x => x.Total.SubsidiaryWinLoss),
                            CurrencyName = currencyName
                        }
                    }
                ).ToDictionary(key => key.WhiteLabel, value => value.Total);
        }

        private static IEnumerable<SubsidiaryPerformanceGroup> GroupSubsidiaryByWhiteLabel(
            IEnumerable<SubsidiaryPerformanceSummary> subsidiaryGroup,
            IEnumerable<GroupSubsidiary> whiteLabels)
        {
            return subsidiaryGroup
                .Join(
                    whiteLabels,
                    sub => sub.Subsidiary,
                    label => label.OperatorId,
                    (sub, label) => new { WhiteLabel = label.WhiteLabelName, Subsidiary = sub },
                    StringComparer.OrdinalIgnoreCase)
                .GroupBy(
                    data => data.WhiteLabel,
                    (whiteLabel, group) => new SubsidiaryPerformanceGroup
                    {
                        WhiteLabel = whiteLabel ?? ViewResources.Others,
                        Details = group.Select(x => x.Subsidiary).ToList(),
                        TotalItem = group.Sum(x => x.Subsidiary.TotalItem)
                    }
                ).ToList();
        }

        private static IList<SubsidiaryPerformanceBase> GetProducts(IEnumerable<SubsidiaryPerformance> productList, SubsidiaryPerformanceBase baseSumTotal)
        {
            var groupedProduct = productList.GroupBy(
                x => x.ProductCode,
                (key, item) => new
                {
                    ProductCode = key,
                    Data = new SubsidiaryPerformanceBase
                    {
                        BetCount = item.Sum(x => x.BetCount),
                        Turnover = item.Sum(x => x.Turnover),
                        CustomerWinLoss = item.Sum(x => x.CustomerWinLoss),
                        SubsidiaryWinLoss = item.Sum(x => x.SubsidiaryWinLoss)
                    },
                    BaseData = new SubsidiaryPerformanceBase
                    {
                        BetCount = item.Sum(x => x.BaseCurrencyData.BetCount),
                        Turnover = item.Sum(x => x.BaseCurrencyData.Turnover),
                        CustomerWinLoss = item.Sum(x => x.BaseCurrencyData.CustomerWinLoss),
                        SubsidiaryWinLoss = item.Sum(x => x.BaseCurrencyData.SubsidiaryWinLoss)
                    }
                });

            var products = new List<SubsidiaryPerformanceBase>();
            var productAll = new SubsidiaryPerformanceBase
            {
                Product = ViewResources.All
            };
            products.Add(productAll);

            foreach (var product in groupedProduct)
            {
                product.Data.Product = ViewResources.ResourceManager.GetString($"Product{product.ProductCode}");
                products.Add(product.Data);

                AssignSumData(productAll, product.Data);
                AssignSumData(baseSumTotal, product.BaseData);
            }

            return products;
        }
    }
}