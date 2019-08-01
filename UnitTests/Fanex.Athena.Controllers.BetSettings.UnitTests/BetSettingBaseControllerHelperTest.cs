namespace Fanex.Athena.Controllers.BetSettings.UnitTests
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Controllers.Base.UnitTests;

    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Model.BetSettings.DTO;
    using Model.BetSettings.MetaModel;
    using Model.BetSettings.ViewModel;
    using Model.Customer.DTO;

    using NSubstitute;

    using NUnit.Framework;

    using Service.BetSettings.Interfaces;

    public class BetSettingBaseControllerHelperTest : CultureBaseControllerHelperTest
    {
        protected ICoreBetSettingService CoreBetSettingService { get; private set; }

        protected IProductService ProductService { get; private set; }
        protected ILicenseeSettingService LicenseeSettingService { get; set; }
        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();
            LicenseeSettingService = Substitute.For<ILicenseeSettingService>();
            CoreBetSettingService = Substitute.For<ICoreBetSettingService>();
            ProductService = Substitute.For<IProductService>();
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();
            CoreBetSettingService = null;
            ProductService = null;
            LicenseeSettingService = null;
        }

        protected void SetUpDefaultFakeBetSettingData()
        {
            StubGetValueAppSettings("FakeLicenseeList", DefaultLicenseeSession.LicenseeId.ToString());
            CoreBetSettingService.GetCustomerInfo(Arg.Any<int>()).Returns(new CustomerInfo { SyncCasino = true });
            CoreBetSettingService.GetBetSettingProductsAsync(Arg.Any<int>(),
                DefaultLicenseeSession.LicenseeId)
                .Returns(Task.FromResult<IEnumerable<BetSettingProduct>>(new List<BetSettingProduct>()));
        }

        protected void AssertRequiredProperties(BetSettingBaseViewModel viewModel, BetSettingMetaModel metaModel, bool isFakeLicensee = false, bool isEditable = false)
        {
            Assert.That(metaModel.IsFakeLicensee, Is.EqualTo(isFakeLicensee));
            Assert.That(viewModel.Param, Is.EqualTo(metaModel));
            Assert.That(viewModel.Editable, Is.EqualTo(isEditable));
            Assert.That(viewModel.BetSettingProducts, Is.Empty);
        }
    }
}