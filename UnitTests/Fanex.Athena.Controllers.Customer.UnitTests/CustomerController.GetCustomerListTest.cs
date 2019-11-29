namespace Fanex.Athena.Controllers.Customer.UnitTests
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.UnitTest.Common.Helpers;
    using Model.Core.DTO.Common;
    using Model.Customer.ViewModel;
    using NSubstitute;
    using NUnit.Framework;

    public partial class CustomerControllerTest
    {
        [Test]
        public async Task GetCustomerList_UserNameIsNotEqualPlaceholderUsername_ReturnUserName()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const string UserName = "UserName";

                _licenseeSettingService.IsFakeLicensee(Arg.Any<string>()).Returns(false);
                _productService.GetProductAccess(Arg.Any<int>(), Arg.Any<string>()).Returns(new ProductAccess(new List<Product>()));

                // Action
                var result = (CustomerListViewModel)(await controller.CustomerList(UserName) as ViewResult).Model;

                // Assert
                Assert.That(result.Param.Username, Is.EqualTo(UserName));
            }
        }

        [Test]
        public async Task GetCustomerList_IsFakeLicensee_PlaceholderUsernameIsExternalId()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var username = Resources.ViewResources.ExternalId;

                StubLicenseeSessionData(DefaultLicenseeSession);
                _licenseeSettingService.IsFakeLicensee(Arg.Any<string>()).Returns(true);
                _productService.GetProductAccess(Arg.Any<int>(), Arg.Any<string>()).Returns(new ProductAccess(new List<Product>()));

                // Action
                var result = (CustomerListViewModel)(await controller.CustomerList(username) as ViewResult).Model;

                // Assert
                Assert.That(result.Param.Username, Is.Empty);
            }
        }

        [Test]
        public async Task GetCustomerList_IsNotFakeLicensee_PlaceholderUsernameIsExternalIdOrSystemId()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var username = Resources.ViewResources.ExternalIdOrSystemId;

                _licenseeSettingService.IsFakeLicensee(Arg.Any<string>()).Returns(false);
                _productService.GetProductAccess(Arg.Any<int>(), Arg.Any<string>()).Returns(new ProductAccess(new List<Product>()));

                // Action
                var result = (CustomerListViewModel)(await controller.CustomerList(username) as ViewResult).Model;

                // Assert
                Assert.That(result.Param.Username, Is.Empty);
            }
        }

        [Test]
        public async Task GetCustomerList_InitGridColumns_IsAllowBA_AddBAStatusColumn()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const string BaStatus = "BAStatus";


                _licenseeSettingService.IsFakeLicensee(Arg.Any<string>()).Returns(false);
                _productService.GetProductAccess(Arg.Any<int>(), Arg.Any<string>()).Returns(new ProductAccess(new List<Product> { new Product { ProductCode = Product.BA } }));

                // Action
                var result = (CustomerListViewModel)(await controller.CustomerList() as ViewResult).Model;

                // Assert
                Assert.That(result.Param.GridColumns.Any(x => x.Name == BaStatus && x.Checked));
            }
        }

        [Test]
        public async Task GetCustomerList_InitGridColumns_AllowLicensees_AddStatusColumn()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const string Status = "Status";

                StubLicenseeSessionData(DefaultLicenseeSession);
                _licenseeSettingService.IsFakeLicensee(Arg.Any<string>()).Returns(true);
                _productService.GetProductAccess(Arg.Any<int>(), Arg.Any<string>()).Returns(new ProductAccess(new List<Product>()));
                AppSettings.LicenseeOfferStatusFunction.Returns(new[] { DefaultLicenseeSession.LicenseeId });

                // Action
                var result = (CustomerListViewModel)(await controller.CustomerList() as ViewResult).Model;

                // Assert
                Assert.That(result.Param.GridColumns.Any(x => x.Name == Status && x.Checked));
            }
        }

        [Test]
        public async Task GetCustomerList_InitGridColumns_AllowCustomerCommAndRealLicensee_AddCommissionColumn()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const string Commission = "Commission";
                const string Group = "Group";

                _licenseeSettingService.IsFakeLicensee(Arg.Any<string>()).Returns(false);
                _productService.GetProductAccess(Arg.Any<int>(), Arg.Any<string>()).Returns(new ProductAccess(new List<Product>()));
                StubLicenseeSessionData(new LicenseeAuthInfo { IsAllowedCustomerComm = true });

                // Action
                var result = (CustomerListViewModel)(await controller.CustomerList() as ViewResult).Model;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.Param.GridColumns.Any(x => x.Name == Commission && x.Checked));
                    Assert.That(result.Param.GridColumns.ElementAt(0).Name, Is.EqualTo(Group));
                });
            }
        }

        [Test]
        public async Task GetCustomerList_CreateCustomerViewModel_IsAllowedCustomerComm_AddDataForGroupComm()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const int GroupCommId = 1;
                const int LicenseeId = 2;

                _licenseeSettingService.IsFakeLicensee(Arg.Any<string>()).Returns(false);
                _productService.GetProductAccess(Arg.Any<int>(), Arg.Any<string>()).Returns(new ProductAccess(new List<Product>()));
                StubLicenseeSessionData(new LicenseeAuthInfo { IsAllowedCustomerComm = true, LicenseeId = 2 });

                // Action
                await controller.CustomerList(groupId: GroupCommId);

                // Assert
                Assert.Multiple(() =>
                {
                    _groupComService.Received().GetAllAsync(LicenseeId);
                    _groupComService.Received().GetById(GroupCommId, LicenseeId);
                });
            }
        }

        [Test]
        public async Task GetCustomerList_SetValueForBaStatus_IsAllowedSpecialBA_DonotAddBAMessage()
        {
            using (var controller = CreateController())
            {
                // Arrange
                SetUpDefaultFakeData();
                _licenseeSettingService.IsFakeLicensee(Arg.Any<string>()).Returns(false);
                _productService.GetProductAccess(Arg.Any<int>(), Arg.Any<string>()).Returns(new ProductAccess(new List<Product>()));
                _authorizationService.IsAllowedSpecialBA(DefaultUserSession).Returns(true);

                // Action
                var result = (CustomerListViewModel)(await controller.CustomerList() as ViewResult).Model;

                // Assert
                Assert.That(result.CanUpdateBAMessage, Is.Empty);
                _licenseeDataAccess.DidNotReceive().IsAllowUpdateMemberBAStatus(Arg.Any<Request>(), Arg.Any<int>());
            }
        }

        [Test]
        public async Task GetCustomerList_SetValueForBaStatus_IsNotAllowedSpecialBA_AddBAMessage()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const string BaMessage = "Message";
                _licenseeSettingService.IsFakeLicensee(Arg.Any<string>()).Returns(false);
                _productService.GetProductAccess(Arg.Any<int>(), Arg.Any<string>()).Returns(new ProductAccess(new List<Product>()));
                _authorizationService.IsAllowedSpecialBA(Arg.Any<UserAuthInfo>()).Returns(false);
                _licenseeDataAccess.IsAllowUpdateMemberBAStatus(Arg.Any<Request>(), Arg.Any<int>()).Returns(new ResultInfo<bool>
                {
                    Message = BaMessage
                });

                // Action
                var result = (CustomerListViewModel)(await controller.CustomerList() as ViewResult).Model;

                // Assert
                Assert.That(result.CanUpdateBAMessage, Is.EqualTo(BaMessage));
            }
        }

        [Test]
        public async Task GetCustomerList_SetValueForBaStatus_IsAllowedBAAndNotSpecialBA_AddBATimeCheck()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const string BaMessage = "Message";
                SetUpDefaultFakeData();
                _licenseeSettingService.IsFakeLicensee(Arg.Any<string>()).Returns(false);
                _productService.GetProductAccess(Arg.Any<int>(), Arg.Any<string>()).Returns(new ProductAccess(new List<Product> { new Product { ProductCode = Product.BA } }));
                _authorizationService.IsAllowedSpecialBA(Arg.Any<UserAuthInfo>()).Returns(false);
                _licenseeDataAccess.IsAllowUpdateMemberBAStatus(Arg.Any<Request>(), Arg.Any<int>()).Returns(new ResultInfo<bool>
                {
                    Message = BaMessage
                });

                // Action
                var result = (CustomerListViewModel)(await controller.CustomerList() as ViewResult).Model;

                // Assert
                Assert.That(result.BATimeCheck, Is.EqualTo(BaMessage));
            }
        }

        [Test]
        public async Task GetCustomerList_IsNotSubsidiaryManagement_GroupSubsidiariesIsEmpty()
        {
            using (var controller = CreateController())
            {
                // Arrange
                StubUserSessionData(new UserAuthInfo { SubsidiaryViewType = (int)SubsidiaryViewType.NotManagement });
                _productService.GetProductAccess(Arg.Any<int>(), Arg.Any<string>()).Returns(new ProductAccess(new List<Product>()));

                // Action
                var result = (CustomerListViewModel)(await controller.CustomerList() as ViewResult).Model;

                // Assert
                Assert.That(result.GroupSubsidiaryList, Is.Empty);
            }
        }

        [Test]
        public async Task GetCustomerList_IsSubsidiaryManagement_GroupSubsidiariesIsReturnedFromService()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var user = new UserAuthInfo { SubsidiaryViewType = (int)SubsidiaryViewType.MasterManagement, WhiteLabelID = FakeHelper.Create<int?>() };
                StubUserSessionData(user);

                var expected = new List<CheckedItem> { new CheckedItem() };
                _subsidiaryService.GetSubsidiaryTree(user, DefaultLicenseeSession.LicenseeName).Returns(expected);

                _productService.GetProductAccess(Arg.Any<int>(), Arg.Any<string>()).Returns(new ProductAccess(new List<Product>()));

                // Action
                var result = (CustomerListViewModel)(await controller.CustomerList() as ViewResult).Model;

                // Assert
                Assert.That(result.GroupSubsidiaryList, Is.EqualTo(expected));
            }
        }
    }
}