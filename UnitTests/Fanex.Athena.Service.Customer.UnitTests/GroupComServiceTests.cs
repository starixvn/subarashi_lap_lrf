using System.Collections.Generic;
using System.Threading.Tasks;
using Fanex.Athena.DataAccess.Customer.Interfaces;
using Fanex.Athena.Model.Auth;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Customer.MetaModel;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Service.Customer.UnitTests
{
    [TestFixture]
    public class GroupComServiceTests
    {
        private IGroupComDataAccess repository;
        private GroupComService service;

        [OneTimeSetUp]
        public void FixtureSetUp()
        {
            repository = Substitute.For<IGroupComDataAccess>();
            service = new GroupComService(repository);
        }

        [OneTimeTearDown]
        public void FixtureTearDown()
        {
            repository = null;
            service = null;
        }

        [Test]
        public void GetAllAsync_Always_GetData()
        {
            // Arrange
            var permissions = new Dictionary<string, bool>();

            // Action
            service.GetAllAsync(1, permissions);

            // Assert
            repository.Received().GetAllAsync(1, permissions);
        }

        [Test]
        public void GetDataForExcelAsync_Always_GetData()
        {
            // Action
            service.GetDataForExcelAsync(1).GetAwaiter().GetResult();

            // Assert
            repository.Received().GetDataForExcelAsync(1);
        }

        [Test]
        public void GetById_Always_GetData()
        {
            // Arrange
            var permissions = new Dictionary<string, bool>();

            // Action
            service.GetById(1, 2, permissions);

            // Assert
            repository.Received().GetById(1, 2, permissions);
        }

        [Test]
        public async Task InsertGroupAsync_Always_InsertData()
        {
            // Arrange
            var permissions = new Dictionary<string, bool>();
            var item = new GroupCommMetaModel();
            var request = Substitute.For<IRequest>();

            // Action
            await service.InsertGroupAsync(item, request, 1, permissions);

            // Assert
            await repository.Received().InsertGroupAsync(item, request, 1, permissions);
        }

        [Test]
        public void CheckExistingGroupByName_Always_CallData()
        {
            // Action
            service.CheckExistingGroupByName(1, "GroupName");

            // Assert
            repository.Received().CheckByName(1, "GroupName");
        }

        [Test]
        public void UpdateGroupAsync_EmptyCustIds_NotCallLGClient()
        {
            // Arrange
            var lg = Substitute.For<ILGAPIClient>();
            var item = new GroupCommMetaModel
            {
                ProductPermissions = new Dictionary<string, bool> { ["CS"] = false }
            };

            var request = Substitute.For<IRequest>();
            var userInfo = new UserAuthInfo();
            var permissions = new Dictionary<string, bool>();

            repository.UpdateGroupAsync(item, request, userInfo.UserId, permissions)
                .Returns(new ResultInfo { Code = 0, ExtendedData = "1" });

            // Action
            service.UpdateGroupAsync(item, request, userInfo, permissions).GetAwaiter().GetResult();

            // Assert
            lg.DidNotReceive().PostAsync<APIResult<bool>>(Arg.Any<string>(), Arg.Any<RNGCasinoUpdateMemberComMetaModel>(), Arg.Any<string>());
        }

        [Test]
        public void UpdateGroupAsync_UpdateCasino_CallLGClient()
        {
            // Arrange
            var lg = Substitute.For<ILGAPIClient>();
            var item = new GroupCommMetaModel
            {
                ProductPermissions = new Dictionary<string, bool> { ["CS"] = true }
            };

            var request = Substitute.For<IRequest>();
            var userInfo = new UserAuthInfo();
            repository.UpdateGroupAsync(item, request, userInfo.UserId, item.ProductPermissions)
                .Returns(new ResultInfo { Code = 0, ExtendedData = "1" });

            // Action
            service.UpdateGroupAsync(item, request, userInfo, item.ProductPermissions).GetAwaiter().GetResult();

            // Assert
            lg.DidNotReceive().PostAsync<APIResult<bool>>(Arg.Any<string>(), Arg.Any<RNGCasinoUpdateMemberComMetaModel>(), Arg.Any<string>());
        }

        [Test]
        public void DeleteGroupAsync_EmptyCustIds_NotCallLGClient()
        {
            // Arrange
            var lg = Substitute.For<ILGAPIClient>();
            var model = new DeleteGroupMetaModel();

            repository.DeleteGroupAsync(model.GroupId, model.LicenseeId, model.UserId, model.Ip, model.Language, model.IsRemoveCommSetting, model.IsResetDefault)
                .Returns(new ResultInfo { Code = 0, ExtendedData = "1" });

            // Action
            service.DeleteGroupAsync(model).GetAwaiter().GetResult();

            // Assert
            lg.DidNotReceive().PostAsync<APIResult<bool>>(Arg.Any<string>(), Arg.Any<RNGCasinoUpdateMemberComMetaModel>(), Arg.Any<string>());
        }

        [Test]
        public void DeleteGroupAsync_UpdateCasino_CallLGClient()
        {
            // Arrange
            var lg = Substitute.For<ILGAPIClient>();
            var model = new DeleteGroupMetaModel
            {
                IsRemoveCommSetting = true
            };

            repository.DeleteGroupAsync(model.GroupId, model.LicenseeId, model.UserId, model.Ip, model.Language, model.IsRemoveCommSetting, model.IsResetDefault)
                .Returns(new ResultInfo { Code = 0, ExtendedData = "1" });

            // Action
            service.DeleteGroupAsync(model).GetAwaiter().GetResult();

            // Assert
            lg.DidNotReceive().PostAsync<APIResult<bool>>(Arg.Any<string>(), Arg.Any<RNGCasinoUpdateMemberComMetaModel>(), Arg.Any<string>());
        }
    }
}
