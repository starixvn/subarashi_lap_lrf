namespace Fanex.Athena.Service.Customer.UnitTests
{
    using System.Threading.Tasks;
    using DataAccess.Customer.Interfaces;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.Core.DTO.Common;
    using Model.Customer.MetaModel;

    using NSubstitute;

    using NUnit.Framework;

    using UnitTest.Common.Helpers;

    [TestFixture]
    public class GroupComServiceTest
    {
        private IGroupComDataAccess _groupDataAccess;

        private GroupComService _groupComService;
        private ILGAPIClient _lgClient;

        [SetUp]
        public void SetUp()
        {
            _lgClient = Substitute.For<ILGAPIClient>();

            _groupDataAccess = Substitute.For<IGroupComDataAccess>();
            _groupComService = new GroupComService(_groupDataAccess, _lgClient);
        }

        [TearDown]
        public void TearDown()
        {
            _groupDataAccess = null;
            _groupComService = null;
        }

        [Test]
        public void GetAll_WhenCall_ReturnDataFromDataAccess()
        {
            // Arrange
            var licenseeId = FakeHelper.Create<int>();

            // Action
            _groupComService.GetAllAsync(licenseeId);

            // Assert
            _groupDataAccess.Received().GetAllAsync(licenseeId);
        }

        [Test]
        public async Task GetDataForExcel_WhenCall_ReturnDataFromDataAccessAsync()
        {
            // Arrange
            var licenseeId = FakeHelper.Create<int>();

            // Action
            _ = await _groupComService.GetDataForExcelAsync(licenseeId);

            // Assert
            _ = await _groupDataAccess.Received().GetDataForExcelAsync(licenseeId);
        }

        [Test]
        public void GetById_WhenCall_ReturnDataFromDataAccess()
        {
            // Arrange
            var groupCommId = FakeHelper.Create<int>();
            var licenseeId = FakeHelper.Create<int>();

            // Action
            _groupComService.GetById(groupCommId, licenseeId);

            // Assert
            _groupDataAccess.Received().GetById(groupCommId, licenseeId);
        }

        [Test]
        public async Task InsertGroup_WhenCall_ReturnDataFromDataAccessAsync()
        {
            // Arrange
            var item = FakeHelper.Create<GroupCommMetaModel>();
            var request = FakeHelper.Create<Request>();
            var userId = FakeHelper.Create<int>();

            // Action
            await _groupComService.InsertGroupAsync(item, request, userId);

            // Assert
            _ = await _groupDataAccess.Received().InsertGroupAsync(item, request, userId);
        }

        [Test]
        public async Task UpdateGroup_IsNotUpdateCS_NotCallCasinoApi()
        {
            // Arrange
            var groupCommMetaModel = new GroupCommMetaModel { IsUpdateCS = false };
            var userSession = FakeHelper.Create<UserAuthInfo>();
            var request = FakeHelper.Create<Request>();

            var expectedResult = FakeHelper.Create<ResultInfo>();
            _groupDataAccess.UpdateGroupAsync(groupCommMetaModel, request, userSession.UserId)
                .Returns(expectedResult);

            // Action
            var result = await _groupComService.UpdateGroupAsync(groupCommMetaModel, request, userSession);

            // Assert
            Assert.Multiple(() =>
            {
                _lgClient.DidNotReceive().PostAsync<APIResult<bool>>(Arg.Any<string>(), Arg.Any<RNGCasinoUpdateMemberComMetaModel>(), Arg.Any<string>());
                Assert.That(result, Is.EqualTo(expectedResult));
            });
        }

        [Test]
        public async Task UpdateGroup_IsUpdateCS_CustomerListIsEmpty_NotCallCasinoApi()
        {
            // Arrange
            var newItem = new GroupCommMetaModel { IsUpdateCS = true };
            var userSession = FakeHelper.Create<UserAuthInfo>();
            var request = FakeHelper.Create<Request>();

            var expectedResult = new ResultInfo { ExtendedData = string.Empty };
            _groupDataAccess.UpdateGroupAsync(newItem, request, userSession.UserId)
                .Returns(expectedResult);

            // Action
            var result = await _groupComService.UpdateGroupAsync(newItem, request, userSession);

            // Assert
            Assert.Multiple(() =>
            {
                _lgClient.DidNotReceive().PostAsync<APIResult<bool>>(Arg.Any<string>(), Arg.Any<RNGCasinoUpdateMemberComMetaModel>(), Arg.Any<string>());
                Assert.That(result, Is.EqualTo(expectedResult));
            });
        }

        [Test]
        public async Task UpdateGroup_IsUpdateCS_CallCasinoApi()
        {
            // Arrange
            var newItem = new GroupCommMetaModel { IsUpdateCS = true };
            var userSession = FakeHelper.Create<UserAuthInfo>();
            var request = FakeHelper.Create<Request>();

            var expectedResult = new ResultInfo { ExtendedData = "1,2,3" };
            _groupDataAccess.UpdateGroupAsync(newItem, request, userSession.UserId)
                .Returns(expectedResult);

            _lgClient.PostAsync<APIResult<bool>>(Arg.Any<string>(), Arg.Any<RNGCasinoUpdateMemberComMetaModel>(),
                Arg.Any<string>()).Returns(new APIResult<bool> { Data = true });

            // Action
            var result = await _groupComService.UpdateGroupAsync(newItem, request, userSession);

            // Assert
            Assert.Multiple(() =>
            {
                _lgClient.Received().PostAsync<APIResult<bool>>(Arg.Any<string>(), Arg.Is<RNGCasinoUpdateMemberComMetaModel>(
                    x => x.Comm == newItem.CSComm
                        && x.FromIp == request.Ip
                        && string.Join(",", x.CustomerId) == expectedResult.ExtendedData
                        && x.ModifyBy == userSession.UserId
                        && x.ModifyUserName == userSession.UserName), Arg.Any<string>());
                Assert.That(result, Is.EqualTo(expectedResult));
            });
        }

        [Test]
        public async Task UpdateGroup_IsUpdateCS_CallCasinoApiFailed_ReturnErrorResult()
        {
            // Arrange
            var newItem = new GroupCommMetaModel { IsUpdateCS = true };
            var userSession = FakeHelper.Create<UserAuthInfo>();
            var request = FakeHelper.Create<Request>();

            _groupDataAccess.UpdateGroupAsync(newItem, request, userSession.UserId)
                .Returns(new ResultInfo { ExtendedData = "1,2,3" });
            _lgClient.PostAsync<APIResult<bool>>(Arg.Any<string>(), Arg.Any<RNGCasinoUpdateMemberComMetaModel>(),
    Arg.Any<string>()).Returns(new APIResult<bool> { Data = false });
            var expectedResult = new ResultInfo
            {
                Code = 1,
                Message = "Having errors when calling CasinoAPI to update customer commission."
            };

            // Action
            var result = await _groupComService.UpdateGroupAsync(newItem, request, userSession);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Code, Is.EqualTo(expectedResult.Code));
                Assert.That(result.Message, Is.EqualTo(expectedResult.Message));
            });
        }

        [Test]
        public async Task DeleteGroup_IsNotRemoveCommSettingIsFalse_NotCallCasinoApi()
        {
            // Arrange
            var metaModel = FakeHelper.Create<DeleteGroupMetaModel>();
            metaModel.IsRemoveCommSetting = false;

            var expectedResult = FakeHelper.Create<ResultInfo>();
            _groupDataAccess.DeleteGroupAsync(
                metaModel.GroupId,
                metaModel.LicenseeId,
                metaModel.UserId,
                metaModel.Ip,
                metaModel.Language,
                metaModel.IsRemoveCommSetting,
                metaModel.IsResetDefault)
            .Returns(expectedResult);

            // Action
            var result = await _groupComService.DeleteGroupAsync(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                _lgClient.DidNotReceive().PostAsync<APIResult<bool>>(Arg.Any<string>(),
                    Arg.Any<RNGCasinoUpdateMemberComMetaModel>(), Arg.Any<string>()); Assert.That(result, Is.EqualTo(expectedResult));
            });
        }

        [Test]
        public async Task DeleteGroup_IsNotAllowedCSComm_NotCallCasinoApi()
        {
            // Arrange
            var metaModel = FakeHelper.Create<DeleteGroupMetaModel>();
            metaModel.IsAllowedCSComm = false;

            var expectedResult = FakeHelper.Create<ResultInfo>();
            _groupDataAccess.DeleteGroupAsync(
                metaModel.GroupId,
                metaModel.LicenseeId,
                metaModel.UserId,
                metaModel.Ip,
                metaModel.Language,
                metaModel.IsRemoveCommSetting,
                metaModel.IsResetDefault)
            .Returns(expectedResult);

            // Action
            var result = await _groupComService.DeleteGroupAsync(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                _lgClient.DidNotReceive().PostAsync<APIResult<bool>>(Arg.Any<string>(),
                    Arg.Any<RNGCasinoUpdateMemberComMetaModel>(), Arg.Any<string>());
                Assert.That(result, Is.EqualTo(expectedResult));
            });
        }

        [Test]
        public async Task DeleteGroup_CusttomerListIsEmpty_NotCallCasinoApi()
        {
            // Arrange
            var metaModel = FakeHelper.Create<DeleteGroupMetaModel>();
            metaModel.IsAllowedCSComm = true;
            metaModel.IsRemoveCommSetting = true;

            var expectedResult = new ResultInfo { ExtendedData = string.Empty };
            _groupDataAccess.DeleteGroupAsync(
                metaModel.GroupId,
                metaModel.LicenseeId,
                metaModel.UserId,
                metaModel.Ip,
                metaModel.Language,
                metaModel.IsRemoveCommSetting,
                metaModel.IsResetDefault)
            .Returns(expectedResult);

            // Action
            var result = await _groupComService.DeleteGroupAsync(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                _lgClient.DidNotReceive().PostAsync<APIResult<bool>>(Arg.Any<string>(),
                    Arg.Any<RNGCasinoUpdateMemberComMetaModel>(), Arg.Any<string>());
                Assert.That(result, Is.EqualTo(expectedResult));
            });
        }

        [Test]
        public async Task DeleteGroup_IsUpdateCS_CallCasinoApi()
        {
            // Arrange
            var metaModel = FakeHelper.Create<DeleteGroupMetaModel>();
            metaModel.IsAllowedCSComm = true;
            metaModel.IsRemoveCommSetting = true;

            var expectedResult = new ResultInfo { ExtendedData = "1,2,3" };
            _groupDataAccess.DeleteGroupAsync(
                metaModel.GroupId,
                metaModel.LicenseeId,
                metaModel.UserId,
                metaModel.Ip,
                metaModel.Language,
                metaModel.IsRemoveCommSetting,
                metaModel.IsResetDefault)
            .Returns(expectedResult);

            _lgClient.PostAsync<APIResult<bool>>(Arg.Any<string>(), Arg.Any<RNGCasinoUpdateMemberComMetaModel>(),
                Arg.Any<string>()).Returns(new APIResult<bool> { Data = true });
            // Action
            var result = await _groupComService.DeleteGroupAsync(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                _lgClient.Received().PostAsync<APIResult<bool>>(Arg.Any<string>(), Arg.Is<RNGCasinoUpdateMemberComMetaModel>(
                    x => x.Comm == 0
                        && string.Join(",", x.CustomerId) == expectedResult.ExtendedData
                        && x.FromIp == metaModel.Ip
                        && x.ModifyBy == metaModel.UserId
                        && x.ModifyUserName == metaModel.UserName), Arg.Any<string>());
                Assert.That(result, Is.EqualTo(expectedResult));
            });
        }

        [Test]
        public async Task DeleteGroup_IsUpdateCS_CallCasinoApiFailed_ReturnErrorResult()
        {
            // Arrange
            var metaModel = FakeHelper.Create<DeleteGroupMetaModel>();
            metaModel.IsAllowedCSComm = true;
            metaModel.IsRemoveCommSetting = true;

            _groupDataAccess.DeleteGroupAsync(
                metaModel.GroupId,
                metaModel.LicenseeId,
                metaModel.UserId,
                metaModel.Ip,
                metaModel.Language,
                metaModel.IsRemoveCommSetting,
                metaModel.IsResetDefault)
            .Returns(new ResultInfo { ExtendedData = "1,2,3" });

            _lgClient.PostAsync<APIResult<bool>>(Arg.Any<string>(), Arg.Any<RNGCasinoUpdateMemberComMetaModel>(),
                      Arg.Any<string>()).Returns(
new APIResult<bool> { Data = false });

            var expectedResult = new ResultInfo { Code = 1, Message = "Having errors when calling CasinoAPI to update customer commission." };

            // Action
            var result = await _groupComService.DeleteGroupAsync(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Code, Is.EqualTo(expectedResult.Code));
                Assert.That(result.Message, Is.EqualTo(expectedResult.Message));
            });
        }

        [Test]
        public void CheckByName_WhenCall_ReturnDataFromDataAccess()
        {
            // Arrange
            var licenseeId = FakeHelper.Create<int>();
            var groupName = FakeHelper.Create<string>();

            // Action
            _groupComService.CheckExistingGroupByName(licenseeId, groupName);

            // Assert
            _groupDataAccess.Received().CheckByName(licenseeId, groupName);
        }
    }
}