namespace Fanex.Athena.Controllers.UnitTests
{
    using System.Threading.Tasks;
    using System.Web.Mvc;

    using Base.UnitTests;

    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.UnitTest.Common.Extensions;

    using NSubstitute;

    using NUnit.Framework;

    [TestFixture]
    public partial class CustomerApiControllerTest : CultureBaseControllerHelperTest
    {
        [Test]
        public async Task MoveToGroupCom_NotAllowedCustomerComm_ReturnErrorResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                SessionService.LicenseeSession.Returns(new LicenseeAuthInfo
                {
                    IsAllowedCustomerComm = false
                });

                // Action
                var result = await controller.MoveToGroupCom(string.Empty, 0) as JsonResult;
                var resultData = result.Data as object;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(controller.Response.StatusCode, Is.EqualTo(403));
                    Assert.That(resultData.GetValue("ErrCode"), Is.EqualTo(403));
                });
            }
        }
    }
}
