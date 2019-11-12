namespace Fanex.Athena.Service.Customer.UnitTests
{
    using System;
    using System.Threading.Tasks;

    using Customer;

    using DataAccess.Customer.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.Core.DTO.Common;
    using Model.Customer.MetaModel;

    using NSubstitute;

    using NUnit.Framework;

    using UnitTest.Common.Helpers;

    [TestFixture]
    public partial class CustomerCommServiceTest
    {
        private ICustomerCommDataAccess _customerCommDataAccess;

        private IGroupComDataAccess _groupCommDataAccess;

        private CustomerCommService _customerCommService;
        private ILGAPIClient _lgClient;

        [SetUp]
        public void SetUp()
        {
            _lgClient = Substitute.For<ILGAPIClient>();
            _customerCommDataAccess = Substitute.For<ICustomerCommDataAccess>();
            _groupCommDataAccess = Substitute.For<IGroupComDataAccess>();

            _customerCommService = new CustomerCommService(
                _customerCommDataAccess,
                _groupCommDataAccess,
                _lgClient);
        }

        [TearDown]
        public void TearDown()
        {
            _customerCommDataAccess = null;
            _groupCommDataAccess = null;
            _customerCommService = null;
            _lgClient = null;
        }

        [Test]
        public async Task UpdateCustomersCommission_UpdateFailed_ReturnCorrectResultInfo()
        {
            // Arrange
            var expectedResult = new ResultInfo { Code = Math.Abs(FakeHelper.Create<int>()) + 1, Message = FakeHelper.Create<string>() };
            _customerCommDataAccess.UpdateCustomersCommissionAsync(Arg.Any<UpdatedCustomerComMetaModel>()).Returns(Task.FromResult<IResultInfo>(expectedResult));

            // Action
            var result = await _customerCommService.UpdateCustomersCommissionAsync(new UpdatedCustomerComMetaModel(), false);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.IsSuccessful, Is.False);
                Assert.That(result, Is.EqualTo(expectedResult));
            });
        }

        [Test]
        public async Task UpdateCustomersCommissionAsync_UpdateSuccessfully_ReturnCorrectResultInfo()
        {
            // Arrange
            var expectedResult = new ResultInfo { Code = 0, Message = null };
            _customerCommDataAccess.UpdateCustomersCommissionAsync(Arg.Any<UpdatedCustomerComMetaModel>()).Returns(Task.FromResult<IResultInfo>(expectedResult));

            // Action
            var result = await _customerCommService.UpdateCustomersCommissionAsync(new UpdatedCustomerComMetaModel(), false);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.IsSuccessful, Is.True);
                Assert.That(result, Is.EqualTo(expectedResult));
            });
        }

        [Test]
        public async Task UpdateCustomersCommissionAsync_IsSyncCSComm_CallApiSuccess_ReturnCorrectResultInfo()
        {
            // Arrange
            var isSyncCSComm = true;
            var metaModel = FakeHelper.Create<UpdatedCustomerComMetaModel>();

            var expectedResult = new ResultInfo { ExtendedData = "1,2,3" };
            _customerCommDataAccess.UpdateCustomersCommissionAsync(metaModel).Returns(Task.FromResult<IResultInfo>(expectedResult));

            _lgClient.PostAsync<APIResult<bool>>(Arg.Any<string>(), Arg.Any<RNGCasinoUpdateMemberComMetaModel>(), Arg.Any<string>())
                .Returns(new APIResult<bool> { Data = true });

            // Action
            var result = await _customerCommService.UpdateCustomersCommissionAsync(metaModel, isSyncCSComm);

            // Assert
            Assert.That(result, Is.EqualTo(expectedResult));
        }

        [Test]
        public async Task UpdateCustomersCommissionAsync_IsSyncCSComm_CallApiFailed_ReturnCorrectResultInfo()
        {
            // Arrange
            var isSyncCSComm = true;
            var metaModel = FakeHelper.Create<UpdatedCustomerComMetaModel>();

            var resultInfo = new ResultInfo { ExtendedData = "1" };
            _customerCommDataAccess.UpdateCustomersCommissionAsync(metaModel).Returns(Task.FromResult<IResultInfo>(resultInfo));
            _lgClient.PostAsync<APIResult<bool>>(Arg.Any<string>(), Arg.Any<RNGCasinoUpdateMemberComMetaModel>(), Arg.Any<string>())
                .Returns(new APIResult<bool> { Data = false });
            var expectedResult = new ResultInfo
            {
                Code = 1,
                Message = "Having errors when calling CasinoAPI to update customer commission."
            };

            // Action
            var result = await _customerCommService.UpdateCustomersCommissionAsync(metaModel, isSyncCSComm);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Code, Is.EqualTo(expectedResult.Code));
                Assert.That(result.Message, Is.EqualTo(expectedResult.Message));
            });
        }

        [Test]
        public async Task UpdateCustomersCommissionAsync_IsSyncCSComm_CustomerIdsIsEmpty_NotCallApi_ReturnCorrectResultInfo()
        {
            // Arrange
            var isSyncCSComm = true;
            var expectedResult = new ResultInfo();
            _customerCommDataAccess.UpdateCustomersCommissionAsync(Arg.Any<UpdatedCustomerComMetaModel>()).Returns(Task.FromResult<IResultInfo>(expectedResult));

            // Action
            var result = await _customerCommService.UpdateCustomersCommissionAsync(new UpdatedCustomerComMetaModel(), isSyncCSComm);

            // Assert
            Assert.Multiple(() =>
            {
                _lgClient.DidNotReceive().PostAsync<APIResult<bool>>(Arg.Any<string>(), Arg.Any<RNGCasinoUpdateMemberComMetaModel>(), Arg.Any<string>());
                Assert.That(result, Is.EqualTo(expectedResult));
            });
        }
    }
}