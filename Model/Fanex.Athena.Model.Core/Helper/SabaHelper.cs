using Fanex.Athena.Model.Core.DataDomain;

namespace Fanex.Athena.Model.Core
{
    public static class SabaHelper
    {
        public static bool IsHideSaba(int specialPlatform)
        {
            if (specialPlatform == SpecialPlatform.Jollysports || specialPlatform == SpecialPlatform.JollysportCV)
            {
                return true;
            }
            return false;
        }
    }
}