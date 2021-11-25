using Fanex.Athena.DataAccess.Customer.Interfaces;
using Fanex.Athena.Model.Auth;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
using Fanex.Athena.Model.Customer.MetaModel;
using Fanex.Athena.Model.Report.DTO;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.Customer.Interfaces;
using Fanex.Athena.UnitTest.Common.Helpers;
using FluentAssertions;
using NSubstitute;
using NUnit.Framework;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Fanex.Athena.Service.Customer.UnitTests
{
    [TestFixture]
    public class PlayerSegmentationServiceTest
    {
        private IPlayerSegmentationDataAccess _playerDataAccess;
        private IContextService _contextService;
        private ISubsidiaryService _subsidiaryService;
        private ICustomerClassService _customerClassService;

        private PlayerSegmentationService _targetService;

        [SetUp]
        public void SetUp()
        {
            _playerDataAccess = Substitute.For<IPlayerSegmentationDataAccess>();
            _contextService = Substitute.For<IContextService>();
            _subsidiaryService = Substitute.For<ISubsidiaryService>();
            _customerClassService = Substitute.For<ICustomerClassService>();
            _targetService = new PlayerSegmentationService(_contextService, _playerDataAccess, _subsidiaryService, _customerClassService);
        }

        [TearDown]
        public void TearDown()
        {
            _playerDataAccess = null;
            _contextService = null;
            _subsidiaryService = null;
            _targetService = null;
        }

        [Test]
        public async Task GetProblemPlayerListAsync_WhenCall_ReturnDataCorrectly()
        {
            //Arrange
            var metaModel = FakeHelper.Create<ProblemPlayerListMetaModel>();

            var rawData = new ApiPagingResult<PlayerInfo>
            {
                Data = new List<PlayerInfo>
                {
                    new PlayerInfo
                    {
                        AgentId = 1
                    },
                    new PlayerInfo
                    {
                        AgentId = 2
                    }
                }
            };

            var expectedResult = new ApiPagingResult<PlayerInfo>
            {
                Data = new List<PlayerInfo>
                {
                    new PlayerInfo
                    {
                        AgentId = 1,
                        Subsidiary = "Sub1"
                    },
                    new PlayerInfo
                    {
                        AgentId = 2,
                        Subsidiary = "Sub2"
                    }
                }
            };

            var subsidiaryList = new List<Subsidiary>
            {
                new Subsidiary { AgentId = 1, OperatorId = "Sub1" },
                new Subsidiary { AgentId = 2, OperatorId = "Sub2" }
            };

            var licenseeName = FakeHelper.Create<string>();
            var user = FakeHelper.Create<UserAuthInfo>();

            _contextService.LicenseeName.Returns(licenseeName);
            _contextService.User.Returns(user);

            _playerDataAccess.GetProblemPlayerListAsync(metaModel).Returns(Task.FromResult(rawData));
            _subsidiaryService.GetSubsidiaryList(user, licenseeName, metaModel.SubsidiaryList).Returns(subsidiaryList);

            //Act
            var actualResult = await _targetService.GetProblemPlayerListAsync(metaModel);

            //Assert
            actualResult.Should().BeEquivalentTo(expectedResult);
        }

        [Test]
        public async Task GetVipPlayerListAsync_WhenCall_ReturnDataCorrectly()
        {
            //Arrange
            var metaModel = FakeHelper.Create<VipPlayerListMetaModel>();

            var rawData = new ApiPagingResult<PlayerInfo>
            {
                Data = new List<PlayerInfo>
                {
                    new PlayerInfo
                    {
                        AgentId = 1
                    },
                    new PlayerInfo
                    {
                        AgentId = 2
                    }
                }
            };

            var expectedResult = new ApiPagingResult<PlayerInfo>
            {
                Data = new List<PlayerInfo>
                {
                    new PlayerInfo
                    {
                        AgentId = 1,
                        Subsidiary = "Sub1"
                    },
                    new PlayerInfo
                    {
                        AgentId = 2,
                        Subsidiary = "Sub2"
                    }
                }
            };

            var subsidiaryList = new List<Subsidiary>
            {
                new Subsidiary { AgentId = 1, OperatorId = "Sub1" },
                new Subsidiary { AgentId = 2, OperatorId = "Sub2" }
            };

            var licenseeName = FakeHelper.Create<string>();
            var user = FakeHelper.Create<UserAuthInfo>();

            _contextService.LicenseeName.Returns(licenseeName);
            _contextService.User.Returns(user);

            _playerDataAccess.GetVipPlayerListAsync(metaModel).Returns(Task.FromResult(rawData));
            _subsidiaryService.GetSubsidiaryList(user, licenseeName, metaModel.SubsidiaryList).Returns(subsidiaryList);

            //Act
            var actualResult = await _targetService.GetVipPlayerListAsync(metaModel);

            //Assert
            actualResult.Should().BeEquivalentTo(expectedResult);
        }

        [Test]
        public async Task GetReasonGroupListAsync_WhenCall_ReturnDataCorrectly()
        {
            //Arrange
            var langKey = FakeHelper.Create<string>();
            var expectedResult = FakeHelper.Create<List<ReasonGroup>>();
            _playerDataAccess.GetReasonGroupListAsync(langKey).Returns(expectedResult);

            //Act
            var actualResult = await _targetService.GetReasonGroupListAsync(langKey);

            //Assert
            Assert.AreEqual(expectedResult, actualResult);
        }

        [Test]
        public async Task UpdateVipStatusAsync_WhenCall_ReturnDataCorrectly()
        {
            //Arrange
            var metaModel = FakeHelper.Create<UpdateStatusPlayerMetaModel>();
            var expectedResult = FakeHelper.Create<IEnumerable<UpdateStatusPlayerResult>>();
            _playerDataAccess.UpdateVipStatusAsync(metaModel).Returns(expectedResult);

            //Act
            var actualResult = await _targetService.UpdateVipStatusAsync(metaModel);

            //Assert
            Assert.AreEqual(expectedResult, actualResult);
        }
    }
}