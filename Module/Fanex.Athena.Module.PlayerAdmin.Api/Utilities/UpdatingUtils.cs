using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Resources;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Utilities
{
    public static class UpdatingUtils
    {
        public static IResultInfo CreateErrorResult()
        {
            return new ResultInfo
            {
                Code = 1,
                Message = ViewResources.UpdateSpecialLevelMsg
            };
        }

        public static string GetLanguageCode(string ietfLanguage)
        {
            const string DefaultLanguageCode = "en";
            var languageList = Util.MapIetfLanguageCodes;

            return languageList.ContainsKey(ietfLanguage) ? languageList[ietfLanguage] : languageList[DefaultLanguageCode];
        }
    }
}