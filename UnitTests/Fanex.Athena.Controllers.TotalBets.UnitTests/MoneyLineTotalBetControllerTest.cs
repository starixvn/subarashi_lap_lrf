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
    using Service.StatelessCore.Interfaces;

    [TestFixture]
    public class MoneyLineTotalBetControllerTest : CultureBaseControllerHelperTest
    {
        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            SetUpDefaultFakeData();

            SepUpForService();

            _authService = Substitute.For<IAuthorizationService>();
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();

            _moneyLineDataAccess = null;
            _authService = null;
        }

        private IMoneyLineDataAccess _moneyLineDataAccess;

        private IAuthorizationService _authService;

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
            return new MoneyLineTotalBetController(_moneyLineDataAccess, _authService)
            {
                LangService = LangService,
                SessionServiceInstance = SessionService
            };
        }
    }
}