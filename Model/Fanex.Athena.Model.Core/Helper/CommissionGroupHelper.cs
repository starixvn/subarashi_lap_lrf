using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Fanex.Athena.Model.Core.DTO.Common;

namespace Fanex.Athena.Model.Core.Helper
{
    public static class CommissionGroupHelper
    {
        public const string ParlayName = "Parlay";

        private static readonly Dictionary<string, string> FollowPermissions = new Dictionary<string, string>
        {
            [ParlayName] = Product.SB
        };

        public static readonly string[] ExcludeProductsSPParam = new[] { "SB", "Parlay" };

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
            [Product.GDG] = "GDG",
            [Product.SLT] = "SportsLottery",
            [Product.HB] = "Habanero",
            [Product.VGA] = "VGaming",
            [Product.CG] = "CG",
            [Product.AP] = "Advant",
            [Product.APM] = "AdvantMini",
            [Product.VS3] = "VS3"
        };

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