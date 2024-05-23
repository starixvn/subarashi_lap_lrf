using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Resources;

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

        public static string RemoveSabaText(string text)
        {
            var sabaText = ViewResources.Saba.Trim();
            var result = System.Text.RegularExpressions.Regex.Replace(text, sabaText, string.Empty, System.Text.RegularExpressions.RegexOptions.IgnoreCase);
            // remove duplicate space
            return System.Text.RegularExpressions.Regex.Replace(result, "  ", " ", System.Text.RegularExpressions.RegexOptions.IgnoreCase);
        }
    }
}