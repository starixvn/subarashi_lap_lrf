namespace Fanex.Athena.Controllers.UnitTests
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Base.UnitTests;
    using Customer;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.Core.DTO.Common;
    using Model.Customer.MetaModel;
    using NSubstitute;
    using NUnit.Framework;
    using Resources;
    using Service.Customer.Interfaces;

    [TestFixture]
    public partial class CustomerComGroupControllerTest : CultureBaseControllerHelperTest
    {
        private IGroupComService _groupComService;
        private IProductService _productService;
        private IFunctionUMService _functionUMService;

        [SetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();
            SetUpDefaultFakeData();
            _groupComService = Substitute.For<IGroupComService>();
            _productService = Substitute.For<IProductService>();
            _functionUMService = Substitute.For<IFunctionUMService>();
        }

        [TearDown]
        public void TearDown()
        {
            AppSettings.ClearReceivedCalls();
            _groupComService.ClearReceivedCalls();
        }

        [TestCase("", false, "NO")]
        [TestCase("", true, "NO")]
        [TestCase("abc", true, "NO")]
        [TestCase("abc", false, "OK")]
        public void Validate_WhenCall_ReturnCorrectResult(string groupName, bool groupExist, string expectedResult)
        {
            using (var controller = CreateController())
            {
                // Arrange
                _groupComService.CheckExistingGroupByName(SessionService.LicenseeSession.LicenseeId, groupName)
                    .Returns(groupExist);

                // Action
                var result = controller.Validate(groupName);

                // Assert
                Assert.That(result, Is.EqualTo(expectedResult));
            }
        }

        [Test]
        public async Task Delete_WhenCall_CallDeleteGroup()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const int GroupId = 999;
                const bool IsRemovePlayerComm = true;
                const bool IsResetDefault = true;
                var licenseeId = SessionService.LicenseeSession.LicenseeId;
                var userSession = SessionService.UserSession;
                var productList = new List<Product> { new Product { ProductCode = Product.CS } };
                var productAccess = new ProductAccess(productList);
                _productService.GetProductAccess(licenseeId, userSession.Language).Returns(productAccess);
                _groupComService.DeleteGroupAsync(null).ReturnsForAnyArgs(new ResultInfo());

                // Action
                var result = await controller.Delete(GroupId, IsRemovePlayerComm, IsResetDefault) as JsonResult;
                var resultInfo = result.Data as ResultInfo;

                // Assert
                Assert.Multiple(() =>
                {
                    _groupComService.Received(1).DeleteGroupAsync(Arg.Is<DeleteGroupMetaModel>(x =>
                        x.GroupId == GroupId &&
                        x.LicenseeId == licenseeId &&
                        x.UserId == userSession.UserId &&
                        x.UserName == userSession.UserName &&
                        x.Language == userSession.Language &&
                        x.IsRemoveCommSetting == IsRemovePlayerComm &&
                        x.IsAllowedCSComm == productAccess.IsAllowCS &&
                        x.IsResetDefault == IsResetDefault));
                    Assert.That(resultInfo.Code, Is.Zero);
                    Assert.That(resultInfo.Message, Is.EqualTo(ViewResources.CommIsClear));
                });
            }
        }

        private CustomerComGroupController CreateController()
        {
            var controller = Substitute.ForPartsOf<CustomerComGroupController>(
               _groupComService,
               _productService,
               _functionUMService);

            controller.LangService = LangService;
            controller.SessionServiceInstance = SessionService;
            controller.ControllerContext = ControllerContext;

            return controller;
        }
    }
}