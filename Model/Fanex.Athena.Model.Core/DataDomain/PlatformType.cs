namespace Fanex.Athena.Model.Core.DataDomain
{
    using System.Collections.Generic;
    using Fanex.Athena.Resources;

    public static class PlatformType
    {
        public const int All = 0;

        public const int Asia = 1;

        public const int China = 2;

        public const int Euro = 3;

        public const int Wap = 4;

        public const int Mobile = 5;

        public const int Tablet = 6;

        public const int NewAsia = 7;

        public const int MobileApp = 8;

        public const int MobileLiteVersion = 9;

        public const int DeepLink = 10;

        public const int NativeApp = 11;

        public const int BetfromOthers = 88;

        private static readonly IDictionary<int, string> MapPlatformKeys = new Dictionary<int, string>
        {
            { All, nameof(All) },
            { Asia, nameof(Asia) },
            { China, nameof(China) },
            { Euro, nameof(Euro) },
            { Wap, nameof(Wap) },
            { Mobile, nameof(Mobile) },
            { Tablet, nameof(Tablet) },
            { NewAsia, nameof(NewAsia) },
            { MobileApp, nameof(MobileApp) },
            { MobileLiteVersion, nameof(MobileLiteVersion) },
            { DeepLink, nameof(DeepLink) },
            { BetfromOthers, nameof(BetfromOthers) },
            { NativeApp, nameof(NativeApp) }
        };

        public static string GetPlatformKey(int type)
        {
            return MapPlatformKeys.ContainsKey(type) ? MapPlatformKeys[type] : "All";
        }

        public static string GetPlatformName(int type)
        {
            return MapPlatformKeys.ContainsKey(type) ? ViewResources.ResourceManager.GetString(MapPlatformKeys[type]) : ViewResources.All;
        }

#pragma warning disable S1541 // Methods and properties should not be too complex

        public static string GetPlatformName(string code)
#pragma warning restore S1541 // Methods and properties should not be too complex
        {
            switch (code)
            {
                case "a":
                case "z": return ViewResources.China;
                case "d":
                case "g": return ViewResources.Asia;
                case "e":
                case "u":
                case "y": return ViewResources.Euro;
                case "m": return ViewResources.Wap;
                case "s":
                case "l": return ViewResources.Mobile;
                case "r": return ViewResources.Tablet;
                case "x": return ViewResources.NewAsia;
                case "o": return ViewResources.MobileApp;
                case "c": return ViewResources.MobileLiteVersion;
                case "t": return ViewResources.DeepLink;
                case "v": return ViewResources.BetfromOthers;
                case "0": return ViewResources.NativeApp;
                default: return ViewResources.Others;
            }
        }

        public static bool IsValidPlatform(int type)
        {
            return (type >= All && type <= NativeApp) || type == BetfromOthers;
        }
    }
}