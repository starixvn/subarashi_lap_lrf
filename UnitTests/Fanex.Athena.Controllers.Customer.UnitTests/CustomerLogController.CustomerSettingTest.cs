namespace Fanex.Athena.Controllers.Customer.UnitTests
{
    using System.Collections.Generic;
    using System.Web.Mvc;

    using Fanex.Athena.Model.Auth;

    using Model.Core.DTO.Common;
    using Model.Customer.ViewModel.CustomerLog;

    using NSubstitute;

    using NUnit.Framework;

    public partial class CustomerLogControllerTest
    {
        [Test]
        public void CustomerSetting_WhenCall_ReturnCorrectView()
        {
            using (var controller = CreateController())
            {
                // Arrange
                _productService.GetProductAccess(Arg.Any<int>(), Arg.Any<string>()).Returns(new ProductAccess(new List<Product>()));
                const string ExpectedViewName = "Customer/CustomerLog/CustomerSettingLog/Main.cshtml";

                // Action
                var result = controller.CustomerSetting() as ViewResult;

                // Assert
                StringAssert.Contains(ExpectedViewName, result.ViewName);
            }
        }

        [Test]
        public void CustomerSetting_WhenCall_ReturnCorrectViewData()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var fakeLicensee = new LicenseeAuthInfo
                {
                    IsAllowedCustomerComm = true
                };
                StubLicenseeSessionData(fakeLicensee);

                var isAllowBA = true;
                _productService.GetProductAccess(Arg.Any<int>(), Arg.Any<string>()).Returns(new ProductAccess(new List<Product> { new Product { ProductCode = Product.BA } }));

                // Action
                var result = (CustomerLogViewModel)(controller.CustomerSetting() as ViewResult).Model;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.Param.IsAllowBA, Is.EqualTo(isAllowBA));
                    Assert.That(result.Param.IsAllowCustComm, Is.EqualTo(fakeLicensee.IsAllowedCustomerComm));
                });
            }
        }
    }
}