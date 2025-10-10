namespace Fanex.Athena.Model.Core.Helper
{
    using Fanex.Athena.Model.Core.DataDomain;
    using System.Collections.Generic;
    using System.Linq;

    public static class SportHelper
    {
        private static readonly IEnumerable<int> Match3rdSportTypes = new List<int>
        {
            (int)SportType.BetbyBasketball,
            (int)SportType.VirtuallySports,
            (int)SportType.VirtualSteepleChase,
            (int)SportType.VirtualHarnessRacing,
            (int)SportType.VirtualMotorRacing,
            (int)SportType.BetbyeVolleyball,
            (int)SportType.BetbyeSoccer
        };

        private static readonly IEnumerable<int> League3rdSportsTypes = new List<int>
        {
            (int)SportType.VirtualHorseRacing,
            (int)SportType.VirtualDogRacing,
            (int)SportType.BetbyBasketball,
            (int)SportType.VirtuallySports,
            (int)SportType.VirtualSteepleChase,
            (int)SportType.VirtualHarnessRacing,
            (int)SportType.VirtualMotorRacing,
            (int)SportType.BetbyeVolleyball,
            (int)SportType.BetbyeSoccer
        };

        public static bool IsLeague3rdSports(int sportType) => League3rdSportsTypes.Contains(sportType);

        public static bool IsMatch3rdSports(int sportType) => Match3rdSportTypes.Contains(sportType);
    }
}