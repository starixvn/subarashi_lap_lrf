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

        [SetUp]
        public void SetUp()
        {
            base.FixtureSetUp();

            _service = Substitute.For<IAGCasinoBetLimitService>();
            _authService = Substitute.For<IAuthorizationService>();
            _cacheRefAdapter = Substitute.For<ICacheRefAdapter>();

            SetUpDefaultFakeData();
        }

        [TearDown]
        public void TearDown()
        {
            base.FixtureTearDown();

            _service = null;
            _authService = null;
            _cacheRefAdapter = null;
        }

        [TestCase("AGGroup1,AGGroup2,AGGroup3", "AGGroup1", "AGGroup1,AGGroup2,AGGroup3")]
        [TestCase("AGGroup2,AGGroup3", "AGGroup1", "AGGroup1,AGGroup2,AGGroup3")]
        public async Task GetSetting_WhenCall_ReturnCorrectResult(string checkedGroupString, string agGroup, string expectedGroupString)
        {
            // Arrange
            const bool IsEditable = true;
            var metaModel = FakeHelper.Create<PlayerBetLimitSelectMetaModel>();
            _authService.HasPermissions(Arg.Any<OneAuthPermission[]>(), PermissionKeys.PlayerAdminBetLimit_Write).Returns(IsEditable);

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
        public async Task UpdateSetting_SettingDataIsNull_ReturnFailedResult()
        {
            // Arrange
            var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<AgCasinoBetLimitMetaModel>>();
            metaModel.Setting = null;

            var expectedResult = JsonConvert.SerializeObject(new { Code = 1, Message = ViewResources.InvalidParams });

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

        [TestCase(0, "Update successfully!")]
        [TestCase(1, "Update failed!")]
        public async Task UpdateSetting_ValidDataForSetting_AssignCorrectParamAndReturnCorrectResult(int code, string message)
        {
            // Arrange
            var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<AgCasinoBetLimitMetaModel>>();

            var betSetting = FakeHelper.Create<AgCasinoBetSetting>();
            betSetting.IsEnabled = true;
            _service.GetBetSettingAsync(metaModel.CustId).Returns(Task.FromResult(betSetting));

            IResultInfo expectedResult = new ResultInfo { Code = code, Message = message };
            _service.UpdateSettingAsync(metaModel).Returns(Task.FromResult(expectedResult));

            var user = SessionService.UserSession;
            using (var controller = CreateController())
            {
                // Action
                var jsonResult = await controller.UpdateSetting(metaModel) as JsonResult;
                var result = jsonResult.Data as IResultInfo;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.Code, Is.EqualTo(code));
                    Assert.That(result.Message, Is.EqualTo(message));

                    Assert.That(metaModel.UserId, Is.EqualTo(user.UserId));
                    Assert.That(metaModel.Language, Is.EqualTo(user.Language));
                    Assert.That(metaModel.SiteName, Is.EqualTo(SessionService.LicenseeSession.LicenseeName));
                    Assert.That(metaModel.Ip, Is.EqualTo(controller.Request.UserHostAddress));
                });
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