namespace Fanex.Athena.Service.BetSettings.UnitTests
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using BetSettings;

    using DataAccess.BetSettings.Interfaces;

    using Extension.Utility;

    using Fanex.Athena.Model.Core.DTO.Common;

    using Interfaces;

    using Model.BetSettings.DTO.RngCasino;
    using Model.BetSettings.MetaModel;
    using Model.Customer.DTO;

    using NSubstitute;

    using NUnit.Framework;

    using Resources;

    using StatelessCore.Interfaces;

    [TestFixture]
    public partial class RngCasinoBetSettingServiceTest
    {
        private const int CustId = 1;
        private const int CurrencyId = 1;
        private const string Language = "en-US";
        private IAppSettings _appSettings;
        private IRngCasinoBetSettingDataAccess _dataAccess;
        private IRngCasinoBetSettingService _service;
        private ILGAPIClient _lgClient;

        [SetUp]
        public void SetUp()
        {
            _appSettings = Substitute.For<IAppSettings>();
            _dataAccess = Substitute.For<IRngCasinoBetSettingDataAccess>();
            _lgClient = Substitute.For<ILGAPIClient>();
            _service = new RngCasinoBetSettingService(
                _appSettings, _dataAccess, _lgClient);
        }

        [TearDown]
        public void TearDown()
        {
            _appSettings = null;
            _lgClient = null;
            _dataAccess = null;
            _service = null;
        }

        [Test]
        public async Task GetViewModel_CustomerNotSyncCasino_NotCallCasinoSettingAsync()
        {
            // Arrange
            var customer = new CustomerInfo
            {
                SyncCasino = false
            };

            // Action
            var result = await _service.GetViewModelAsync(CustId, customer, string.Empty).ConfigureAwait(false);

            // Assert
            Assert.Multiple(() =>
            {
                _lgClient.DidNotReceiveWithAnyArgs().PostAsync<dynamic>(null, null, null);
                Assert.That(result.GameKinds.Any(), Is.False);
            });
        }

        [Test]
        public async Task GetViewModel_CustomerIsSyncCasino_GetDataFromCasinoSettingAsync()
        {
            // Arrange
            var resultGameKindList = new List<GameKind>
            {
                new GameKind()
            };
            _lgClient.PostAsync<APIResult<IList<GameKind>>>(Arg.Any<string>(), Arg.Any<object>(), Arg.Any<string>()).Returns(
                new APIResult<IList<GameKind>> { Data = resultGameKindList }
                );
            var customer = new CustomerInfo
            {
                SyncCasino = true,
                CurrencyID = CurrencyId
            };

            // Action
            var result = await _service.GetViewModelAsync(CustId, customer, Language).ConfigureAwait(false);

            // Assert
            Assert.Multiple(() =>
            {
                _lgClient.ReceivedWithAnyArgs().PostAsync<APIResult<IList<GameKind>>>(null, null, null);
                Assert.That(result.GameKinds.Count(), Is.EqualTo(resultGameKindList.Count));
            });
        }

        [TestCase(false, true, true)]
        [TestCase(false, false, null)]
        [TestCase(true, false, null)]
        [TestCase(true, true, false)]
        public async Task GetViewModel_CustomerIsSyncCasino_ReturnCorrectIsEnabledAsync(
            bool isDiabledCasino,
            bool isSyncCasino,
            bool? expectedIsEnabled)
        {
            // Arrange
            var customer = new CustomerInfo
            {
                DisableCasino = isDiabledCasino,
                SyncCasino = isSyncCasino
            };

            // Action
            var result = await _service.GetViewModelAsync(CustId, customer, Language).ConfigureAwait(false);

            // Assert
            Assert.That(result.IsEnabled, Is.EqualTo(expectedIsEnabled));
        }

        [Test]
        public async Task UpdateStatusAsync_UpdateSettingIsNotAvailable_ReturnErrorResult()
        {
            // Arrange
            var metaModel = new BetSettingCasinoStatusMetaModel
            {
                CustId = 2,
                IsSyncCasino = false
            };

            // Action
            var result = await _service.UpdateStatusAsync(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                _dataAccess.DidNotReceive().UpdateStatusAsync(metaModel);
                Assert.That(result.IsSuccessful, Is.False);
                Assert.That(result.Message, Is.EqualTo(ViewResources.RNGCasinoUpdateSettingUnAvailableMsg));
            });
        }

        [Test]
        public async Task UpdateStatusAsync_ApiReturnsFalse_ReturnErrorResult()
        {
            // Arrange
            var metaModel = new BetSettingCasinoStatusMetaModel
            {
                CustId = 2,
                IsSyncCasino = true
            };

            _appSettings.IsDisableRngCasino.Returns(false);

            _lgClient.PostAsync<APIResult<bool>>(Arg.Any<string>(), Arg.Any<BetSettingCasinoStatusMetaModel>(), Arg.Any<string>())
                .Returns(new APIResult<bool> { Data = false });

            // Action
            var result = await _service.UpdateStatusAsync(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                _dataAccess.DidNotReceive().UpdateStatusAsync(metaModel);
                Assert.That(result.IsSuccessful, Is.False);
                Assert.That(result.Message, Is.EqualTo(ViewResources.UpdateUnSuccess));
            });
        }

        [Test]
        public async Task UpdateStatusAsync_ApiReturnsTrue_CallDataAccessMethod()
        {
            // Arrange
            var metaModel = new BetSettingCasinoStatusMetaModel
            {
                CustId = 2,
                IsSyncCasino = true
            };

            _appSettings.IsDisableRngCasino.Returns(false);
            _lgClient.PostAsync<APIResult<bool>>(Arg.Any<string>(), Arg.Any<BetSettingCasinoStatusMetaModel>(), Arg.Any<string>())
                .Returns(new APIResult<bool> { Data = true });

            // Action
            await _service.UpdateStatusAsync(metaModel);

            // Assert
            await _dataAccess.Received(1).UpdateStatusAsync(metaModel);
        }

        [Test]
        public async Task UpdateSetting_IsDisableCasino_ReturnErrorResultAsync()
        {
            // Arrange
            var metaModel = new RngCasinoBetSettingMetaModel();

            // Action
            var result = await _service.UpdateSettingAsync(metaModel, false, true).ConfigureAwait(false);

            // Assert
            Assert.Multiple(() =>
            {
                _lgClient.DidNotReceiveWithAnyArgs().PostAsync<dynamic>(null, null, null);
                Assert.That(result.IsSuccessful, Is.False);
                Assert.That(result.Message, Is.EqualTo(ViewResources.AccessDeniedMsg));
            });
        }

        [Test]
        public async Task UpdateSetting_IsNotSyncCasino_ReturnErrorResultAsync()
        {
            // Arrange
            var metaModel = new RngCasinoBetSettingMetaModel
            {
                LicenseeId = 5,
                CustId = 4
            };

            // Action
            var result = await _service.UpdateSettingAsync(metaModel, false, false).ConfigureAwait(false);

            // Assert
            Assert.Multiple(() =>
            {
                _lgClient.DidNotReceiveWithAnyArgs().PostAsync<dynamic>(null, null, null);
                Assert.That(result.IsSuccessful, Is.False);
                Assert.That(result.Message, Is.EqualTo(ViewResources.RNGCasinoUpdateSettingUnAvailableMsg));
            });
        }

        [Test]
        public async Task UpdateSetting_IsDisableRngCasino_ReturnErrorResultAsync()
        {
            // Arrange
            var metaModel = new RngCasinoBetSettingMetaModel
            {
                LicenseeId = 5,
                CustId = 4
            };

            _appSettings.IsDisableRngCasino.Returns(true);

            // Action
            var result = await _service.UpdateSettingAsync(metaModel, true, false).ConfigureAwait(false);

            // Assert
            Assert.Multiple(() =>
            {
                _lgClient.DidNotReceiveWithAnyArgs().PostAsync<dynamic>(null, null, null);
                Assert.That(result.IsSuccessful, Is.False);
                Assert.That(result.Message, Is.EqualTo(ViewResources.RNGCasinoUpdateSettingUnAvailableMsg));
            });
        }

        [Test]
        public async Task UpdateSetting_ValidData_CallDataAccessMethodFail_ReturnErrorResultAsync()
        {
            // Arrange
            var metaModel = new RngCasinoBetSettingMetaModel
            {
                LicenseeId = 5,
                CustId = 4
            };

            _appSettings.IsDisableRngCasino.Returns(false);

            _lgClient.PostAsync<APIResult<bool>>(Arg.Any<string>(), Arg.Any<object>(), Arg.Any<string>())
                .Returns(new APIResult<bool> { Data = false });

            // Action
            var result = await _service.UpdateSettingAsync(metaModel, true, false).ConfigureAwait(false);

            // Assert
            Assert.Multiple(() =>
            {
                _lgClient.ReceivedWithAnyArgs().PostAsync<APIResult<bool>>(null, null, null);
                Assert.That(result.IsSuccessful, Is.False);
                Assert.That(result.Message, Is.EqualTo(ViewResources.Fail));
            });
        }

        [Test]
        public async Task UpdateSetting_ValidData_CallDataAccessMethodSuccessfully_ReturnSuccessfulResultAsync()
        {
            // Arrange
            var metaModel = new RngCasinoBetSettingMetaModel
            {
                LicenseeId = 5,
                CustId = 4
            };

            _appSettings.IsDisableRngCasino.Returns(false);
            _lgClient.PostAsync<APIResult<bool>>(Arg.Any<string>(), Arg.Any<object>(), Arg.Any<string>()).Returns(
                new APIResult<bool> { Data = true });

            // Action
            var result = await _service.UpdateSettingAsync(metaModel, true, false).ConfigureAwait(false);

            // Assert
            Assert.Multiple(() =>
            {
                _lgClient.ReceivedWithAnyArgs().PostAsync<APIResult<bool>>(null, null, null);
                Assert.That(result.IsSuccessful, Is.True);
                Assert.That(result.Message, Is.EqualTo(ViewResources.MessageSuccess));
            });
        }
    }
}