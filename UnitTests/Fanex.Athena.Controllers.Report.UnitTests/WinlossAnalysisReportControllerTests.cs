using Fanex.Athena.Controllers.Base.UnitTests;
using Fanex.Athena.Controllers.BetList;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.Customer.Interfaces;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Controllers.Report.UnitTests
{
    public class WinlossAnalysisReportControllerTests : CultureBaseControllerHelperTest
    {
        private IProductService _productService;
        private ISubsidiaryService _subsidiaryService;
        private ICustomerClassService _customerClassService;
        private IAuthorizationService _authorizationService;

        [SetUp]
        public void Setup()
        {
            _productService = Substitute.For<IProductService>();
            _subsidiaryService = Substitute.For<ISubsidiaryService>();
            _customerClassService = Substitute.For<ICustomerClassService>();
            _authorizationService = Substitute.For<IAuthorizationService>();
        }

        private WinlossAnalysisReportController CreateController()
            => new WinlossAnalysisReportController(_productService, _subsidiaryService, _customerClassService, _authorizationService);
    }
}