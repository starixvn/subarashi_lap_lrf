using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Fanex.Athena.Controllers.Base.UnitTests;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Module.PlayerAdmin.Controllers;
using Fanex.Athena.Module.PlayerAdmin.DTO;
using Fanex.Athena.Module.PlayerAdmin.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
using Fanex.Athena.Resources;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.UnitTest.Common.Extensions;
using Fanex.Athena.UnitTest.Common.Helpers;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Controllers.BetLimits
{
    [TestFixture]
    public class AGCasinoBetLimitControllerTest : CultureBaseControllerHelperTest
    {
        private IAGCasinoBetLimitService _service;

        private IAuthorizationService _authService;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            _service = Substitute.For<IAGCasinoBetLimitService>();
            _authService = Substitute.For<IAuthorizationService>();

            SetUpDefaultFakeData();
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();

            _service = null;
            _authService = null;
        }

        [TestCase("AGGroup1,AGGroup2,AGGroup3", "AGGroup1", "AGGroup1,AGGroup2,AGGroup3")]
        [TestCase("AGGroup2,AGGroup3", "AGGroup1", "AGGroup1,AGGroup2,AGGroup3")]
        public async Task GetSetting_WhenCall_ReturnCorrectSettingData(string checkedGroupString, string agGroup, string expectedGroupString)
        {
            // Arrange
            var metaModel = FakeHelper.Create<PlayerBetLimitSelectMetaModel>();

            var groupBetting = FakeHelper.CreateMany<AgCasinoGame>().ToList();
            _service.GetGroupBettingsAsync(SessionService.LicenseeSession.LicenseeName, metaModel.CurrencyId)
                .Returns(Task.FromResult<IList<AgCasinoGame>>(groupBetting));

            var setting = FakeHelper.Create<AgCasinoBetSetting>(x => x.CheckedGroups, checkedGroupString.Split(','));
            setting.AgGroup = agGroup;
            _service.GetBetSettingAsync(metaModel.CustId).Returns(Task.FromResult(setting));

            using (var controller = CreateController())
            {
                // Action
                var result = (await controller.GetSetting(metaModel)).Data;
                var actualBetSetting = (AgCasinoBetSetting)result.GetValue("BetSetting");

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.GetValue("Data"), Is.EqualTo(groupBetting));
                    Assert.That(string.Join(",", actualBetSetting.CheckedGroups), Is.EqualTo(expectedGroupString));
                });
            }
        }

        [TestCase(false, false, false, false)]
        [TestCase(true, true, true, true)]
        [TestCase(true, false, true, false)]
        [TestCase(false, true, true, false)]
        [TestCase(true, true, false, false)]
        public async Task GetSetting_WhenCall_ReturnCorrectEditableStatus(bool hasPermision, bool isEnabled, bool isLineEnabled, bool expected)
        {
            // Arrange
            var metaModel = FakeHelper.Create<PlayerBetLimitSelectMetaModel>();

            _authService.HasPermissions(DefaultUserSession, PermissionKeys.PlayerAdminBetLimit_Write).Returns(hasPermision);

            var groupBetting = FakeHelper.CreateMany<AgCasinoGame>().ToList();
            _service.GetGroupBettingsAsync(SessionService.LicenseeSession.LicenseeName, metaModel.CurrencyId)
                .Returns(Task.FromResult<IList<AgCasinoGame>>(groupBetting));

            var setting = FakeHelper.Create<AgCasinoBetSetting>(x => x.CheckedGroups, Enumerable.Empty<string>());
            setting.IsEnabled = isEnabled;
            setting.IsLineEnabled = isLineEnabled;
            _service.GetBetSettingAsync(metaModel.CustId).Returns(Task.FromResult(setting));

            using (var controller = CreateController())
            {
                // Action
                var result = (await controller.GetSetting(metaModel)).Data;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.GetValue("Editable"), Is.EqualTo(expected));
                });
            }
        }

        [Test]
        public async Task UpdateSetting_SettingIsDisabled_ReturnFailedResult()
        {
            // Arrange
            var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<AgCasinoBetLimitMetaModel>>();

            var betSetting = FakeHelper.Create<AgCasinoBetSetting>(x => x.IsEnabled, false);
            _service.GetBetSettingAsync(metaModel.CustId).Returns(Task.FromResult(betSetting));

            var expectedResult = new { Code = 1, Message = ViewResources.FunctionDeniedMsg };

            using (var controller = CreateController())
            {
                // Action
                var result = (await controller.UpdateSetting(metaModel)).Data as ResultInfo;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.Code, Is.EqualTo(expectedResult.Code));
                    Assert.That(result.Message, Is.EqualTo(expectedResult.Message));
                });
            }
        }

        [Test]
        public async Task UpdateSetting_UpdateSuccessfully_ReturnsSuccessResult()
        {
            // Arrange
            var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<AgCasinoBetLimitMetaModel>>();

            var betSetting = FakeHelper.Create<AgCasinoBetSetting>(x => x.IsEnabled, true);
            _service.GetBetSettingAsync(metaModel.CustId).Returns(Task.FromResult(betSetting));

            IResultInfo expectedResult = new ResultInfo { Code = 0 };
            _service.UpdateSettingAsync(metaModel).Returns(Task.FromResult(expectedResult));

            using (var controller = CreateController())
            {
                // Action
                var result = (await controller.UpdateSetting(metaModel)).Data as ResultInfo;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.Code, Is.EqualTo(expectedResult.Code));
                    Assert.That(result.Message, Is.EqualTo(ViewResources.UpdateSuccess));
                });
            }
        }

        [Test]
        public async Task UpdateSetting_UpdateFailed_ReturnsFailedResult()
        {
            // Arrange
            var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<AgCasinoBetLimitMetaModel>>();

            var betSetting = FakeHelper.Create<AgCasinoBetSetting>(x => x.IsEnabled, true);
            _service.GetBetSettingAsync(metaModel.CustId).Returns(Task.FromResult(betSetting));

            IResultInfo expectedResult = new ResultInfo { Code = 0, Message = "Error" };
            _service.UpdateSettingAsync(metaModel).Returns(Task.FromResult(expectedResult));

            using (var controller = CreateController())
            {
                // Action
                var result = (await controller.UpdateSetting(metaModel)).Data as ResultInfo;

                // Assert
                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.Code, Is.EqualTo(expectedResult.Code));
                    Assert.That(result.Message, Is.EqualTo(expectedResult.Message));
                });
            }
        }

        private AGCasinoBetLimitController CreateController()
        {
            var result = new AGCasinoBetLimitController(_service)
            {
                ControllerContext = ControllerContext,
                AuthServiceInstance = _authService,
                LangService = LangService,
                SessionServiceInstance = SessionService
            };

            return result;
        }
    }
}