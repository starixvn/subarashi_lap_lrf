namespace Fanex.Athena.DataAccess.Customer.UnitTests
{
    using AutoFixture;
    using Core.UnitTests.TestHelpers;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Model.Customer.MetaModel.CustomerLog;

    using NSubstitute;

    using NUnit.Framework;
    using System.Linq;
    using System.Threading.Tasks;

    public class GroupComDataAccessTest : BaseDataAccessHelperTest<GroupComDataAccess>
    {
        private Fixture _fixture = new Fixture();

        [Test]
        public async Task GetAllCommSettingAsync_WhenCall_ReturnCorrectData()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is("Lrf_LicenseeCommProductList")).Returns(ObjectDb);
            Reader.Read().Returns(true, false);
            var expectedResult = new
            {
                ProductCode = "SB",
                Sporttype = 1,
                Bettype = 11
            };
            MapReaderData(expectedResult);

            // Action
            var result = await DataAccess.GetAllCommSettingAsync().ConfigureAwait(false);
            var firstItem = result.First();

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(firstItem.ProductCode, Is.EqualTo(expectedResult.ProductCode));
                Assert.That(firstItem.Sporttype, Is.EqualTo(expectedResult.Sporttype));
                Assert.That(firstItem.Bettype, Is.EqualTo(expectedResult.Bettype));
            });
        }

        [Test]
        public async Task GetAllAsync_WhenCall_ParametersPassedCorrectly()
        {
            // Arrange
            var licenseeId = 1;
            DataAccess.GetObjectDb(Arg.Is("Lrf_LicenseeGroupCommSel")).Returns(ObjectDb);

            // Action
            _ = await DataAccess.GetAllAsync(licenseeId).ConfigureAwait(false);

            // Assert
            Assert.Multiple(() =>
            {
                ObjectDb.Received().SetParameterValue("LicenseeID", licenseeId);
            });
        }

        [Test]
        public async Task GetAllAsync_WhenCall_ReturnCorrectData()
        {
            // Arrange
            var licenseeId = 1;
            DataAccess.GetObjectDb(Arg.Is("Lrf_LicenseeGroupCommSel")).Returns(ObjectDb);
            Reader.Read().Returns(true, false, true, false);
            Reader.NextResult().Returns(true);

            var expectedCommResult = new
            {
                GroupName = "Test",
                NumberOfCustomer = 1,
                GroupDiscountID = 1,
                GroupColor = "f0000",
                IsDefault = true,
                ProductCode = "SB",
                Bettype = 99,
                Sporttype = 1,
                Discount = 0.01
            };
            MapReaderData(expectedCommResult);

            // Action
            var result = await DataAccess.GetAllAsync(licenseeId).ConfigureAwait(false);
            var firstCommItem = result.Item1.First();
            var firstCommDeatailItem = result.Item2.First();

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(firstCommItem.GroupName, Is.EqualTo(expectedCommResult.GroupName));
                Assert.That(firstCommItem.NumberOfCustomer, Is.EqualTo(expectedCommResult.NumberOfCustomer));
                Assert.That(firstCommItem.GroupCommId, Is.EqualTo(expectedCommResult.GroupDiscountID));
                Assert.That(firstCommItem.GroupColor, Is.EqualTo(expectedCommResult.GroupColor));
                Assert.That(firstCommItem.IsDefaultGroup, Is.EqualTo(expectedCommResult.IsDefault));

                Assert.That(firstCommDeatailItem.GroupCommId, Is.EqualTo(expectedCommResult.GroupDiscountID));
                Assert.That(firstCommDeatailItem.Discount, Is.EqualTo(expectedCommResult.Discount));
                Assert.That(firstCommDeatailItem.Sporttype, Is.EqualTo(expectedCommResult.Sporttype));
                Assert.That(firstCommDeatailItem.Bettype, Is.EqualTo(expectedCommResult.Bettype));
                Assert.That(firstCommDeatailItem.ProductCode, Is.EqualTo(expectedCommResult.ProductCode));
            });
        }

        [Test]
        public async Task GetById_WhenCall_ParametersPassedCorrectly()
        {
            // Arrange
            var licenseeId = 1;
            var groupCommId = 11;
            DataAccess.GetObjectDb(Arg.Is("Lrf_GroupCommGetById")).Returns(ObjectDb);

            // Action
            _ = await DataAccess.GetById(groupCommId, licenseeId).ConfigureAwait(false);

            // Assert
            Assert.Multiple(() =>
            {
                ObjectDb.Received().SetParameterValue("LicenseeId", licenseeId);
                ObjectDb.Received().SetParameterValue("GroupDiscountID", groupCommId);
            });
        }

        [Test]
        public async Task GetById_WhenCall_ReturnCorrectData()
        {
            // Arrange
            var licenseeId = 1;
            var groupCommId = 11;
            DataAccess.GetObjectDb(Arg.Is("Lrf_GroupCommGetById")).Returns(ObjectDb);
            Reader.Read().Returns(true, true, false);
            Reader.NextResult().Returns(true);

            var expectedCommResult = new
            {
                GroupName = "Test",
                GroupDiscountID = 1,
                GroupColor = "f0000",
                IsDefault = true,
                ProductCode = "SB",
                Bettype = 99,
                Sporttype = 1,
                Discount = 0.01
            };
            MapReaderData(expectedCommResult);

            // Action
            var result = await DataAccess.GetById(groupCommId, licenseeId).ConfigureAwait(false);
            var firstCommValue = result.CommValues.First();

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.GroupName, Is.EqualTo(expectedCommResult.GroupName));
                Assert.That(result.GroupCommId, Is.EqualTo(expectedCommResult.GroupDiscountID));
                Assert.That(result.GroupColor, Is.EqualTo(expectedCommResult.GroupColor));
                Assert.That(result.IsDefaultGroup, Is.EqualTo(expectedCommResult.IsDefault));

                Assert.That(firstCommValue.Discount, Is.EqualTo(expectedCommResult.Discount));
                Assert.That(firstCommValue.Sporttype, Is.EqualTo(expectedCommResult.Sporttype));
                Assert.That(firstCommValue.Bettype, Is.EqualTo(expectedCommResult.Bettype));
                Assert.That(firstCommValue.ProductCode, Is.EqualTo(expectedCommResult.ProductCode));
            });
        }

        [Test]
        public async Task InsertGroupAsync_WhenCall_ParametersPassedCorrectly()
        {
            // Arrange
            var userId = 1;
            var request = _fixture.Create<Request>();
            var metaModel = _fixture.Create<GroupCommMetaModel>();

            ObjectDb.GetParameterValue("GroupDiscountID").Returns(metaModel.GroupCommId);
            DataAccess.GetObjectDb(Arg.Is("Lrf_LicenseeGroupCommIns")).Returns(ObjectDb);

            // Action
            _ = await DataAccess.InsertGroupAsync(metaModel, request, userId).ConfigureAwait(false);

            // Assert
            Assert.Multiple(() =>
            {
                ObjectDb.Received().SetParameterValue("LicenseeID", metaModel.LicenseeId);
                ObjectDb.Received().SetParameterValue("GroupName", metaModel.GroupName);
                ObjectDb.Received().SetParameterValue("GroupColor", metaModel.GroupColor);
                ObjectDb.Received().SetParameterValue("UserId", userId);
                ObjectDb.Received().SetParameterValue("Ip", request.Ip);
                ObjectDb.Received().SetParameterValue("langkey", request.Language);
                ObjectDb.Received().SetParameterValue("IsDefault", metaModel.IsDefaultGroup);
                ObjectDb.Received().SetParameterValue("IsResetDefault", metaModel.IsResetDefault);
                ObjectDb.Received().SetParameterValue("GroupDiscountID", metaModel.GroupCommId);
            });
        }

        [Test]
        public async Task UpdateGroupAsync_WhenCall_ParametersPassedCorrectly()
        {
            // Arrange
            var userId = 1;
            DataAccess.GetObjectDb(Arg.Is("Lrf_LicenseeGroupCommUpd"), 900).Returns(ObjectDb);
            var metaModel = _fixture.Create<GroupCommMetaModel>();
            var request = _fixture.Create<Request>();
            ObjectDb.GetParameterValue("GroupCommID").Returns(metaModel.GroupCommId);

            // Action
            _ = await DataAccess.UpdateGroupAsync(metaModel, request, userId).ConfigureAwait(false);

            // Assert
            Assert.Multiple(() =>
            {
                ObjectDb.Received().SetParameterValue("LicenseeID", metaModel.LicenseeId);
                ObjectDb.Received().SetParameterValue("GroupName", metaModel.GroupName);
                ObjectDb.Received().SetParameterValue("GroupColor", metaModel.GroupColor);
                ObjectDb.Received().SetParameterValue("UserId", userId);
                ObjectDb.Received().SetParameterValue("Ip", request.Ip);
                ObjectDb.Received().SetParameterValue("langkey", request.Language);
                ObjectDb.Received().SetParameterValue("IsDefault", metaModel.IsDefaultGroup);
                ObjectDb.Received().SetParameterValue("IsResetDefault", metaModel.IsResetDefault);
                ObjectDb.Received().SetParameterValue("GroupDiscountID", metaModel.GroupCommId);
            });
        }

        [Test]
        public async Task DeleteGroupAsync_WhenCall_ParametersPassedCorrectly()
        {
            // Arrange
            int userId = 1, licenseeId = 11, groupId = 111;
            string ip = "1.1.1.1", language = "en";
            bool isRemoveCommSetting = true, isResetDefault = true;

            DataAccess.GetObjectDb(Arg.Is("Lrf_LicenseeGroupCommDel"), 600).Returns(ObjectDb);

            // Action
            _ = await DataAccess.DeleteGroupAsync(groupId, licenseeId, userId, ip, language, isRemoveCommSetting, isResetDefault).ConfigureAwait(false);

            // Assert
            Assert.Multiple(() =>
            {
                ObjectDb.Received().SetParameterValue("LicenseeId", licenseeId);
                ObjectDb.Received().SetParameterValue("GroupDiscountID", groupId);
                ObjectDb.Received().SetParameterValue("UserId", userId);
                ObjectDb.Received().SetParameterValue("Ip", ip);
                ObjectDb.Received().SetParameterValue("langkey", language);
                ObjectDb.Received().SetParameterValue("IsRemovePlayercomm", isRemoveCommSetting);
                ObjectDb.Received().SetParameterValue("IsResetDefault", isResetDefault);
            });
        }
    }
}