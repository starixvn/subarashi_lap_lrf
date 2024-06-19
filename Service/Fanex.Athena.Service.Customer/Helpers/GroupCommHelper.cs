namespace Fanex.Athena.Service.Customer.Helpers
{
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.Helper;
    using Fanex.Athena.Model.Customer.MetaModel;
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public static class GroupCommHelper
    {
        private const decimal MinKey = 0;
        private const decimal MaxKey = 15;

        private const double MinValue = 0;
        private const decimal RangValueKey = 0.0005m;
        private const decimal RangeKey = 0.05m;

        private static IEnumerable<decimal> _commissions;

        private static Dictionary<Tuple<int, int>, string> CommMapper = new Dictionary<Tuple<int, int>, string>
        {
            //{ Tuple.Create(1, 1), Product.SB },
            //{ Tuple.Create(1, 4), Product.SB },
            //{ Tuple.Create(1, 5), Product.SB },
            //{ Tuple.Create(2, 2), Product.SB },
            { Tuple.Create(1, 9), CommissionGroupHelper.ParlayName },
            { Tuple.Create(212, 4001), Product.VB },
            { Tuple.Create(248, 4101), Product.PP },
            { Tuple.Create(243, 3101), Product.SXG },
            { Tuple.Create(247, 4301), Product.SG },
            { Tuple.Create(220, 1021), Product.SLT },
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

        public static bool IsAllValid(params decimal[] commissions)
        {
            if (_commissions == null)
            {
                BuildCommValues();
            }

            foreach (decimal value in commissions)
            {
                if (!_commissions.Any(x => x == value))
                {
                    return false;
                }
            }

            return true;
        }

        private static void BuildCommValues()
        {
            var commissions = new List<decimal>();
            for (decimal i = MinKey, j = MaxKey + RangeKey, value = (decimal)MinValue; i < j; i += RangeKey, value += RangValueKey)
            {
                commissions.Add(value);
            }

            _commissions = commissions;
        }

        public static string GetCommSettingName(GroupCommDetailMetaModel detail)
        {
            var key = Tuple.Create(detail.Sporttype, detail.Bettype);

            return CommMapper.TryGetValue(key, out string value) ? value : string.Empty;
        }
    }
}