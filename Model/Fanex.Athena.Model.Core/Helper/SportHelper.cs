namespace Fanex.Athena.Model.Core.Helper
{
    using Fanex.Athena.Model.Core.DataDomain;
    using System.Collections.Generic;
    using System.Linq;

    public static class SportHelper
    {
        private static readonly IEnumerable<int> VSBetRadarSportTypes = new List<int>
        {
            (int)SportType.VirtualHorseRacing ,
            (int)SportType.VirtualDogRacing
        };

        public static bool IsVirtualBetRadarSports(int sportType) => VSBetRadarSportTypes.Contains(sportType);
    }
}