namespace Fanex.Athena.Controllers.Report.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using System.Web.Script.Serialization;
    using Base.UnitTests;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Configuration;
    using Fanex.Athena.Model.Core.ResultModel;
    using Fanex.Athena.Model.Report.DTO;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.Report.ViewModel;
    using NSubstitute;

    using NUnit.Framework;

    [TestFixture]
    public class GodOfFortuneWinLossReportControllerTest : CultureBaseControllerHelperTest
    {
        private IReportAPIClient _reportAPIClient;
        private IReportSettingService _reportSettingService;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();
            _reportAPIClient = Substitute.For<IReportAPIClient>();
            _reportSettingService = Substitute.For<IReportSettingService>();
            SetUpDefaultFakeData();
        }

        [Test]
        public void Index_WhenCall_ReturnCorrectViewResult()
        {
            using (var controller = CreateController())
            {
                // Action
                var viewResult = controller.Index() as ViewResult;
                var viewModel = viewResult.Model as GodOfFortuneWinLossViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    StringAssert.Contains("~/Views/Desktop/Report/GodOfFortuneWinLoss/Main.cshtml", viewResult.ViewName);
                    Assert.That(viewModel.Param.LicenseeId, Is.EqualTo(SessionService.LicenseeSession.LicenseeId));
                });
            }
        }

        [Test]
        public void Index_WhenCall_GetReportSetting()
        {
            using (var controller = CreateController())
            {
                // Action
                var viewResult = controller.Index() as ViewResult;

                // Assert
                _reportSettingService.Received(1).GetSetting(PermissionKeys.ReportGodOfFortuneWinLoss,
                SessionService.LicenseeSession.LicenseeName);
            }
        }

        [Test]
        public async Task IndexPost_ValidModelNoSorting_GetDataFromAPI()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = CreateValidMetaModel();
                metaModel.CurrencyIdList = "9,3";
                var expectedResult = SetUpForGettingData(metaModel, totalItem: 5);

                // Action
                var result = await controller.Index(metaModel, null, null, 0);
            }
        }

        private GodOfFortuneWinLossMetaModel CreateValidMetaModel(string sortBy = null, string sortOrder = "asc")
        {
            var model = new GodOfFortuneWinLossMetaModel
            {
                CurrencyId = 1,
                SortBy = sortBy,
                SortOrder = sortOrder,
                FromDate = new DateTime(2021, 2, 16),
                ToDate = new DateTime(2021, 2, 20)
            };
            return model;
        }

        private SortableReportResultModel<GodOfFortuneWinLoss> SetUpForGettingData(GodOfFortuneWinLossMetaModel metaModel, int totalItem = 0)
        {
            var dataList = new SortableList<GodOfFortuneWinLoss>();

            var random = new Random();
            for (int i = 0; i < totalItem; i++)
            {
                dataList.Add(new GodOfFortuneWinLoss
                {
                    TurnOver = random.Next(1, 100),
                    LicenseeWinLoss = random.Next(1, 100)
                });
            }

            var result = new SortableReportResultModel<GodOfFortuneWinLoss>
            {
                DataList = dataList,
                TotalDataList = new List<GodOfFortuneWinLoss>(),
                SummaryTotal = new Dictionary<string, GodOfFortuneWinLoss>(),
                AdditionalInfo = "1"
            };

            var json = new JavaScriptSerializer().Serialize(result);

            _reportAPIClient.PostStringAsync("api/GodOfFortuneWinLoss/Index", Arg.Any<GodOfFortuneWinLossMetaModel>(), DefaultUserSession.Language).Returns(json);

            return result;
        }

        private GodOfFortuneWinLossReportController CreateController()
        {
            var reportSetting = new ReportSetting
            {
                MinDate = new DateTime(2021, 2, 15),
                MaxDate = new DateTime(2021, 3, 30),
            };

            _reportSettingService.GetSetting(PermissionKeys.ReportGodOfFortuneWinLoss, SessionService.LicenseeSession.LicenseeName).
                Returns(reportSetting);

            var userSession = new UserAuthInfo
            {
                CurrencyList = new Dictionary<int, string> {
                    {9, "AUD" },
                    {3, "USD" },
                    {20, "UUS" }
                },
                CurrencyAgentList = new Dictionary<int, int[]>{
                    {9, new[]{ 1,2,3} },
                    {3, new[]{ 1,2,3} },
                    {20, new[]{ 1,2,3} }
                },
                Language = "lan"
            };

            SessionService.UserSession.Returns(userSession);

            return new GodOfFortuneWinLossReportController(_reportSettingService, _reportAPIClient)
            {
                SessionServiceInstance = SessionService,
                LangService = LangService,
                LicenseeSettingServiceInstance = Substitute.For<ILicenseeSettingService>(),
                AppSettingInstance = AppSettings,
            };
        }
    }
}