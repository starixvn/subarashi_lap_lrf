namespace Fanex.Athena.DataAccess.Core.UnitTests.Common
{
    using Core.Common;

    using Model.Core.DTO.Common;

    using NSubstitute;

    using NUnit.Framework;

    using TestHelpers;

    public class ProductDataAccessTest : BaseDataAccessHelperTest<ProductDataAccess>
    {
        private const string SpName = "Lrf_LicenseeProduct3rdSel";
        private const int LicenseeId = 1;

        [Test]
        public void GetProductAccessList_WhenCall_ParametersPassedCorrectly()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is<string>(_ => _ == SpName)).Returns(ObjectDb);

            // Action
            DataAccess.GetProductAccessList(LicenseeId);

            // Assert
            ObjectDb.Received(1).SetParameterValue("licenseeid", LicenseeId);
        }

        [Test]
        public void GetProductAccessList_WhenCall_DataReturnedCorrectly()
        {
            // Arrange
            var expectedProductAccess = GetFakeProductAccess();

            DataAccess.GetObjectDb(Arg.Is<string>(_ => _ == SpName)).Returns(ObjectDb);
            MapReaderData(new
            {
                ProductID = expectedProductAccess.ProductID,
                productprefix = "NG",
                comm = expectedProductAccess.AllowCommission,
                winloss = expectedProductAccess.AllowWinloss
            });
            Reader.Read().Returns(true, false);

            // Action
            var result = DataAccess.GetProductAccessList(LicenseeId);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result[0].ProductID, Is.EqualTo(0));
                Assert.That(result[0].ProductCode, Is.EqualTo("SB"));

                Assert.That(result[1].ProductID, Is.EqualTo(expectedProductAccess.ProductID));
                Assert.That(result[1].ProductCode, Is.EqualTo(expectedProductAccess.ProductCode));
                Assert.That(result[1].ProductName, Is.EqualTo(expectedProductAccess.ProductName));
                Assert.That(result[1].AllowCommission, Is.EqualTo(expectedProductAccess.AllowCommission));
                Assert.That(result[1].AllowWinloss, Is.EqualTo(expectedProductAccess.AllowWinloss));
            });
        }

        private Product GetFakeProductAccess()
        {
            return new Product
            {
                ProductID = 1,
                ProductName = "Number Game",
                ProductCode = "NG",
                AllowCommission = true,
                AllowWinloss = true
            };
        }
    }
}