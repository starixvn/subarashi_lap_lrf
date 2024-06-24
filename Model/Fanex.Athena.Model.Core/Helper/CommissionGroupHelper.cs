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

        private static readonly IReadOnlyDictionary<Tuple<int, int>, string> ProductSettingMapper = new Dictionary<Tuple<int, int>, string>
        {
            { Tuple.Create(1, 1), Product.SB },
            { Tuple.Create(1, 9), ParlayName },
            { Tuple.Create(212, 4001), Product.VB },
            { Tuple.Create(248, 4101), Product.PP },
            { Tuple.Create(243, 3101), Product.SXG },
            { Tuple.Create(247, 4301), Product.SG },
            { Tuple.Create(220, 1021), Product.LT },
            { Tuple.Create(9908, 1201), Product.VS },
            { Tuple.Create(222, 4901), Product.TG },
            { Tuple.Create(245, 4601), Product.VRG },
            { Tuple.Create(165, 1901), Product.CC },
            { Tuple.Create(200, 1611), Product.SBC },
            { Tuple.Create(244, 3001), Product.SAG },
            { Tuple.Create(232, 6001), Product.PGS },
            { Tuple.Create(211, 2401), Product.AB },
            { Tuple.Create(208, 2101), Product.CS },
            { Tuple.Create(233, 3401), Product.WM },
            { Tuple.Create(239, 3501), Product.BGG },
            { Tuple.Create(234, 6401), Product.JK },
            { Tuple.Create(238, 7001), Product.HB },
            { Tuple.Create(171, 3801), Product.VGA },
            { Tuple.Create(167, 7301), Product.CG },
            { Tuple.Create(172, 7701), Product.AP },
            { Tuple.Create(174, 7801), Product.APM },
            { Tuple.Create(237, 5401), Product.MXG },
            { Tuple.Create(176, 8201), Product.FGGL },
            { Tuple.Create(158, 5100), Product.JIG },
            { Tuple.Create(159, 3151), Product.YB },
            { Tuple.Create(155, 8400), Product.MGRNG },
            { Tuple.Create(161, 81), Product.NG },
            { Tuple.Create(202, 1501), Product.KN }
        };

        public static string GetProductCode(int sportype, int bettype)
        {
            var key = Tuple.Create(sportype, bettype);

            return ProductSettingMapper.TryGetValue(key, out string value) ? value : string.Empty;
        }

        public static Tuple<int, int> GetSetting(string productCode)
        {
            return ProductSettingMapper.FirstOrDefault(x => x.Value == productCode).Key;
        }

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