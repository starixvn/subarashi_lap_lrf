using System.Collections.Generic;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Module.PlayerAdmin.Criteria.PlayerCommission;
using Fanex.Athena.Module.PlayerAdmin.MetaModel.PlayerCommission;
using Fanex.Athena.Module.PlayerAdmin.Repositories.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Services;
using Fanex.Athena.Module.PlayerAdmin.ViewModels.PlayerCommission;
using Fanex.Athena.Resources;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Services
{
    [TestFixture]
    public class PlayerCommissionServiceTests
    {
        private IPlayerCommissionRepository repository;
        private ILGAPIClient lgClient;
        private PlayerCommissionService service;

        [OneTimeSetUp]
        public void FixtureSetUp()
        {
            repository = Substitute.For<IPlayerCommissionRepository>();
            lgClient = Substitute.For<ILGAPIClient>();
            service = new PlayerCommissionService(repository, lgClient);
        }

        [OneTimeTearDown]
        public void FixtureTearDown()
        {
            repository = null;
            lgClient = null;
            service = null;
        }

        [Test]
        public void GetAllCommGroups_Always_GetData()
        {
            // Arrange
            var query = new BasePlayerCommissionUpdateQuery();

            // Action
            service.GetAllCommGroups(query);

            // Assert
            repository.Received().GetAllCommGroups(Arg.Any<GetAllCommGroupsCriteria>());
        }

        [Test]
        public void GetPlayerCommissionGroup_Always_GetData()
        {
            // Arrange
            var query = new SingleMoveGroupQuery();

            // Action
            service.GetPlayerCommissionGroup(query);

            // Assert
            repository.Received().GetPlayerCommissionGroup(Arg.Any<GetPlayerCommissionGroupCriteria>());
        }

        [Test]
        public void MultipleMoveGroup_GroupNotExist_ReturnCorrectResult()
        {
            // Arrange
            var query = new MultipleMoveGroupQuery();
            repository.GetCommissionGroupById(Arg.Any<GetCommissionGroupByIdCriteria>()).Returns((PlayerCommissionViewModel)null);

            // Action
            var result = service.MultipleMoveGroup(query).GetAwaiter().GetResult();

            // Assert
            Assert.AreEqual(ViewResources.GroupNotExists, result.Message);
        }

        [Test]
        public void MultipleMoveGroup_ErrorWhenUpdate_NotCallLGClient()
        {
            // Arrange
            var query = new MultipleMoveGroupQuery();
            query.Permissions = new Dictionary<string, bool>();

            repository.GetCommissionGroupById(Arg.Any<GetCommissionGroupByIdCriteria>())
                .Returns(new PlayerCommissionViewModel());

            repository.MultipleMoveGroup(Arg.Any<MultipleMoveGroupCriteria>())
                .Returns(new ResultInfo { Code = 1 });

            // Action
            service.MultipleMoveGroup(query).GetAwaiter().GetResult();

            // Assert
            lgClient.DidNotReceive().PostAsync<APIResult<bool>>(Arg.Any<string>(), Arg.Any<RNGCasinoUpdateMemberComCriteria>(), Arg.Any<string>());
        }

        [Test]
        public void MultipleMoveGroup_EmptyCustIds_NotCallLGClient()
        {
            // Arrange
            var lg = Substitute.For<ILGAPIClient>();
            service = new PlayerCommissionService(repository, lg);

            var query = new MultipleMoveGroupQuery();
            query.Permissions = new Dictionary<string, bool>();

            repository.GetCommissionGroupById(Arg.Any<GetCommissionGroupByIdCriteria>())
                .Returns(new PlayerCommissionViewModel());

            repository.MultipleMoveGroup(Arg.Any<MultipleMoveGroupCriteria>())
                .Returns(new ResultInfo { Code = 0, ExtendedData = "1" });

            // Action
            service.MultipleMoveGroup(query).GetAwaiter().GetResult();

            // Assert
            lg.DidNotReceive().PostAsync<APIResult<bool>>(Arg.Any<string>(), Arg.Any<RNGCasinoUpdateMemberComCriteria>(), Arg.Any<string>());
        }

        [Test]
        public void MultipleMoveGroup_UpdateCasino_CallLGClient()
        {
            // Arrange
            var lg = Substitute.For<ILGAPIClient>();
            service = new PlayerCommissionService(repository, lg);

            var query = new MultipleMoveGroupQuery();
            query.CustIds = "1";
            query.Permissions = new Dictionary<string, bool>
            {
                ["CS"] = true
            };

            var comms = new Dictionary<string, decimal> { ["CS"] = (decimal)0.3 };
            repository.GetCommissionGroupById(Arg.Any<GetCommissionGroupByIdCriteria>())
                .Returns(new PlayerCommissionViewModel { CommValues = comms });

            repository.MultipleMoveGroup(Arg.Any<MultipleMoveGroupCriteria>())
                .Returns(new ResultInfo { Code = 0, ExtendedData = "1" });

            // Action
            service.MultipleMoveGroup(query).GetAwaiter().GetResult();

            // Assert
            lg.Received().PostAsync<APIResult<bool>>(Arg.Any<string>(), Arg.Any<RNGCasinoUpdateMemberComCriteria>(), Arg.Any<string>());
        }

        [Test]
        public void MultipleRemoveFromGroup_EmptyCustIds_NotCallLGClient()
        {
            // Arrange
            var lg = Substitute.For<ILGAPIClient>();
            service = new PlayerCommissionService(repository, lg);

            var query = new MultipleRemoveFromGroupQuery();
            query.Permissions = new Dictionary<string, bool>();

            repository.MultipleRemoveFromGroup(Arg.Any<MultipleRemoveFromGroupCriteria>())
                .Returns(new ResultInfo { Code = 0, ExtendedData = "1" });

            // Action
            service.MultipleRemoveFromGroup(query).GetAwaiter().GetResult();

            // Assert
            lg.DidNotReceive().PostAsync<APIResult<bool>>(Arg.Any<string>(), Arg.Any<RNGCasinoUpdateMemberComCriteria>(), Arg.Any<string>());
        }

        [Test]
        public void MultipleRemoveFromGroup_UpdateCasino_CallLGClient()
        {
            // Arrange
            var lg = Substitute.For<ILGAPIClient>();
            service = new PlayerCommissionService(repository, lg);

            var query = new MultipleRemoveFromGroupQuery();
            query.CustIds = "1";
            query.IsRemovePlayerComm = true;
            query.Permissions = new Dictionary<string, bool>
            {
                ["CS"] = true
            };

            repository.MultipleRemoveFromGroup(Arg.Any<MultipleRemoveFromGroupCriteria>())
                .Returns(new ResultInfo { Code = 0, ExtendedData = "1" });

            // Action
            service.MultipleRemoveFromGroup(query).GetAwaiter().GetResult();

            // Assert
            lg.Received().PostAsync<APIResult<bool>>(Arg.Any<string>(), Arg.Any<RNGCasinoUpdateMemberComCriteria>(), Arg.Any<string>());
        }

        [Test]
        public void MultipleUpdateGroup_EmptyCustIds_NotCallLGClient()
        {
            // Arrange
            var lg = Substitute.For<ILGAPIClient>();
            service = new PlayerCommissionService(repository, lg);

            var query = new MultipleUpdateGroupQuery();
            query.Permissions = new Dictionary<string, bool>();

            repository.MultipleUpdateGroup(Arg.Any<MultipleUpdateGroupCriteria>())
                .Returns(new ResultInfo { Code = 0, ExtendedData = "1" });

            // Action
            service.MultipleUpdateGroup(query).GetAwaiter().GetResult();

            // Assert
            lg.DidNotReceive().PostAsync<APIResult<bool>>(Arg.Any<string>(), Arg.Any<RNGCasinoUpdateMemberComCriteria>(), Arg.Any<string>());
        }

        [Test]
        public void MultipleUpdateGroup_UpdateCasino_CallLGClient()
        {
            // Arrange
            var lg = Substitute.For<ILGAPIClient>();
            service = new PlayerCommissionService(repository, lg);

            var query = new MultipleUpdateGroupQuery();
            query.CustIds = "1";
            query.Permissions = new Dictionary<string, bool>
            {
                ["CS"] = true
            };

            repository.MultipleUpdateGroup(Arg.Any<MultipleUpdateGroupCriteria>())
                .Returns(new ResultInfo { Code = 0, ExtendedData = "1" });

            // Action
            service.MultipleUpdateGroup(query).GetAwaiter().GetResult();

            // Assert
            lg.Received().PostAsync<APIResult<bool>>(Arg.Any<string>(), Arg.Any<RNGCasinoUpdateMemberComCriteria>(), Arg.Any<string>());
        }
    }
}
