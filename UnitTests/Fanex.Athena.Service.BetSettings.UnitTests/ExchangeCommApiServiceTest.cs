namespace Fanex.Athena.Service.BetSettings.UnitTests
{
    using System.Threading.Tasks;

    using DataAccess.BetSettings.Interfaces;
    using DataAccess.Core.Common.Constants;
    using DataAccess.Core.Common.Interfaces;

    using Extension.Utility;
    using Fanex.Athena.Model.BetSettings.DTO.Exchange;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Logging;

    using Model.Core.DataDomain;
    using Model.Core.MetaModel.Common;

    using NSubstitute;

    using NUnit.Framework;

    using StatelessCore.Interfaces;

    using UnitTest.Common.Helpers;

    [TestFixture]
    public partial class ExchangeCommApiServiceTest
    {
        private readonly int _custId = FakeHelper.Create<int>();
        private readonly int _userId = FakeHelper.Create<int>();

        private ISPLogDataAccess _userLogDataAccess;
        private IDcsBetSettingDataAccess _betSettingDataAccess;
        private IAppSettings _appSetting;
        private ILGAPIClient _lgClient;
        private ExchangeCommApiService _service;

        [SetUp]
        public void Setup()
        {
            _userLogDataAccess = Substitute.For<ISPLogDataAccess>();
            _betSettingDataAccess = Substitute.For<IDcsBetSettingDataAccess>();
            _appSetting = Substitute.For<IAppSettings>();
            _lgClient = Substitute.For<ILGAPIClient>();
            _service = new ExchangeCommApiService(_userLogDataAccess, _betSettingDataAccess, _appSetting, _lgClient);

            _appSetting.Environment.Returns("PRO");
        }

        [TearDown]
        public void TearDown()
        {
            _userLogDataAccess = null;
            _appSetting = null;
            _lgClient = null;
            _service = null;
        }

        [TestCase(1, true)]
        [TestCase(0, false)]
        [TestCase(2, false)]
        public async Task GetCommission_WhenCall_ReturnCorrectResult(int returnStatus, bool isSuccess)
        {
            // Arrange
            const string apiPath = "/Exchange/GetCommission";
            const string Language = "en-US";
            var expectedComm = FakeHelper.Create<double>();
            _lgClient.PostAsync<APIResult<ExchangeCommission>>(apiPath, Arg.Any<object>(), Language).Returns(Task.FromResult(
                new APIResult<ExchangeCommission>
                {
                    Data = new ExchangeCommission { Status = returnStatus, Commission = expectedComm }
                }));

            // Action
            var result = await _service.GetCommission(_custId, Language);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.IsSuccessful, Is.EqualTo(isSuccess));
                Assert.That(result.ExtendedData, Is.EqualTo(expectedComm));
            });
        }

        [TestCase(false)]
        [TestCase(null)]
        public async Task UpdateCommissionAsync_StatusIsNotEnable_ReturnFailedResultAsync(bool? isEnable)
        {
            // Arrange
            _betSettingDataAccess.GetStatusAsync(0, 0).ReturnsForAnyArgs(Task.FromResult(isEnable));
            const string Language = "en-US";

            // Action
            var result = await _service.UpdateCommissionAsync(_userId, _custId, 0, 0, Language);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.IsSuccessful, Is.False);
                _lgClient.DidNotReceiveWithAnyArgs().PostAsync<APIResult<ExchangeCommission>>(Arg.Any<string>(), Arg.Any<object>(), Arg.Any<string>());
            });
        }

        [TestCase(1, true)]
        [TestCase(0, false)]
        [TestCase(2, false)]
        public async Task UpdateCommissionAsync_WhenCall_ReturnCorrectResultAsync(int returnStatus, bool isSuccess)
        {
            // Arrange
            var expectedComm = FakeHelper.Create<double>();
            _betSettingDataAccess.GetStatusAsync(_custId, ProductTypes.Exchange).Returns(Task.FromResult((bool?)true));

            const string apiPath = "/Exchange/UpdateCommission";
            const string Language = "en-US";
            _lgClient.PostAsync<APIResult<ExchangeCommission>>(apiPath, Arg.Any<object>(), Language).Returns(Task.FromResult(
                new APIResult<ExchangeCommission>
                {
                    Data = new ExchangeCommission { Status = returnStatus, Commission = expectedComm }
                }));

            // Action
            var result = await _service.UpdateCommissionAsync(_userId, _custId, 0, expectedComm, Language);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.IsSuccessful, Is.EqualTo(isSuccess));
                Assert.That(result.ExtendedData, Is.EqualTo(expectedComm));
            });
        }

        [Test]
        public async Task UpdateCommissionAsync_CallApiSuccess_CallWriteLogRunSP()
        {
            // Arrange
            var oldComm = FakeHelper.Create<double>();
            var newComm = FakeHelper.Create<double>();
            _betSettingDataAccess.GetStatusAsync(_custId, ProductTypes.Exchange).ReturnsForAnyArgs(Task.FromResult((bool?)true));

            const string apiPath = "/Exchange/UpdateCommission";
            const string Language = "en-US";
            _lgClient.PostAsync<APIResult<ExchangeCommission>>(apiPath, Arg.Any<object>(), Language).Returns(Task.FromResult(
                new APIResult<ExchangeCommission>
                {
                    Data = new ExchangeCommission { Status = 1, Commission = 5.5d }
                }));

            // Action
            var result = await _service.UpdateCommissionAsync(_userId, _custId, oldComm, newComm, Language);

            // Assert
            Assert.Multiple(() =>
            {
                _userLogDataAccess.Received(1).WriteLog(Arg.Is<SPLogMetaModel>(x =>
                    x.ActionID == UserLogAction.ExchangeCommission &&
                    x.UserId == _userId &&
                    x.CustID == _custId &&
                    x.Doing == $"<ChargeCommission OldValue='{oldComm}' NewValue='{newComm}' />"));
            });
        }
    }
}