namespace Fanex.Athena.Model.Core.DataDomain
{
    using System.Collections.Generic;
    using System.Collections.ObjectModel;

    public static class SystemConstants
    {
        public const int SheetSizeExcel = 65000;

        public const int MaxDataTotalRow = int.MaxValue - 1000;

        public static readonly int MinBaseCurrencyType = BaseCurrencyType.USDT;

        public static readonly ReadOnlyCollection<string> BaseCurrencyListOfSummaryTotalRow = new ReadOnlyCollection<string>(
         new List<string> { "EUR", "USD", "GBP" });

        public static readonly IReadOnlyDictionary<int, string> BaseCurrencyList = new Dictionary<int, string> {
            // flat currency
            { BaseCurrencyType.Eur,"EUR" },
            { BaseCurrencyType.Usd,"USD" },
            { BaseCurrencyType.Gbp,"GBP" },
            { BaseCurrencyType.MYR,"MYR" },
            { BaseCurrencyType.CNY,"CNY" },
            { BaseCurrencyType.THB,"THB" },
            { BaseCurrencyType.IDR,"IDR" },
            { BaseCurrencyType.INH,"INH" },
            { BaseCurrencyType.BDT,"BDT" },
            { BaseCurrencyType.INR,"INR" },


            // crypto currency
            { BaseCurrencyType.USDT,"USDT" }
        };

        public static readonly List<int> BaseCurrencyListIds = new List<int>
        {
            BaseCurrencyType.Eur,
            BaseCurrencyType.Usd,
            BaseCurrencyType.Gbp,
            BaseCurrencyType.MYR,
            BaseCurrencyType.CNY,
            BaseCurrencyType.THB,
            BaseCurrencyType.IDR,
            BaseCurrencyType.INH,
            BaseCurrencyType.BDT,
            BaseCurrencyType.INR,
        };


        public static readonly List<int> BaseCryptoCurrencyListIds = new List<int>
        {
            BaseCurrencyType.USDT
        };
    }
}