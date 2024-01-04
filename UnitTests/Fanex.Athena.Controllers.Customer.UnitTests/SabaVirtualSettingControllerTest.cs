namespace Fanex.Athena.Controllers.Customer.UnitTests
{
    using System.Threading.Tasks;
    using AutoFixture;
    using Base.UnitTests;
    using Fanex.Athena.Model.Customer.DTO;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.Service.Customer.Interfaces;
    using NSubstitute;
    using NUnit.Framework;

    public partial class SabaVirtualSettingControllerTest : CultureBaseControllerHelperTest
    {
        private ISabaVirtualSettingService _service;
        private Fixture _fixture = new Fixture();

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();
            SetUpDefaultFakeData();
            _service = Substitute.For<ISabaVirtualSettingService>();
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();
            _service = null;
        }

        [Test]
        public async Task Index_WhenCall_ReturnCorrectlyView()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const string ExpectedViewName = "Customer/SabaVirtualSetting/Index.cshtml";

                // Action
                var result = await controller.Index();

                // Assert
                StringAssert.Contains(ExpectedViewName, result.ViewName);
            }
        }

        [Test]
        public async Task GetSabaVirtualSettingInformation_WhenCall_ReturnSabaVirtualSetting()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var levelIds = _fixture.CreateMany<string>();

                var expectedResult = _fixture.CreateMany<SabaVirtualSettingInformationModel>();
                _service.GetSabaVirtualSetting(Arg.Any<SabaVirtuaSettingInformationMetaModel>()).Returns(expectedResult);

                // Action
                var result = await controller.GetSabaVirtualSettingInformation(levelIds);

                // Assert
                Assert.AreEqual(expectedResult, result.Model);
            }
        }

        private SabaVirtualSettingController CreateController()
        {
            return new SabaVirtualSettingController(_service)
            {
                LangService = LangService,
                SessionServiceInstance = SessionService,
            };
        }
    }
}