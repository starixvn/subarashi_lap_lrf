namespace Fanex.Athena.Excel.Base.UnitTests.Extension
{
    using Excel.Base.Extension;
    using Fanex.Athena.Extension.Helper;
    using NPOI.SS.UserModel;

    using NSubstitute;

    using NUnit.Framework;

    [TestFixture]
    public class HSSFCellExtensionTest
    {
        private static readonly object[] TestCaseValueList =
        {
            true,
            "string",
            DateTimeHelper.CreateDateTime(2018, 2, 3),
            10.2,
            10,
            1000M,
            2000L
        };

        [TestCaseSource(nameof(TestCaseValueList))]
        public void SetCellValue_ParamIsObject_SetCellValueMethodIsCalledCorrectly(object value)
        {
            // Arrange
            var cell = Substitute.For<ICell>();

            // Action
            cell.SetCellValue(value);

            // Assert
            cell.Received().SetCellValue(value);
        }
    }
}