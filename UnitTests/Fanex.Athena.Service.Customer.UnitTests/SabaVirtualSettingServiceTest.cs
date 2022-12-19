using Fanex.Athena.DataAccess.Customer;
using Fanex.Athena.Model.Core.DTO.External;
using Fanex.Athena.Model.Customer.DTO;
using Fanex.Athena.Model.Customer.MetaModel;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.UnitTest.Common.Helpers;
using FluentAssertions;
using NSubstitute;
using NUnit.Framework;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Fanex.Athena.Service.Customer.UnitTests
{
    [TestFixture]
    public class SabaVirtualSettingServiceTest
    {
        private ISabaVirtualSettingDataAccess _dataAccess;
        private IPortalApiService _portalApiService;

        private SabaVirtualSettingService _targetService;

        [SetUp]
        public void SetUp()
        {
            _dataAccess = Substitute.For<ISabaVirtualSettingDataAccess>();
            _portalApiService = Substitute.For<IPortalApiService>();
            _targetService = new SabaVirtualSettingService(_dataAccess, _portalApiService);
        }

        [TearDown]
        public void TearDown()
        {
            _dataAccess = null;
            _portalApiService = null;
        }

        [Test]
        public async Task GetSabaVirtualSetting_WhenCall_ReturnDataCorrectly()
        {
            //Arrange
            var metaModel = FakeHelper.Create<SabaVirtuaSettingInformationMetaModel>(x => x.Language, "en");

            var setting = new List<SabaVirtualSettingInformationModel>
                {
                    new SabaVirtualSettingInformationModel
                    {
                        Id = 1,
                        SportType = "2",
                        LeagueGroupId = 1
                    },
                    new SabaVirtualSettingInformationModel
                    {
                        Id = 1,
                        SportType = "2",
                        LeagueGroupId = 2
                    },
                    new SabaVirtualSettingInformationModel
                    {
                        Id = 1,
                        SportType = "2",
                        LeagueGroupId = 3
                    },
                    new SabaVirtualSettingInformationModel
                    {
                        Id = 1,
                        SportType = "2",
                        LeagueGroupId = -1
                    }
            };

            var leagueGroupResult = new List<PortalApiLeagueGroupResponse>
                {
                    new PortalApiLeagueGroupResponse
                    {
                        LicLeagueGroupID = 1,
                        InHouseLeagueGroupID = 1,
                        LicGroupName = "soccer"
                    },
                    new PortalApiLeagueGroupResponse
                    {
                        LicLeagueGroupID = 1,
                        InHouseLeagueGroupID = 2,
                        LicGroupName = "basketBall"
                    }
            };

            var expectedResult = new List<SabaVirtualSettingInformationModel>
                {
                    new SabaVirtualSettingInformationModel
                    {
                        Id = 1,
                        SportType = "2",
                        LicLeagueGroupId = 1,
                        LeagueGroupId = 1,
                        LicLeagueGroupName = "soccer"
                    },
                    new SabaVirtualSettingInformationModel
                    {
                        Id = 1,
                        SportType = "2",
                        LicLeagueGroupId = 0,
                        LeagueGroupId = 3,
                        LicLeagueGroupName = "-"
                    },
                    new SabaVirtualSettingInformationModel
                    {
                        Id = 1,
                        SportType = "2",
                        LicLeagueGroupId = 1,
                        LeagueGroupId = 2,
                        LicLeagueGroupName = "basketBall"
                    },
                    new SabaVirtualSettingInformationModel
                    {
                        Id = 1,
                        SportType = "2",
                        LicLeagueGroupId = 0,
                        LeagueGroupId = -1,
                        LicLeagueGroupName = "All"
                    }
            };

            _dataAccess.GetSabaVirtualSettingInformation(metaModel).Returns(setting);
            _portalApiService.GetLeagueGroupsAsync(2, metaModel.Language).Returns(leagueGroupResult);

            //Act
            var actualResult = await _targetService.GetSabaVirtualSetting(metaModel);

            //Assert
            actualResult.Should().BeEquivalentTo(expectedResult);
        }
    }
}