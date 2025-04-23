namespace Fanex.Athena.Model.Core.Helper
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using DTO.Common;

    public static class CommissionGroupHelper
    {
        private const string ParlayName = "Parlay";

        private static readonly string[] ProductSettingOrder =
        {
            Product.SB,
            ParlayName,
            Product.NG,
            Product.CS,
            Product.VB,
            Product.PP,
            Product.SXG,
            Product.SG,
            Product.KN,
            Product.LT,
            Product.TG,
            Product.VS,
            Product.VRG,
            Product.CC,
            Product.SBC,
            Product.SAG,
            Product.PGS,
            Product.AB,
            Product.WM,
            Product.BGG,
            Product.JK,
            Product.HB,
            Product.VGA,
            Product.CG,
            Product.AP,
            Product.APM,
            Product.FGGL,
            Product.MXG,
            Product.JIG,
            Product.YB,
            Product.MGRNG,
            Product.WE,
            Product.SEA,
            Product.L22,
            Product.UUSL,
            Product.FS,
            Product.FAC,
            Product.NS,
            Product.ON,
            Product.GPIRNG,
            Product.PTRNG,
            Product.GPILC,
            Product.PS,
            Product.ASK,
            Product.FG,
            Product.HOT,
            Product.MGLC,
            Product.PTLC,
            Product.RGRNG
        };

        private static readonly Dictionary<string, string> FollowPermissions = new Dictionary<string, string>
        {
            [ParlayName] = Product.SB
        };

        public static readonly string[] ExcludeProductsSPParam = { "SB", "Parlay" };

        public static readonly IReadOnlyDictionary<string, string> ProductCodeMapper = new Dictionary<string, string>
        {
            [Product.CS] = "RNG",
            [Product.VB] = "Macau",
            [Product.AGC] = "AG",
            [Product.SXG] = "SexyGaming",
            [Product.SG] = "SpadeGaming",
            [Product.KN] = "Keno",
            [Product.LT] = "Lottery",
            [Product.TG] = "TableGame",
            [Product.AB] = "Allbet",
            [Product.VRG] = "VirtualGames",
            [Product.CC] = "ArcadiaGaming",
            [Product.SBC] = "Sabaclub",
            [Product.SAG] = "SAGaming",
            [Product.PGS] = "PGSoft",
            [Product.WM] = "WMCasino",
            [Product.BGG] = "BigGaming",
            [Product.JK] = "Joker",
            [Product.SLT] = "SportsLottery",
            [Product.HB] = "Habanero",
            [Product.VGA] = "VGaming",
            [Product.CG] = "CG",
            [Product.AP] = "Advant",
            [Product.APM] = "AdvantMini",
            [Product.FGGL] = "FGG",
            [Product.MXG] = "MaxGame",
            [Product.JIG] = "Jili",
            [Product.YB] = "YeeBet",
            [Product.MGRNG] = "MgRNG"
        };

        public static int ProductListComparer(string productCode)
        {
            var index = Array.IndexOf(ProductSettingOrder, productCode);

            return index >= 0 ? index : int.MaxValue;
        }

        public static IDictionary<string, string> MapHardcodedNameFromDB(IDictionary<string, bool> permissions, bool isUpdate)
        {
            var result = new Dictionary<string, string>();

            foreach (var p in permissions)
            {
                var code = ProductCodeMapper.ContainsKey(p.Key) ? ProductCodeMapper[p.Key] : p.Key;
                if (isUpdate && ExcludeProductsSPParam.Any(s => string.Equals(s, code)))
                {
                    continue;
                }

                result.Add(p.Key, code);
            }

            return result;
        }

        public static bool GetProductPermissions(ProductAccess productAccess, string productCode)
        {
            var code = FollowPermissions.ContainsKey(productCode) ? FollowPermissions[productCode] : productCode;

            return productAccess.IsAllow(code);
        }

        public static IDictionary<string, bool> GetProductPermissions(string[] supportedProducts, ProductAccess productAccess)
        {
            var result = new Dictionary<string, bool>();

            foreach (var p in supportedProducts)
            {
                var code = FollowPermissions.ContainsKey(p) ? FollowPermissions[p] : p;
                result.Add(p, productAccess.IsAllow(code));
            }

            return result;
        }

        public static IDictionary<string, bool> GetProductColumns(IDataReader reader, IDictionary<string, string> hardcodedColumns)
        {
            var columnsInTable = new Dictionary<string, bool>();
            var schema = reader.GetSchemaTable()
                .Rows
                .OfType<DataRow>();

            foreach (var p in hardcodedColumns)
            {
                columnsInTable.Add(p.Key, schema.Any(row => string.Equals(row["ColumnName"].ToString(), p.Value + "Comm", StringComparison.OrdinalIgnoreCase)));
            }

            return columnsInTable;
        }
    }
}