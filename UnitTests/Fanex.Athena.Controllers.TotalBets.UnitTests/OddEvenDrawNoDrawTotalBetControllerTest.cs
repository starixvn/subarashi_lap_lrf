namespace Fanex.Athena.Controllers.TotalBets.UnitTests
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Base.UnitTests;
    using DataAccess.TotalBet.Interfaces;
    using Model.Core.ResultModel;
    using Model.TotalBet.DTO;
    using Model.TotalBet.MetaModel;
    using Model.TotalBet.ViewModel;
    using NSubstitute;
    using NUnit.Framework;
    using TotalBets;

    [TestFixture]
    public class OddEvenDrawNoDrawTotalBetControllerTest : CultureBaseControllerHelperTest
    {
        private IOddEvenDrawNoDrawDataAccess _oddEvenDrawNoDrawDataAccess;

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

            _oddEvenDrawNoDrawDataAccess = null;
        }

        [Test]
        public async Task Index_WhenGet_ReturnMainView()
        {
            using (var controller = CreateController())
            {
                // Action
                var viewResult = await controller.Index() as ViewResult;

                // Assert
                StringAssert.Contains("TotalBets/OddEvenDrawNoDraw/Main.cshtml", viewResult.ViewName);
            }
        }

        [Test]
        public async Task Index_WhenGet_GetDataFromService()
        {
            using (var controller = CreateController())
            {
                // Action
                var viewResult = await controller.Index() as ViewResult;
                var viewModel = viewResult.Model as OddEvenDrawNoDrawViewModel;

                // Assert
                await _oddEvenDrawNoDrawDataAccess.ReceivedWithAnyArgs().GetOddEvenDrawNoDrawDataList(Arg.Any<OddEvenDrawNoDrawMetaModel>());
                Assert.That(viewModel.MainData.Count, Is.EqualTo(1));
            }
        }

        private OddEvenDrawNoDrawTotalBetController CreateController()
        {
            return new OddEvenDrawNoDrawTotalBetController(_oddEvenDrawNoDrawDataAccess)
            {
                LangService = LangService,
                SessionServiceInstance = SessionService
            };
        }

        private void SepUpForService()
        {
            _oddEvenDrawNoDrawDataAccess = Substitute.For<IOddEvenDrawNoDrawDataAccess>();

            _oddEvenDrawNoDrawDataAccess
                .GetOddEvenDrawNoDrawDataList(Arg.Any<OddEvenDrawNoDrawMetaModel>())
                .Returns(new ReportResultModel<OddEvenDrawNoDraw>
                {
                    TotalData = new OddEvenDrawNoDraw(),
                    DataList = new List<OddEvenDrawNoDraw> { new OddEvenDrawNoDraw() }
                });
        }
    }
}