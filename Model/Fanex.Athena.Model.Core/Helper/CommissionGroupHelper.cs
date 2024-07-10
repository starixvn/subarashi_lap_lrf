using System;
using System.Collections.Generic;
using Fanex.Athena.Model.Core.DTO.Common;

namespace Fanex.Athena.Model.Core.Helper
{
    public static class CommissionGroupHelper
    {
        public const string ParlayName = "Parlay";

        public static readonly string[] ProductSettingOrder = new string[] {Product.SB, ParlayName, Product.NG, Product.CS, Product.VB, Product.PP, Product.SXG,
            Product.SG, Product.KN, Product.LT, Product.TG, Product.VS, Product.VRG, Product.CC, Product.SBC, Product.SAG, Product.PGS, Product.AB, Product.WM,
            Product.BGG, Product.JK, Product.HB, Product.VGA, Product.CG, Product.AP, Product.APM, Product.FGGL, Product.MXG, Product.JIG, Product.YB, Product.MGRNG };

        public static int ProductListComparer(string productCode) => Array.IndexOf(ProductSettingOrder, productCode);

        private static readonly Dictionary<string, string> FollowPermissions = new Dictionary<string, string>
        {
            [ParlayName] = Product.SB
        };

        public static bool GetProductPermissions(ProductAccess productAccess, string productCode)
        {
            var code = FollowPermissions.ContainsKey(productCode) ? FollowPermissions[productCode] : productCode;

            return productAccess.IsAllow(code);
        }
    }
}