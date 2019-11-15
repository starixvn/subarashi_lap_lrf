namespace Fanex.Athena.Controllers.Customer.UnitTests
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Model.Core.ResultModel;
    using Model.Customer.DTO;
    using Model.Customer.MetaModel;
    using NSubstitute;
    using NUnit.Framework;

    public partial class CustomerControllerTest
    {
        [Test]
        public void PostCustomerList_UserNameIsNotEqualPlaceholderUsername_ReturnUserName()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const string UserName = "UserName";
                var metaModel = new CustomerListMetaModel
                {
                    Username = UserName
                };

                _licenseeSettingService.IsFakeLicensee(Arg.Any<string>()).Returns(false);
                _customerListService.GetActiveCustomersAsync(metaModel).Returns(new ReportResultModel<CustomerDTO>
                {
                    DataList = new List<CustomerDTO>(),
                    TotalRows = 0
                });

                // Action
                var result = controller.CustomerList(metaModel);

                // Assert
                Assert.That(metaModel.Username, Is.EqualTo(UserName));
            }
        }

        [Test]
        public void PostCustomerList_IsFakeLicensee_PlaceholderUsernameIsExternalId()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var userName = Resources.ViewResources.ExternalId;
                var metaModel = new CustomerListMetaModel
                {
                    Username = userName
                };

                StubLicenseeSessionData(DefaultLicenseeSession);
                _licenseeSettingService.IsFakeLicensee(Arg.Any<string>()).Returns(true);
                _customerListService.GetActiveCustomersAsync(metaModel).Returns(new ReportResultModel<CustomerDTO>
                {
                    DataList = new List<CustomerDTO>(),
                    TotalRows = 0
                });

                // Action
                controller.CustomerList(metaModel);

                // Assert
                Assert.That(metaModel.Username, Is.Empty);
            }
        }

        [Test]
        public async Task PostCustomerList_IsFakeLicensee_PlaceholderUsernameIsExternalIdOrSystemIdAsync()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var userName = Resources.ViewResources.ExternalIdOrSystemId;
                var metaModel = new CustomerListMetaModel
                {
                    Username = userName
                };

                _licenseeSettingService.IsFakeLicensee(Arg.Any<string>()).Returns(true);
                _customerListService.GetActiveCustomersAsync(metaModel).Returns(new ReportResultModel<CustomerDTO>
                {
                    DataList = new List<CustomerDTO>(),
                    TotalRows = 0
                });

                // Action
                await controller.CustomerList(metaModel).ConfigureAwait(false);

                // Assert
                Assert.AreEqual(metaModel.Username, userName);
            }
        }

        [Test]
        public void PostCustomerList_WhenCall_CallServiceToGetData()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = new CustomerListMetaModel();
                _licenseeSettingService.IsFakeLicensee(Arg.Any<string>()).Returns(false);
                _customerListService.GetActiveCustomersAsync(metaModel).Returns(new ReportResultModel<CustomerDTO>
                {
                    DataList = new List<CustomerDTO>(),
                    TotalRows = 0
                });

                // Action
                var result = controller.CustomerList(metaModel);

                // Assert
                _customerListService.Received().GetActiveCustomersAsync(metaModel);
            }
        }
    }
}