namespace Fanex.Athena.Controllers.TotalBets.UnitTests
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Base.UnitTests;
    using DataAccess.TotalBet.Interfaces;
    using Fanex.Athena.Controllers.TotalBets;
    using Model.Core.ResultModel;
    using Model.TotalBet.DTO;
    using Model.TotalBet.MetaModel;
    using Model.TotalBet.ViewModel;
    using NSubstitute;
    using NUnit.Framework;

    [TestFixture]
    public class HalfTimeFullTimeTotalBetControllerTest : CultureBaseControllerHelperTest
    {
        private IHalfTimeFullTimeDataAccess _halfTimeFullTimeDataAccess;

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

            _halfTimeFullTimeDataAccess = null;
        }

        [Test]
        public async Task Index_WhenGet_ReturnMainView()
        {
            using (var controller = CreateController())
            {
                // Action
                var viewResult = await controller.Index() as ViewResult;

                // Assert
                StringAssert.Contains("TotalBets/HalfTimeFullTime/Main.cshtml", viewResult.ViewName);
            }
        }

        [Test]
        public async Task Index_WhenGet_GetDataFromService()
        {
            using (var controller = CreateController())
            {
                // Action
                var viewResult = await controller.Index() as ViewResult;
                var viewModel = viewResult.Model as HalfTimeFullTimeViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    _halfTimeFullTimeDataAccess.ReceivedWithAnyArgs().GetHalfTimeFullTimeDataList(Arg.Any<HalfTimeFullTimeMetaModel>());
                    Assert.That(viewModel.MainData.Count, Is.EqualTo(1));
                });
            }
        }

        private void SepUpForService()
        {
            _halfTimeFullTimeDataAccess = Substitute.For<IHalfTimeFullTimeDataAccess>();

            _halfTimeFullTimeDataAccess
                .GetHalfTimeFullTimeDataList(Arg.Any<HalfTimeFullTimeMetaModel>())
                .Returns(new ReportResultModel<HalfTimeFullTime>
                {
                    TotalData = new HalfTimeFullTime(),
                    DataList = new List<HalfTimeFullTime> { new HalfTimeFullTime() }
                });
        }

        private HalfTimeFullTimeTotalBetController CreateController()
        {
            return new HalfTimeFullTimeTotalBetController(_halfTimeFullTimeDataAccess)
            {
                LangService = LangService,
                SessionServiceInstance = SessionService
            };
        }
    }
}