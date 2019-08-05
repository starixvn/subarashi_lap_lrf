using Fanex.Athena.Extension.Utility;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Utilities
{
    public static class UpdatingUtils
    {
        public static string GetLanguageCode(string ietfLanguage)
        {
            const string DefaultLanguageCode = "en";
            var languageList = Util.MapIetfLanguageCodes;

            return languageList.ContainsKey(ietfLanguage) ? languageList[ietfLanguage] : languageList[DefaultLanguageCode];
        }
    }
}