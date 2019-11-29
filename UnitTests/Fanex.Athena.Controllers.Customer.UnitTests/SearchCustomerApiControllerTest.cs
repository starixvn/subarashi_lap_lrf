namespace Fanex.Athena.Controllers.UnitTests
{
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Base.UnitTests;
    using Customer;
    using DataAccess.Customer.Interfaces;
    using NSubstitute;
    using NUnit.Framework;
    using UnitTest.Common.Extensions;

    [TestFixture]
    public partial class SearchCustomerApiControllerTest : CultureBaseControllerHelperTest
    {
        [Test]
        public async Task SearchCustomer_WhenCall_ReturnCorrectData()
        {
            var searchCustomerDataAccess = Substitute.For<ISearchCustomerDataAccess>();
            using (var controller = CreateController(searchCustomerDataAccess))
            {
                // Arrange
                const string Query = " test   ";
                var expectedCustomerNames = new[] { "test1", "test2" };

                SetUpDefaultFakeData();
                searchCustomerDataAccess.SearchCustomers(0, string.Empty, string.Empty, false)
                    .ReturnsForAnyArgs(expectedCustomerNames);

                // Action
                var result = await controller.SearchCustomer(Query) as JsonResult;
                var resultData = result.Data as object;

                // Assert
                Assert.Multiple(() =>
                {
                    searchCustomerDataAccess.Received(1).SearchCustomers(
                        SessionService.UserSession.UserId,
                        Query.Trim(),
                        Arg.Any<string>(),
                        false);
                    Assert.That(resultData.GetValue("query"), Is.EqualTo(Query.Trim()));
                    Assert.That(resultData.GetValue("suggestions"), Is.EqualTo(expectedCustomerNames));
                });
            }
        }

        private SearchCustomerAPIController CreateController(ISearchCustomerDataAccess searchCustomerDataAccess)
        {
            return new SearchCustomerAPIController(searchCustomerDataAccess)
            {
                LangService = LangService,
                SessionServiceInstance = SessionService,
            };
        }
    }
}