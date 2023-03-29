namespace Fanex.Athena.DataAccess.Core.UnitTests.Users
{
    using Core.Users;

    using Model.Core.DTO.Common;

    using NSubstitute;

    using NUnit.Framework;

    using TestHelpers;

    public class LicenseeDataAccessTest : BaseDataAccessHelperTest<LicenseeDataAccess>
    {
        private const string IsLicenseeBelongToUserSp = "Lrf_LicenseeSel";
        private const string GetLicenseeByNameSp = "Lrf_LicenseeSelBySiteName";

        [TestCase(1, true)]
        [TestCase(2, false)]
        public void IsLicenseeBelongToUser_WhenCall_ValueReturnedCorrectly(int licenseeId, bool expectedResult)
        {
            // Arrange
            const int UserId = 1;
            DataAccess.GetObjectDb(Arg.Is(IsLicenseeBelongToUserSp)).Returns(ObjectDb);
            Reader.Read().Returns(true, false);
            Reader.GetInt32(0).ReturnsForAnyArgs(1);

            // Action
            var result = DataAccess.IsLicenseeBelongToUser(licenseeId, UserId);

            // Assert
            Assert.That(result, Is.EqualTo(expectedResult));
        }

        [Test]
        public void GetByUser_WhenCall_ExecuteReaderMethodIsCalled()
        {
            // Arrange
            const int UserId = 1;
            DataAccess.GetObjectDb(Arg.Is(IsLicenseeBelongToUserSp)).Returns(ObjectDb);

            // Action
            DataAccess.GetByUser(UserId);

            // Assert
            ObjectDb.ReceivedWithAnyArgs().ExecuteReader();
        }

        [Test]
        public void GetByUser_WhenCall_DataReturnedCorrectly()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(IsLicenseeBelongToUserSp)).Returns(ObjectDb);
            Reader.Read().Returns(true, false);

            const int UserId = 1;
            var expected = new Licensee
            {
                Id = 1,
                Name = "LicenseeTest",
                IsAllowedCustomerComm = true
            };
            Reader.GetInt32(Arg.Any<int>()).Returns(expected.Id);
            Reader.GetString(Arg.Any<int>()).Returns(expected.Name);
            Reader.GetBoolean(Arg.Any<int>()).Returns(expected.IsAllowedCustomerComm);

            // Action
            var result = DataAccess.GetByUser(UserId);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result[0].Id, Is.EqualTo(expected.Id));
                Assert.That(result[0].Name, Is.EqualTo(expected.Name));
                Assert.That(result[0].IsAllowedCustomerComm, Is.EqualTo(expected.IsAllowedCustomerComm));
            });
        }

        [Test]
        public void GetLicenseeByName_WhenCall_ValueReturnedCorrectly()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetLicenseeByNameSp)).Returns(ObjectDb);
            var expected = new Licensee
            {
                Id = 100
            };
            ObjectDb.QueryEntity<Licensee>(Arg.Any<object>()).Returns(expected);

            // Action
            var result = DataAccess.GetLicenseeByName(string.Empty);

            // Assert
            Assert.That(result.Id, Is.EqualTo(expected.Id));
        }
    }
}