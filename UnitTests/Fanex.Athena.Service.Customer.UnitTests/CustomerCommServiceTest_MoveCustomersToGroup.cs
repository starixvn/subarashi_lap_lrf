namespace Fanex.Athena.Service.Customer.UnitTests
{
    using System;
    using System.Threading.Tasks;
    using Model.Core.DTO.Common;
    using Model.Customer.MetaModel;

    using NSubstitute;

    using NUnit.Framework;

    using UnitTest.Common.Helpers;

    [TestFixture]
    public partial class CustomerCommServiceTest
    {
        [Test]
        public async Task MoveCustomersToGroupAsync_GroupDoesNotExists_NotCallMoveCustomersToGroup()
        {
            // Arrange
            var metaModel = FakeHelper.Create<MoveToGroupComMetaModel>();
            _groupCommDataAccess.GetById(metaModel.GroupComId, Arg.Any<int>()).Returns(x => null);

            // Action
            var result = await _customerCommService.MoveCustomersToGroupAsync(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                _customerCommDataAccess.DidNotReceiveWithAnyArgs().MoveCustomersToGroupAsync(null);
                Assert.That(result.IsSuccessful, Is.False);
            });
        }

        [Test]
        public async Task MoveCustomersToGroupAsync_CallDataAccessFailed_NotCallApi()
        {
            // Arrange
            var metaModel = FakeHelper.Create<MoveToGroupComMetaModel>();

            _groupCommDataAccess.GetById(metaModel.GroupComId, metaModel.LicenseeId).Returns(FakeHelper.Create<GroupCommMetaModel>());
            _customerCommDataAccess.MoveCustomersToGroupAsync(metaModel).Returns(Task.FromResult<IResultInfo>(new ResultInfo
            {
                Code = Math.Abs(FakeHelper.Create<int>()) + 1,
                Message = FakeHelper.Create<string>()
            }));

            // Action
            var result = await _customerCommService.MoveCustomersToGroupAsync(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                _lgClient.DidNotReceive().PostAsync<APIResult<bool>>(Arg.Any<string>(), Arg.Any<RNGCasinoUpdateMemberComMetaModel>(), Arg.Any<string>());
                Assert.That(result.IsSuccessful, Is.False);
            });
        }

        [Test]
        public async Task MoveCustomersToGroupAsync_IsAllowedRNGTrue_CallApiUpdateComm()
        {
            // Arrange
            var metaModel = FakeHelper.Create<MoveToGroupComMetaModel>();
            metaModel.IsAllowedRNG = true;

            _groupCommDataAccess.GetById(metaModel.GroupComId, metaModel.LicenseeId).Returns(FakeHelper.Create<GroupCommMetaModel>());

            var expectedResult = new ResultInfo { ExtendedData = "1,2,3" };
            _customerCommDataAccess.MoveCustomersToGroupAsync(metaModel).Returns(Task.FromResult<IResultInfo>(expectedResult));

            _lgClient.PostAsync<APIResult<bool>>(Arg.Any<string>(), Arg.Any<RNGCasinoUpdateMemberComMetaModel>(), Arg.Any<string>())
                .Returns(new APIResult<bool> { Data = true });
            // Action
            var result = await _customerCommService.MoveCustomersToGroupAsync(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                _lgClient.Received(1).PostAsync<APIResult<bool>>(Arg.Any<string>(), Arg.Any<RNGCasinoUpdateMemberComMetaModel>(), Arg.Any<string>());
                Assert.That(result, Is.EqualTo(expectedResult));
            });
        }

        [Test]
        public async Task MoveCustomersToGroupAsync_IsAllowedRNGTrue_CustomerIdListIsEmpty_NotCallApiUpdateComm()
        {
            // Arrange
            var metaModel = FakeHelper.Create<MoveToGroupComMetaModel>();
            _groupCommDataAccess.GetById(metaModel.GroupComId, metaModel.LicenseeId).Returns(FakeHelper.Create<GroupCommMetaModel>());

            var expectedResult = new ResultInfo { ExtendedData = string.Empty };
            _customerCommDataAccess.MoveCustomersToGroupAsync(metaModel).Returns(Task.FromResult<IResultInfo>(expectedResult));

            // Action
            var result = await _customerCommService.MoveCustomersToGroupAsync(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                _lgClient.DidNotReceive().PostAsync<APIResult<bool>>(Arg.Any<string>(), Arg.Any<RNGCasinoUpdateMemberComMetaModel>(), Arg.Any<string>());
                Assert.That(result, Is.EqualTo(expectedResult));
            });
        }
    }
}