using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Data;
using NSubstitute;

namespace Fanex.Athena.Module.PlayerAdmin.UnitTests
{
    public static class TestUtility
    {
        public static void FakeResultInfo(IObjectDb objectDb, ResultInfo expectedResultInfo)
        {
            objectDb.GetParameterValue("ErrCode").Returns(expectedResultInfo.Code);
            objectDb.GetParameterValue("ErrMsg").Returns(expectedResultInfo.Message);
        }
    }
}