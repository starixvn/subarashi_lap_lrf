using Fanex.Athena.DataAccess.Customer.Interfaces;
using Fanex.Athena.Model.Auth;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
using Fanex.Athena.Model.Customer.Enum;
using Fanex.Athena.Model.Customer.MetaModel;
using Fanex.Athena.Model.Report.DTO;
using Fanex.Athena.Service.Core.Users.Interfaces;
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

        private PlayerSegmentationService _targetService;

        [SetUp]
        public void SetUp()
        {
            _playerDataAccess = Substitute.For<IPlayerSegmentationDataAccess>();
            _contextService = Substitute.For<IContextService>();
            _subsidiaryService = Substitute.For<ISubsidiaryService>();
            _targetService = new PlayerSegmentationService(_contextService, _playerDataAccess, _subsidiaryService);
        }

        [TearDown]
        public void TearDown()
        {
            _playerDataAccess = null;
            _contextService = null;
            _subsidiaryService = null;
            _targetService = null;
        }

        [TestCase(UserLevelType.Subsidiary, SubsidiaryViewType.NormalManagement, "1,2,3")]
        [TestCase(UserLevelType.Licensee, SubsidiaryViewType.NotManagement, "1,2,3")]
        [TestCase(UserLevelType.Licensee, SubsidiaryViewType.MasterManagement, "")]
        [TestCase(UserLevelType.Licensee, SubsidiaryViewType.NormalManagement, "")]
        public async Task GetProblemPlayerListAsync_IsNormalView_AgentListNoChange(byte userLevel, SubsidiaryViewType subsidiaryViewType, string subsidiaryList)
        {
            //Arrange
            var metaModel = FakeHelper.Create<ProblemPlayerListMetaModel>();
            metaModel.SubsidiaryList = subsidiaryList;

            var expectedResult = metaModel.AgentListXml;

            _contextService.UserLevel.Returns(userLevel);
            _contextService.SubsidiaryViewType.Returns((byte)subsidiaryViewType);
            _playerDataAccess.GetProblemPlayerListAsync(Arg.Any<ProblemPlayerListMetaModel>()).Returns(Task.FromResult(new ApiPagingResult<PlayerInfo>()));
            _subsidiaryService.GenerateAgentList(Arg.Any<UserAuthInfo>(), Arg.Any<string>(), Arg.Any<string>(), Arg.Any<string>()).Returns(FakeHelper.Create<string>());

            //Act
            _ = await _targetService.GetProblemPlayerListAsync(metaModel);

            //Assert

            Assert.AreEqual(expectedResult, metaModel.AgentListXml);
        }

        [Test]
        public async Task GetProblemPlayerListAsync_NotNormalView_AgentListChange()
        {
            //Arrange
            var metaModel = FakeHelper.Create<ProblemPlayerListMetaModel>();

            metaModel.SubsidiaryList = FakeHelper.Create<string>();
            var expectedResult = FakeHelper.Create<string>();
            var licenseeName = FakeHelper.Create<string>();
            var user = FakeHelper.Create<UserAuthInfo>();

            _contextService.LicenseeName.Returns(licenseeName);
            _contextService.User.Returns(user);
            _contextService.SubsidiaryViewType.Returns((byte)SubsidiaryViewType.NormalManagement);

            _playerDataAccess.GetProblemPlayerListAsync(Arg.Any<ProblemPlayerListMetaModel>()).Returns(Task.FromResult(new ApiPagingResult<PlayerInfo>()));
            _subsidiaryService.GenerateAgentList(user, licenseeName, metaModel.SubsidiaryList, metaModel.CurrencyIdList).Returns(expectedResult);

            //Act
            _ = await _targetService.GetProblemPlayerListAsync(metaModel);

            //Assert
            Assert.AreEqual(expectedResult, metaModel.AgentListXml);
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
            var expectedResult = FakeHelper.Create<IDictionary<int, string>>();
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

        [TestCase(UserLevelType.Subsidiary, null, (byte)SubsidiaryViewType.NormalManagement, true, PlayerSegmentationViewType.Normal)]
        [TestCase(UserLevelType.Licensee, null, (byte)SubsidiaryViewType.NotManagement, true, PlayerSegmentationViewType.Normal)]
        [TestCase(UserLevelType.Licensee, null, (byte)SubsidiaryViewType.MasterManagement, false, PlayerSegmentationViewType.Normal)]
        [TestCase(UserLevelType.Licensee, null, (byte)SubsidiaryViewType.NormalManagement, true, PlayerSegmentationViewType.Susidiary)]
        [TestCase(UserLevelType.Licensee, 1, (byte)SubsidiaryViewType.MasterManagement, true, PlayerSegmentationViewType.Susidiary)]
        [TestCase(UserLevelType.Licensee, null, (byte)SubsidiaryViewType.MasterManagement, true, PlayerSegmentationViewType.WhiteLabel)]
        public void GetViewType_WhenCall_ReturnViewTypeCorrectly(byte userLevel, int? whiteLabelID, byte subsidiaryViewType, bool anySubsidiary, PlayerSegmentationViewType expectedResult)
        {
            //Arrange
            var fakeUser = new UserAuthInfo
            {
                UserLevel = userLevel,
                WhiteLabelID = whiteLabelID
            };
            _contextService.User.Returns(fakeUser);
            _contextService.SubsidiaryViewType.Returns(subsidiaryViewType);

            //Act
            var actualResult = _targetService.GetViewType(anySubsidiary);

            //Assert
            Assert.AreEqual(expectedResult, actualResult);
        }
    }
}