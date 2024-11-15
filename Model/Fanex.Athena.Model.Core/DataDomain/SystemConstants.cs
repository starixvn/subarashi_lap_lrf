namespace Fanex.Athena.Model.Core.DataDomain
{
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using Constants;
    using Resources;
    using Fanex.Athena.Model.Core.DTO.Common;

    public static class SystemConstants
    {
        public const int SheetSizeExcel = 65000;

        public const int MaxDataTotalRow = int.MaxValue - 1000;

        public static readonly int MinBaseCurrencyType = BaseCurrencyType.USDT;

        public static readonly ReadOnlyCollection<string> BaseCurrencyListOfSummaryTotalRow = new ReadOnlyCollection<string>(
            new List<string> { "EUR", "USD", "GBP" });

        public static readonly ReadOnlyCollection<string> SettlementTimeSupportProductList = new ReadOnlyCollection<string>(
         new List<string> { Product.SB, Product.VS, Product.NG });

        public static readonly IReadOnlyDictionary<int, string> BaseCurrencyList = new Dictionary<int, string>
        {
            // flat currency
            { BaseCurrencyType.Eur, "EUR" },
            { BaseCurrencyType.Usd, "USD" },
            { BaseCurrencyType.Gbp, "GBP" },
            { BaseCurrencyType.MYR, "MYR" },
            { BaseCurrencyType.CNY, "CNY" },
            { BaseCurrencyType.THB, "THB" },
            { BaseCurrencyType.IDR, "IDR" },
            { BaseCurrencyType.INH, "INH" },
            { BaseCurrencyType.BDT, "BDT" },
            { BaseCurrencyType.INR, "INR" },
            { BaseCurrencyType.PHP, "PHP" },
            { BaseCurrencyType.MP, "MP" },
            { BaseCurrencyType.NPR, "NPR" },
            { BaseCurrencyType.TRY, "TRY" },
            { BaseCurrencyType.JPY, "JPY" },
            { BaseCurrencyType.MXN, "MXN" },
            { BaseCurrencyType.NGN, "NGN" },
            { BaseCurrencyType.BRL, "BRL" },

            // crypto currency
            { BaseCurrencyType.USDT, "USDT" }
        };

        public static readonly IReadOnlyDictionary<int, string> FlatBaseCurrencyList = new Dictionary<int, string>
        {
            { BaseCurrencyType.Eur, "EUR" },
            { BaseCurrencyType.Usd, "USD" },
            { BaseCurrencyType.Gbp, "GBP" },
            { BaseCurrencyType.MYR, "MYR" },
            { BaseCurrencyType.CNY, "CNY" },
            { BaseCurrencyType.THB, "THB" },
            { BaseCurrencyType.IDR, "IDR" },
            { BaseCurrencyType.INH, "INH" },
            { BaseCurrencyType.BDT, "BDT" },
            { BaseCurrencyType.INR, "INR" },
            { BaseCurrencyType.PHP, "PHP" },
            { BaseCurrencyType.NPR, "NPR" },
            { BaseCurrencyType.TRY, "TRY" },
            { BaseCurrencyType.JPY, "JPY" },
            { BaseCurrencyType.MXN, "MXN" },
            { BaseCurrencyType.NGN, "NGN" },
            { BaseCurrencyType.BRL, "BRL" }
        };

        public static readonly IReadOnlyDictionary<int, string> JollysportsBaseCurrencyList = new Dictionary<int, string>
        {
            { BaseCurrencyType.Eur, "EUR" },
            { BaseCurrencyType.Usd, "USD" },
            { BaseCurrencyType.Gbp, "GBP" },
            { BaseCurrencyType.MYR, "MYR" },
            { BaseCurrencyType.CNY, "CNY" },
            { BaseCurrencyType.THB, "THB" },
            { BaseCurrencyType.IDR, "IDR" },
            { BaseCurrencyType.INH, "INH" },
            { BaseCurrencyType.BDT, "BDT" },
            { BaseCurrencyType.INR, "INR" },
            { BaseCurrencyType.MP, "MP" },
            { BaseCurrencyType.NPR, "NPR" },
            { BaseCurrencyType.TRY, "TRY" },
            { BaseCurrencyType.JPY, "JPY" },
            { BaseCurrencyType.MXN, "MXN" },
            { BaseCurrencyType.NGN, "NGN" },
            { BaseCurrencyType.BRL, "BRL" }
        };

        public static readonly IReadOnlyDictionary<int, string> CryptoBaseCurrencyList = new Dictionary<int, string>
        {
            { BaseCurrencyType.USDT, "USDT" }
        };

        public static readonly IReadOnlyDictionary<int, string> CryptoSupportEURBaseCurrencyList = new Dictionary<int, string>
        {
            { BaseCurrencyType.Eur, "EUR" },
            { BaseCurrencyType.MYR, "MYR" },
            { BaseCurrencyType.CNY, "CNY" }
        };

        public static readonly IReadOnlyDictionary<int, string> TimeZoneList = new Dictionary<int, string>
        {
            // flat currency
            { TimeZoneType.AST, "GMT-4" },
            { TimeZoneType.CST, "GMT+8" }
        };

        public static IReadOnlyDictionary<int, string> VipOnyList => new Dictionary<int, string>
        {
            { 0, ViewResources.No },
            { 1, ViewResources.Yes }
        };

#pragma warning disable S109 // Magic numbers should not be used

        public static IReadOnlyDictionary<int, string> CashOutModeList => new Dictionary<int, string>
        {
            { 0, ViewResources.IncludeCOFromSB },
            { 1, ViewResources.ExcludeCOFromSB },
            { 2, ViewResources.ViewCOOnly }
        };

#pragma warning restore S109 // Magic numbers should not be used
    }
}