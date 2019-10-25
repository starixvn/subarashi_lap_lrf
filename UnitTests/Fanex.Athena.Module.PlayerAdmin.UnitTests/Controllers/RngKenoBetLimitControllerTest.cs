namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Controllers
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
    using Fanex.Athena.Module.PlayerAdmin.Repositories.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.ViewModels;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.UnitTest.Common.Helpers;
    using Fanex.Athena.VendorAdapter.Interfaces;
    using NSubstitute;
    using NUnit.Framework;

    public class RngKenoBetLimitControllerTest : CultureBaseControllerHelperTest
    {
        private INumberGameBetLimitRepository _repository;

        private IAuthorizationService _authService;

        private ICacheRefAdapter _cacheRefAdapter;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            _repository = Substitute.For<INumberGameBetLimitRepository>();
            _authService = Substitute.For<IAuthorizationService>();
            _cacheRefAdapter = Substitute.For<ICacheRefAdapter>();

            SetUpDefaultFakeData();
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();

            _repository = null;
            _authService = null;
            _cacheRefAdapter = null;
        }

        [TestCase(false)]
        [TestCase(true)]
        public async Task GetSetting_WhenCall_ReturnCorrectViewModel(bool isEditable)
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = FakeHelper.Create<PlayerBetLimitSelectMetaModel>();

                _authService.HasPermissions(DefaultUserSession.PortalFunctionList, PermissionKeys.PlayerAdminBetLimit_Write)
                    .Returns(isEditable);

                var setting = FakeHelper.Create<PlayerBetLimit>(x => x.Id, 0);
                var settings = new List<PlayerBetLimit> { setting };
                _repository.GetSettingAsync(metaModel.CustId).Returns(Task.FromResult(settings.AsEnumerable()));
                
                var sportName = FakeHelper.Create<string>();
                _cacheRefAdapter.GetSportName(setting.Id).Returns(sportName);

                // Action
                var result = await controller.GetSetting(metaModel).ConfigureAwait(false);
                var viewModel = (PlayerBetLimitViewModel)(result.Data);

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(viewModel.Data.First().BetSettingType, Is.EqualTo(sportName));
                    Assert.That(viewModel.Editable, Is.EqualTo(isEditable));
                });
            }
        }

        [Test]
        public async Task UpdateSetting_WhenCall_AddCorrectDataToMetaModel()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<PlayerBetLimitMetaModel>>();

                // Action
                await controller.UpdateSetting(metaModel).ConfigureAwait(false);

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(metaModel.UserId, Is.EqualTo(DefaultUserSession.UserId));
                    Assert.That(metaModel.Language, Is.EqualTo(DefaultUserSession.Language));
                    Assert.That(metaModel.SiteName, Is.EqualTo(DefaultLicenseeSession.LicenseeName));
                    Assert.That(metaModel.Ip, Is.EqualTo(controller.Request.UserHostAddress));
                });
            }
        }

        [Test]
        public async Task UpdateSetting_UpdateFailed_ReturnErrorResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<PlayerBetLimitMetaModel>>();

                var updateResult = new ResultInfo { Code = 1, Message = FakeHelper.Create<string>() };
                _repository.UpdateSettingAsync(metaModel).Returns(Task.FromResult<IResultInfo>(updateResult));

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
                var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<PlayerBetLimitMetaModel>>();

                var updateResult = new ResultInfo { Code = 0, Message = FakeHelper.Create<string>() };
                _repository.UpdateSettingAsync(metaModel).Returns(Task.FromResult<IResultInfo>(updateResult));

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

        private NumberGameBetLimitController CreateController()
        {
            return new NumberGameBetLimitController(
                LangService,
                SessionService,
                _cacheRefAdapter,
                _authService,
                _repository)
            {
                ControllerContext = ControllerContext
            };
        }
    }
}
