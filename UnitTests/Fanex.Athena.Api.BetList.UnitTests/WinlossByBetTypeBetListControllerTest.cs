namespace Fanex.Athena.Api.BetList.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Net.Http;
    using System.Threading.Tasks;

    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Service.Core.Utility.Interfaces;

    using Model.BetList.MetaModel;

    using NSubstitute;

    using NUnit.Framework;

    public class WinlossByBetTypeBetListControllerTest : ApiBetListBaseControllerHelperTest
    {
        private const string UspKey = "Lrf_BetList_SelWinLossByBetType";

        private const string ApiPath = "/BetList/GetBetListPaging";
        private ICurrencyValidation _currencyValidation;

        [SetUp]
        public void SetUp()
        {
            MockSessionData();
            _currencyValidation = Substitute.For<ICurrencyValidation>();
            _currencyValidation.IsValidCurrency(Arg.Any<int>(), Arg.Any<bool>()).Returns(true);
            _currencyValidation.IsValidBaseCurrency(Arg.Any<string>(), Arg.Any<bool>()).Returns(true);

            AuthorizationService.HasPermissionOnData(Arg.Any<IDictionary<int, int[]>>(), Arg.Any<int>(), Arg.Any<long>()).Returns(true);
        }

        [TestCase(true, false)]
        [TestCase(false, false)]
        [TestCase(false, true)]
        public async Task Detail_InvalidCurrency_ReturnNull(bool validCurrency,
            bool validBaseCurrency)
        {
            using (var controller = CreateController())
            {
                _currencyValidation.IsValidCurrency(Arg.Any<int>(), Arg.Any<bool>()).Returns(validCurrency);
                _currencyValidation.IsValidBaseCurrency(Arg.Any<string>(), Arg.Any<bool>()).Returns(validBaseCurrency);

                // Arrange
                const int CurrencyId = 1;

                StubUserSessionData(new UserAuthInfo { CurrencyList = new Dictionary<int, string>() });

                // Action
                var result = await controller.Index(1, 50, CurrencyId, string.Empty, string.Empty, DateTime.Today, DateTime.Today, 1);

                // Assert
                Assert.That(result, Is.Null);
            }
        }

        [TestCase(0, "usd", "usd")]
        [TestCase(1, null, "")]
        [TestCase(2, "", "")]
        public async Task Detail_WhenCall_CallBetListApiWithCorrectParameters(int currencyId, string baseCurrency, string expectedBaseCurrency)
        {
            using (var controller = CreateController())
            {
                // Arrange
                const int Page = 2;
                const int Rows = 50;
                const string CurrencyName = "USD";
                var fromDate = new DateTime(2018, 1, 1);
                var toDate = new DateTime(2018, 1, 2);
                const int BetType = 1;
                const string SortBy = "Index";
                const string SortOrder = "asc";

                StubUserSessionData(new UserAuthInfo
                {
                    Language = SessionLanguage,
                    CurrencyList = new Dictionary<int, string> { { currencyId, "Currency" } },
                    CurrencyAgentList = new Dictionary<int, int[]>()
                });

                var expect = new HttpResponseMessage();
                StubBetListApiPostAsync(Arg.Any<BetListMetaModel>(), ApiPath, expect);

                // Action
                var actual = await controller.Index(Page, Rows, currencyId, CurrencyName, baseCurrency, fromDate, toDate, BetType, SortBy, SortOrder);

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(expect, Is.EqualTo(actual));
                    BetListApiClient.Received().PostAsync(
                        ApiPath,
                        Arg.Is<BetListMetaModel>(x => x.UspKey == UspKey
                            && x.PageIndex == Page
                            && x.PageSize == Rows
                            && x.BetType == BetType
                            && x.FromDate == fromDate
                            && x.ToDate == toDate
                            && x.CurrencyName == CurrencyName
                            && x.BaseCurrency == expectedBaseCurrency
                            && x.SortBy == SortBy
                            && x.SortOrder == SortOrder),
                            SessionLanguage
                        );
                });
            }
        }

        private WinlossByBetTypeBetListController CreateController()
        {
            return new WinlossByBetTypeBetListController(
                LangService,
                AuthorizationService,
                BetListApiClient,
                BalanceUpDataAccess,
                _currencyValidation
                )
            {
                SessionService = SessionService,
                ProductService = ProductService
            };
        }
    }
}