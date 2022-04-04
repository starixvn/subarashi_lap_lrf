using System;
using System.Collections.Generic;
using System.Linq;
using Fanex.Athena.DataAccess.Core.Configuration.Interfaces;
using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.Helper;
using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Service.StatelessCore.Utility
{
    public static class AutoBindMetaModelService
    {
        public static void MapAgentXml(IDictionary<string, object> actionArguments, IDictionary<int, int[]> currencyAgentList)
        {
            var item = actionArguments.FirstOrDefault(x => x.Value is IMetaModelAgent);

            if (item.Value is IMetaModelAgent itemWithAgent)
            {
                IEnumerable<int> currencyIdList;
                if (item.Value is IMetaModelCurrency itemWithSingleCurrency)
                {
                    currencyIdList = new[] { itemWithSingleCurrency.CurrencyId < 0 ? 0 : itemWithSingleCurrency.CurrencyId };
                }
                else if (item.Value is IMetaModelCurrencyIdList itemWithMultiCurrency
                    && !string.IsNullOrEmpty(itemWithMultiCurrency.CurrencyIdList))
                {
                    currencyIdList = AuthParameterHelper.ParseCurrencyIdList(itemWithMultiCurrency.CurrencyIdList);
                }
                else
                {
                    currencyIdList = new[] { 0 };
                }

                itemWithAgent.AgentListXml = AuthParameterHelper.GenerateAgentListXml(currencyAgentList, currencyIdList, itemWithAgent.IsExcludedTestData);
                actionArguments[item.Key] = itemWithAgent;
            }
        }

        public static void MapCurrencyList(
            IDictionary<string, object> actionArguments,
            IDictionary<int, string> currencyList)
        {
            var item = actionArguments.FirstOrDefault(x => x.Value is IMetaModelCurrencyList);
            if (item.Value != null)
            {
                var value = item.Value as IMetaModelCurrencyList;
                if (item.Value is IMetaModelCurrencyIdList)
                {
                    var itemById = item.Value as IMetaModelCurrencyIdList;
                    var selectedCurrencyList = itemById.CurrencyIdList?.Split(new[] { ',' },
                        StringSplitOptions.RemoveEmptyEntries);

                    value.CurrencyList = currencyList.Where(i =>
                    selectedCurrencyList.Contains(i.Key.ToString()))
                    .Select(x => new Currency { ID = x.Key, Name = x.Value }).ToList();
                }
                else
                {
                    value.CurrencyList = currencyList
                    .Select(x => new Currency { ID = x.Key, Name = x.Value }).ToList();
                }

                actionArguments[item.Key] = value;
            }
        }

        public static void MapUserId(IDictionary<string, object> actionArguments, int userId)
        {
            if (MetaModelHelper.IsMetaModel(actionArguments, out IMetaModelUserId value))
            {
                value.UserId = userId;
            }
        }

        public static void MapSiteName(IDictionary<string, object> actionArguments, string siteName)
        {
            if (MetaModelHelper.IsMetaModel(actionArguments, out IMetaModelSiteName value))
            {
                value.SiteName = siteName;
            }
        }

        public static void MapLanguage(IDictionary<string, object> actionArguments)
        {
            if (actionArguments.ContainsKey("language")
                && actionArguments["language"] is string lang
                && MetaModelHelper.IsMetaModel(actionArguments, out IMetaModelLanguage model))
            {
                model.Language = Util.MapIetfLanguageCodes[lang];
            }
        }

        public static void MapLanguage(IDictionary<string, object> actionArguments, string lang)
        {
            if (MetaModelHelper.IsMetaModel(actionArguments, out IMetaModelLanguage model))
            {
                model.Language = lang;
            }
        }

        public static void MapIp(IDictionary<string, object> actionArguments, string ip)
        {
            if (MetaModelHelper.IsMetaModel(actionArguments, out IMetaModelIp model))
            {
                model.Ip = ip;
            }
        }

        public static void MapBalanceUpAndMoveBet(IDictionary<string, object> actionArguments, IBalanceUpDataAccess balanceUpDataAccess)
        {
            if (MetaModelHelper.IsMetaModel(actionArguments, out IMetaModelBalanceUpAndMoveBet value))
            {
                var temp = balanceUpDataAccess.GetBalanceUp();
                value.BalanceUpDay = temp.BalanceUpDay;
                value.MoveBetsDay = temp.MoveBetsDay;
            }
        }

        public static void MapExportAll(IDictionary<string, object> actionArguments)
        {
            if (MetaModelHelper.IsMetaModel(actionArguments, out IMetaModelPaging metaModelPaging))
            {
                const int UnlimitPageSize = int.MaxValue - 1000;
                metaModelPaging.PageIndex = 1;
                metaModelPaging.PageSize = UnlimitPageSize;
            }
        }

        public static void MapShowingBetFromIP(IDictionary<string, object> actionArguments, bool isShowIp, bool isShowIpvn)
        {
            if (MetaModelHelper.IsMetaModel(actionArguments, out IMetaModelShowBetFromIP metaModelShowBetFromIP))
            {
                metaModelShowBetFromIP.IsShowIpvn = isShowIpvn;
                metaModelShowBetFromIP.IsShowIp = isShowIp;
            }
        }

        public static void MapProductCodeList(IDictionary<string, object> actionArguments, IEnumerable<string> offeredSubProducts, IProductService productService)
        {
            if (MetaModelHelper.IsMetaModel(actionArguments, out IMetaModelProductCodeList metaModelProductCodeList)
                && !string.IsNullOrEmpty(metaModelProductCodeList.ProductCodeList))
            {
                BindProductCodeList(metaModelProductCodeList, offeredSubProducts, productService);
            }
        }

        public static void MapProductOptions(IDictionary<string, object> actionArguments, IEnumerable<string> offeredSubProducts, IProductService productService)
        {
            if (MetaModelHelper.IsMetaModel(actionArguments, out IMetaModelProductOptions metaModelProductOptions)
                && metaModelProductOptions.ProductOptions != null && metaModelProductOptions.ProductOptions.Any())
            {
                BindProductOptions(metaModelProductOptions, offeredSubProducts, productService);
            }
        }

        public static void BindProductCodeList(IMetaModelProductCodeList metaModel, IEnumerable<string> offeredSubProducts, IProductService productService)
        {
            metaModel.OriginalProductCodeList = metaModel.ProductCodeList;
            metaModel.ProductCodeList = productService.GetAllowedSubProductCodeList(offeredSubProducts, metaModel.ProductCodeList);
        }

        private static void BindProductOptions(IMetaModelProductOptions metaModel, IEnumerable<string> offeredSubProducts, IProductService productService)
        {
            metaModel.OriginalProductOptions = metaModel.ProductOptions;
            metaModel.ProductOptions = productService.GetAllowedSubProductOptions(offeredSubProducts, metaModel.ProductOptions);
        }
    }
}
