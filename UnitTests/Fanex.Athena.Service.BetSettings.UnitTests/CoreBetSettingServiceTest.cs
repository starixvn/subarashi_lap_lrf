namespace Fanex.Athena.Service.BetSettings.UnitTests
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Customer.Interfaces;

    using DataAccess.BetSettings.Interfaces;

    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Auth.Enum;

    using Model.BetSettings.DTO;
    using Model.Core.DataDomain;
    using Model.Customer.DTO;

    using NSubstitute;

    using NUnit.Framework;

    using StatelessCore.Interfaces;

    using UnitTest.Common.Helpers;

    [TestFixture]
    public partial class CoreBetSettingServiceTest
    {
        private const int LicenseeId = 9999;

        private ICoreBetSettingDataAccess _coreBetSettingDataAccess;
        private IAuthorizationService _authorizationService;
        private ICustomerService _customerService;
        private CoreBetSettingService _coreBetSettingService;

        [OneTimeSetUp]
        public void Setup()
        {
            _coreBetSettingDataAccess = Substitute.For<ICoreBetSettingDataAccess>();
            _authorizationService = Substitute.For<IAuthorizationService>();
            _customerService = Substitute.For<ICustomerService>();
            _coreBetSettingService = new CoreBetSettingService(
                _authorizationService,
                _coreBetSettingDataAccess,
                _customerService);
        }

        [Test]
        public void GetCustomerInfo_WhenCall_ReturnCorrectData()
        {
            // Arrange
            const int CustId = 3423423;
            var expectedCustomer = FakeHelper.Create<CustomerInfo>();
            _customerService.GetCustomerInfo(CustId).Returns(expectedCustomer);

            // Action
            var result = _coreBetSettingService.GetCustomerInfo(CustId);

            // Assert
            Assert.That(result, Is.EqualTo(expectedCustomer));
        }

        [Test]
        public void IsBetSettingEditable_WhenCall_ReturnCorrectData()
        {
            // Arrange
            var userSession = new UserAuthInfo
            {
                ApplicationMode = AppMode.Parasitic,
                UserId = 234234,
                PortalFunctionList = new OneAuthPermission[] {
                    new OneAuthPermission {FunctionKey="sdf" } ,
                                        new OneAuthPermission {FunctionKey="cxv" } ,
                                        new OneAuthPermission {FunctionKey="sdfsdf" }
                }
            };
            _authorizationService.HasPermissions(userSession, PermissionKeys.CustomerInfoEditBetSetting).Returns(true);

            // Action
            var result = _coreBetSettingService.IsBetSettingEditable(userSession);

            // Assert
            Assert.That(result, Is.True);
        }

        [Test]
        public async Task GetBetSettingProducts_IsSyncCasino_ReturnCorrectData()
        {
            // Arrange
            const int CustId = 3434;
            _customerService.GetCustomerInfo(CustId).Returns(new CustomerInfo { SyncCasino = true });

            _coreBetSettingDataAccess.GetBetSettingProductsAsync(LicenseeId).Returns(Task.FromResult(GetSampleBetSettingProducts()));

            // Action
            var result = await _coreBetSettingService.GetBetSettingProductsAsync(CustId, LicenseeId);

            // Assert
            Assert.That(
                result.Select(x => x.ProductId).ToArray(),
                Is.EqualTo(new[] { ProductTypes.RngCasino, ProductTypes.Sportsbook, ProductTypes.Macau }));
        }

        [Test]
        public async Task GetBetSettingProducts_IsNotSyncCasino_ReturnCorrectData()
        {
            // Arrange
            const int CustId = 3434;
            _customerService.GetCustomerInfo(CustId).Returns(new CustomerInfo { SyncCasino = false });

            _coreBetSettingDataAccess.GetBetSettingProductsAsync(LicenseeId).Returns(Task.FromResult(GetSampleBetSettingProducts()));

            // Action
            var result = await _coreBetSettingService.GetBetSettingProductsAsync(CustId, LicenseeId).ConfigureAwait(false);

            // Assert
            Assert.That(
                result.Select(x => x.ProductId).ToArray(),
                Is.EqualTo(new[] { ProductTypes.Sportsbook, ProductTypes.Macau }));
        }

        private static IEnumerable<BetSettingProduct> GetSampleBetSettingProducts()
        {
            return new[]
            {
                new BetSettingProduct { ProductId = ProductTypes.RngCasino, IsEnable = true },
                new BetSettingProduct { ProductId = ProductTypes.Sportsbook, IsEnable = true },
                new BetSettingProduct { ProductId = ProductTypes.NumberGame, IsEnable = false },
                new BetSettingProduct { ProductId = ProductTypes.Macau, IsEnable = true },
            };
        }
    }
}