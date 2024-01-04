using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Resources;

namespace Fanex.Athena.Service.StatelessCore.Utility
{
    public static class FunctionUMHelper
    {
        public const int UMCode = 999999;

        public static ResultInfo CreateUMResult(string timeFrom, string timeTo)
            => new ResultInfo
            {
                Code = UMCode,
                Message = BuildUMMessage(timeFrom, timeTo)
            };

        public static string BuildUMMessage(string timeFrom, string timeTo)
            => string.Format(ViewResources.FunctionUMMessage, timeFrom, timeTo);
    }
}