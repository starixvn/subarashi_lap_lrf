using Fanex.Athena.Model.Auth;
using Fanex.Athena.Model.Customer.ViewModel;
using Fanex.Athena.UnitTest.Common.Helpers;
using FluentAssertions;
using NUnit.Framework;

namespace Fanex.Athena.Controllers.Customer.UnitTests
{
    public partial class PlayerSegmentationControllerTest
    {
        [Test]
        public void BetList_WhenCall_ReturnViewAndModelCorrect()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const string ExpectedViewName = "~/Views/Desktop/Customer/PlayerSegmentation/BetList.cshtml";

                // Action
                var result = controller.BetList(FakeHelper.Create<int>(), FakeHelper.Create<string>(), FakeHelper.Create<string>());

                // Assert
                StringAssert.AreEqualIgnoringCase(ExpectedViewName, result.ViewName);
            }
        }

        [TestCase(true)]
        [TestCase(false)]
        public void BetList_WhenCall_ReturnViewModelCorrect(bool isAllowedCustomerComm)
        {
            using (var controller = CreateController())
            {
                // Arrange
                var fakeLicenseeInfo = new LicenseeAuthInfo
                {
                    IsAllowedCustomerComm = isAllowedCustomerComm
                };
                StubLicenseeSessionData(fakeLicenseeInfo);

                var custId = FakeHelper.Create<int>();
                var externalId = FakeHelper.Create<string>();
                var systemId = FakeHelper.Create<string>();

                var expectedModel = new PlayerSegmentationBetListViewModel
                {
                    CustId = custId,
                    ExternalId = externalId,
                    SystemId = systemId,
                    IsAllowedCustomerComm = fakeLicenseeInfo.IsAllowedCustomerComm
                };

                // Action
                var result = controller.BetList(custId, externalId, systemId);

                // Assert
                (result.Model as PlayerSegmentationBetListViewModel).Should().BeEquivalentTo(expectedModel);
            }
        }
    }
}