namespace Fanex.Athena.Controllers.TotalBets.UnitTests
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Base.UnitTests;
    using DataAccess.TotalBet.Interfaces;
    using Fanex.Athena.Controllers.TotalBets;
    using Model.TotalBet.DTO;
    using Model.TotalBet.MetaModel;
    using Model.TotalBet.ViewModel;
    using NSubstitute;
    using NUnit.Framework;

    [TestFixture]
    public class OutrightTotalBetControllerTest : CultureBaseControllerHelperTest
    {
        private IOutrightDataAccess _outrightDataAccess;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            SetUpDefaultFakeData();

            SepUpForService();

        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();

            _outrightDataAccess = null;
        }

        [Test]
        public async Task Index_WhenGet_ReturnMainView()
        {
            using (var controller = CreateController())
            {
                // Action
                var viewResult = await controller.Index() as ViewResult;

                // Assert
                StringAssert.Contains("TotalBets/Outright/Main.cshtml", viewResult.ViewName);
            }
        }

        [Test]
        public async Task Index_WhenGet_GetDataFromService()
        {
            using (var controller = CreateController())
            {
                // Action
                var viewResult = await controller.Index() as ViewResult;
                var viewModel = viewResult.Model as OutrightViewModel;

                // Assert
                await _outrightDataAccess.ReceivedWithAnyArgs().GetOutrightDataList(Arg.Any<OutrightMetaModel>());
                Assert.That(viewModel.MainData.Count, Is.EqualTo(1));
            }
        }


        private OutrightTotalBetController CreateController()
        {
            return new OutrightTotalBetController(_outrightDataAccess)
            {
                LangService = LangService,
                SessionServiceInstance = SessionService
            };
        }

        private void SepUpForService()
        {
            _outrightDataAccess = Substitute.For<IOutrightDataAccess>();

            _outrightDataAccess
                .GetOutrightDataList(Arg.Any<OutrightMetaModel>())
                .Returns(new List<Outright> { new Outright() });
        }
    }
}