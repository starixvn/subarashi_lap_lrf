namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Controllers.BetLimits
{
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
    using Fanex.Athena.Module.PlayerAdmin.ViewModels;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.UnitTest.Common.Helpers;
    using Fanex.Athena.VendorAdapter.Interfaces;
    using NSubstitute;
    using NUnit.Framework;

    public class SportsBookBetLimitControllerTest : CultureBaseControllerHelperTest
    {
        private const string MixedSportId = "99MP";

        private IAuthorizationService _authService;

        private ICacheRefAdapter _cacheRefAdapter;

        private ISportsBookBetLimitService _service;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            _authService = Substitute.For<IAuthorizationService>();
            _cacheRefAdapter = Substitute.For<ICacheRefAdapter>();
            _service = Substitute.For<ISportsBookBetLimitService>();

            SetUpDefaultFakeData();
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();

            _authService = null;
            _cacheRefAdapter = null;
            _service = null;
        }

        [TestCase(false)]
        [TestCase(true)]
        public async Task GetSetting_WhenCall_ReturnCorrectViewModel(bool isEditable)
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = FakeHelper.Create<PlayerBetLimitSelectMetaModel>();

                _authService.HasPermissions(DefaultUserSession, PermissionKeys.PlayerAdminBetLimit_Write)
                    .Returns(isEditable);

                var setting = FakeHelper.Create<PlayerBetLimit>(x => x.Id, MixedSportId);
                var settings = new List<PlayerBetLimit> { setting };
                _service.GetSettingAsync(metaModel.CustId, AppSettings.IsShowMixedSport).Returns(Task.FromResult(settings.AsEnumerable()));

                // Action
                var result = await controller.GetSetting(metaModel).ConfigureAwait(false);
                var viewModel = (PlayerBetLimitViewModel)(result.Data);

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(viewModel.Data.First().BetSettingType, Is.EqualTo(ViewResources.MixSportsParlay));
                    Assert.That(viewModel.Editable, Is.EqualTo(isEditable));
                });
            }
        }

        [Test]
        public async Task UpdateSetting_UpdateFailed_ReturnErrorResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>>>();

                var updateResult = new ResultInfo { Code = 1, Message = FakeHelper.Create<string>() };
                _service.UpdateSettingAsync(metaModel, AppSettings.IsShowMixedSport).Returns(Task.FromResult<IResultInfo>(updateResult));

                // Action
                var result = await controller.UpdateSetting(metaModel).ConfigureAwait(false);
                var resultDate = (ResultInfo)result.Data;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(resultDate.Code, Is.EqualTo(updateResult.Code));
                    Assert.That(resultDate.Message, Is.EqualTo(updateResult.Message));
                });
            }
        }

        [Test]
        public async Task UpdateSetting_UpdateSuccessfully_ReturnSuccessResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>>>();

                var updateResult = new ResultInfo { Code = 0, Message = FakeHelper.Create<string>() };
                _service.UpdateSettingAsync(metaModel, AppSettings.IsShowMixedSport).Returns(Task.FromResult<IResultInfo>(updateResult));

                // Action
                var result = await controller.UpdateSetting(metaModel).ConfigureAwait(false);
                var resultDate = (ResultInfo)result.Data;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(resultDate.Code, Is.EqualTo(updateResult.Code));
                    Assert.That(resultDate.Message, Is.EqualTo(ViewResources.UpdateSuccess));
                });
            }
        }

        private SportsBookBetLimitController CreateController()
        {
            return new SportsBookBetLimitController(_service)
            {
                ControllerContext = ControllerContext,
                LangService = LangService,
                SessionServiceInstance = SessionService,
                AuthServiceInstance = _authService,
                CacheRefAdapterInstance = _cacheRefAdapter,
                AppSettingInstance = AppSettings
            };
        }
    }
}