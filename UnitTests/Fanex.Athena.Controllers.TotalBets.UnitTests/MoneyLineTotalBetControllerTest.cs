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
    public class MoneyLineTotalBetControllerTest : CultureBaseControllerHelperTest
    {
        private IMoneyLineDataAccess _moneyLineDataAccess;

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

            _moneyLineDataAccess = null;
        }

        [Test]
        public async Task Index_WhenCall_ReturnCorrectViewName()
        {
            using (var controller = CreateController())
            {
                // Action
                var viewResult = await controller.Index() as ViewResult;

                // Assert
                StringAssert.Contains("TotalBets/MoneyLine/Main.cshtml", viewResult.ViewName);
            }
        }

        [Test]
        public async Task Index_WhenCall_CallAndGetDataFromService()
        {
            using (var controller = CreateController())
            {
                // Action
                var viewResult = await controller.Index() as ViewResult;
                var viewModel = viewResult.Model as MoneyLineViewModel;

                // Assert
                await _moneyLineDataAccess.ReceivedWithAnyArgs().GetMoneyLineDataList(Arg.Any<MoneyLineMetaModel>());
                Assert.That(viewModel.MainData.Count, Is.EqualTo(1));
            }
        }

        private void SepUpForService()
        {
            _moneyLineDataAccess = Substitute.For<IMoneyLineDataAccess>();

            _moneyLineDataAccess.GetMoneyLineDataList(Arg.Any<MoneyLineMetaModel>())
                .Returns(new ReportResultModel<MoneyLine>
                {
                    TotalData = new MoneyLine(),
                    DataList = new List<MoneyLine> { new MoneyLine() }
                });
        }

        private MoneyLineTotalBetController CreateController()
        {
            return new MoneyLineTotalBetController(_moneyLineDataAccess)
            {
                LangService = LangService,
                SessionServiceInstance = SessionService
            };
        }
    }
}