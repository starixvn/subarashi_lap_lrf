using Fanex.Athena.Model.Core.DataDomain;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Athena.Model.Core.Helper
{
    public static class MappingHelper
    {
        public static readonly IImmutableDictionary<int, int> MapBettypeSportBySport = new Dictionary<int, int>
        {
            { 1204, (int)SportType.Soccer },
            { 1235, (int)SportType.Tennis },
            { 8102, (int)SportType.NumberGameHappy5 }
        }.ToImmutableDictionary();

        public static readonly IImmutableDictionary<int, int> MapBettypeSportByProduct = new Dictionary<int, int>
        {
            { 1235, (int)SportType.Tennis },
            { 8102, (int)SportType.NumberGameHappy5 },
            { 2803, (int)SportType.VirtualBasketball },
            { 2804, (int)SportType.VirtualBasketball },
            { 2805, (int)SportType.VirtualBasketball },
            { 2806, (int)SportType.VirtualBasketball }
        }.ToImmutableDictionary();
    }
}
