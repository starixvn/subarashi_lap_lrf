namespace Fanex.Athena.Model.Core.Helper
{
    using System.Collections.Generic;
    using DataDomain;
    using DTO.Common;

    public static class ProductHelper
    {
        private static readonly IDictionary<int, string> ProductCodeMap = new Dictionary<int, string>
        {
            { ProductTypes.Sportsbook, Product.SB },
            { ProductTypes.VirtualSports, Product.VS },
            { ProductTypes.VirtualSports2, Product.VS2 },
            { ProductTypes.Lottery, Product.LT }
        };

        public static string GetProductCode(int productId)
        {
            if (ProductCodeMap.ContainsKey(productId))
            {
                return ProductCodeMap[productId];
            }

            return string.Empty;
        }

        public static int GetProductId(int bettype, string productCode)
        {
            if (BetTypeHelper.IsNumberGame(bettype) ||
                BetTypeHelper.IsNumberGameHappy5(bettype))
            {
                return ProductTypes.NumberGame;
            }

            if (BetTypeHelper.IsVirtualSports(bettype) || BetTypeHelper.IsVirtualSports2(bettype) || productCode == Product.VS)
            {
                return ProductTypes.VirtualSports;
            }

            return ProductTypes.Sportsbook;
        }
    }
}