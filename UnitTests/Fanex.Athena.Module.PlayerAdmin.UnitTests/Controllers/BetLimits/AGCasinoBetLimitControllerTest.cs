using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;
using Fanex.Athena.Controllers.Base.UnitTests;
using Fanex.Athena.Model.Auth;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Module.PlayerAdmin.Controllers;
using Fanex.Athena.Module.PlayerAdmin.DTO;
using Fanex.Athena.Module.PlayerAdmin.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
using Fanex.Athena.Resources;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.UnitTest.Common.Helpers;
using Fanex.Athena.VendorAdapter.Interfaces;
using Newtonsoft.Json;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Controllers.BetLimits
{
    [TestFixture]
    public class AGCasinoBetLimitControllerTest : CultureBaseControllerHelperTest
    {
        private IAGCasinoBetLimitService _service;

        private IAuthorizationService _authService;

        private ICacheRefAdapter _cacheRefAdapter;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            _service = Substitute.For<IAGCasinoBetLimitService>();
            _authService = Substitute.For<IAuthorizationService>();
            _cacheRefAdapter = Substitute.For<ICacheRefAdapter>();

            SetUpDefaultFakeData();
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();

            _service = null;
            _authService = null;
            _cacheRefAdapter = null;
        }

        [OneTimeTearDown]
        public void TearDown()
        {
            _service.ClearReceivedCalls();
            _authService.ClearReceivedCalls();
            _cacheRefAdapter.ClearReceivedCalls();
        }

        [TestCase("AGGroup1,AGGroup2,AGGroup3", "AGGroup1", "AGGroup1,AGGroup2,AGGroup3")]
        [TestCase("AGGroup2,AGGroup3", "AGGroup1", "AGGroup1,AGGroup2,AGGroup3")]
        public async Task GetSetting_WhenCall_ReturnCorrectResult(string checkedGroupString, string agGroup, string expectedGroupString)
        {
            // Arrange
            const bool IsEditable = true;
            var metaModel = FakeHelper.Create<PlayerBetLimitSelectMetaModel>();
            _authService.HasPermissions(Arg.Any<UserAuthInfo>(), PermissionKeys.PlayerAdminBetLimit_Write).Returns(IsEditable);

            var groupBettingTask = FakeHelper.Create<Task<IList<AgCasinoGame>>>();
            _service.GetGroupBettingsAsync(SessionService.LicenseeSession.LicenseeName, metaModel.CurrencyId).Returns(groupBettingTask);

            var settingTask = FakeHelper.Create<Task<AgCasinoBetSetting>>();
            _service.GetBetSettingAsync(metaModel.CustId).Returns(settingTask);

            var setting = await settingTask;
            setting.CheckedGroups = checkedGroupString.Split(',');
            setting.AgGroup = agGroup;

            using (var controller = CreateController())
            {
                // Action
                var jsonResult = await controller.GetSetting(metaModel) as JsonResult;
                var result = JsonConvert.SerializeObject(jsonResult.Data);

                setting.CheckedGroups = expectedGroupString.Split(',');
                var expectedData = new
                {
                    Data = await groupBettingTask,
                    BetSetting = setting,
                    Editable = IsEditable && setting.IsEnabled && setting.IsLineEnabled
                };
                var expectedResult = JsonConvert.SerializeObject(expectedData);

                // Assert
                Assert.That(result, Is.EqualTo(expectedResult));
            }
        }

        [Test]
        public async Task UpdateSetting_SettingIsDisabled_ReturnFailedResult()
        {
            // Arrange
            var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<AgCasinoBetLimitMetaModel>>();

            var betSetting = FakeHelper.Create<AgCasinoBetSetting>();
            betSetting.IsEnabled = false;
            _service.GetBetSettingAsync(metaModel.CustId).Returns(Task.FromResult(betSetting));

            var expectedResult = JsonConvert.SerializeObject(new { Code = 1, Message = ViewResources.FunctionDeniedMsg });

            using (var controller = CreateController())
            {
                // Action
                var jsonResult = await controller.UpdateSetting(metaModel) as JsonResult;
                var result = JsonConvert.SerializeObject(jsonResult.Data);

                // Assert
                Assert.That(result, Is.EqualTo(expectedResult));
            }
        }

        [Test]
        public async Task UpdateSetting_ValidDataForSettingAndResultCodeIsZero_ReturnsCorrectResult()
        {
            // Arrange
            var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<AgCasinoBetLimitMetaModel>>();
            var betSetting = FakeHelper.Create<AgCasinoBetSetting>();
            betSetting.IsEnabled = true;
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
                    Assert.That(result.Code, Is.EqualTo(0));
                    Assert.That(result.Message, Is.EqualTo(ViewResources.UpdateSuccess));
                });
            }
        }

        [Test]
        public async Task UpdateSetting_ValidDataForSettingAndResultCodeNotZero_ReturnsCorrectResult()
        {
            // Arrange
            var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<AgCasinoBetLimitMetaModel>>();
            var betSetting = FakeHelper.Create<AgCasinoBetSetting>();
            betSetting.IsEnabled = true;
            _service.GetBetSettingAsync(metaModel.CustId).Returns(Task.FromResult(betSetting));

            IResultInfo expectedResult = new ResultInfo { Code = 0 };
            _service.UpdateSettingAsync(metaModel).Returns(Task.FromResult(expectedResult));

            using (var controller = CreateController())
            {
                // Action
                var result = (await controller.UpdateSetting(metaModel)).Data as ResultInfo;

                // Assert
                Assert.That(result, Is.EqualTo(expectedResult));
            }
        }

        private AGCasinoBetLimitController CreateController()
        {
            return new AGCasinoBetLimitController(
                LangService,
                SessionService,
                _cacheRefAdapter,
                _authService,
                _service)
            {
                ControllerContext = ControllerContext
            };
        }
    }
}