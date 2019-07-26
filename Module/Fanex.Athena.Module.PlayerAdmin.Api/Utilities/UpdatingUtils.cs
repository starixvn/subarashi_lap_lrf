using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Model.Core.ViewModel;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Utilities
{
    public static class UpdatingUtils
    {
        public const int DefaultErrCode = 999;

        public static ResultViewModel CreateErrorResult()
        {
            return new ResultViewModel
            {
                Success = false,
                ErrorCode = DefaultErrCode,
                ErrorMessage = ResourceKeyConstants.InvalidData
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