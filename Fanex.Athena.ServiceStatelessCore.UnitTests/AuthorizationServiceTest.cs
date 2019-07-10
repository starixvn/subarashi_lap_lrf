using Fanex.Athena.DataAccess.Core.Users.Interfaces;
using Fanex.Athena.Model.Auth;
using Fanex.Athena.Model.Auth.Enum;
using Fanex.Athena.Service.Core.Common.Interfaces;
using Fanex.Athena.Service.StatelessCore;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.ServiceStatelessCore.UnitTests
{
    [TestFixture]
    public class AuthorizationServiceTest
    {
        private IAuthorizationService _authorizationService;

        private IAthorizationDataAccess _authorizationDataAccess;
        private IFunctionService _functionService;
        [SetUp]
        public void SetUp()
        {
            _authorizationDataAccess = Substitute.For<IAthorizationDataAccess>();
            _functionService = Substitute.For<IFunctionService>();
            _authorizationService = new AuthorizationService(_authorizationDataAccess, _functionService);
        }
        [Test]
        public void IsAllowedEditCommission_ApplicationModeIsParasiticAndPortalFunctionListContainCorrectKey_ReturnTrue()
        {
            // Arrange
            var functionList = new string[] { "CommissionGroupList55" };
            var userSession = new UserAuthInfo { PortalFunctionList = functionList, ApplicationMode = AppMode.Parasitic };

            // Action
            var result = _authorizationService.IsAllowedEditCommission(userSession);

            // Assert
            Assert.That(result, Is.True);
        }

        [Test]
        public void IsAllowedEditCommission_ApplicationModeIsParasiticAndPortalFunctionListNotContainCorrectKey_ReturnFalse()
        {
            // Arrange
            var functionList = new string[] { "CommissionGroupList56" };
            var userSession = new UserAuthInfo { PortalFunctionList = functionList, ApplicationMode = AppMode.Parasitic };

            // Action
            var result = _authorizationService.IsAllowedEditCommission(userSession);

            // Assert
            Assert.That(result, Is.False);
        }

        [Test]
        public void IsAllowedEditCommission_ApplicationModeIsNotParasiticAndFunctionIdListContainCorrectKey_ReturnTrue()
        {
            // Arrange
            var functionIdList = new int[] { 55 };
            var userSession = new UserAuthInfo { FunctionIdList = functionIdList, ApplicationMode = AppMode.Self };

            // Action
            var result = _authorizationService.IsAllowedEditCommission(userSession);

            // Assert
            Assert.That(result, Is.True);
        }

        [Test]
        public void IsAllowedEditCommission_ApplicationModeIsNotParasiticAndFunctionIdListNotContainCorrectKey_ReturnFalse()
        {
            // Arrange
            var functionIdList = new int[] { 56 };
            var userSession = new UserAuthInfo { FunctionIdList = functionIdList, ApplicationMode = AppMode.Self };

            // Action
            var result = _authorizationService.IsAllowedEditCommission(userSession);

            // Assert
            Assert.That(result, Is.False);
        }

        [Test]
        public void IsAllowedSpecialBA_ApplicationModeIsParasiticAndPortalFunctionListContainCorrectKey_ReturnTrue()
        {
            // Arrange
            var functionList = new string[] { "SpecialBA54" };
            var userSession = new UserAuthInfo { PortalFunctionList = functionList, ApplicationMode = AppMode.Parasitic };

            // Action
            var result = _authorizationService.IsAllowedSpecialBA(userSession);

            // Assert
            Assert.That(result, Is.True);
        }

        [Test]
        public void IsAllowedSpecialBA_ApplicationModeIsParasiticAndPortalFunctionListNotContainCorrectKey_ReturnFalse()
        {
            // Arrange
            var functionList = new string[] { "SpecialBA55" };
            var userSession = new UserAuthInfo { PortalFunctionList = functionList, ApplicationMode = AppMode.Parasitic };

            // Action
            var result = _authorizationService.IsAllowedSpecialBA(userSession);

            // Assert
            Assert.That(result, Is.False);
        }

        [Test]
        public void IsAllowedSpecialBA_ApplicationModeIsNotParasiticAndFunctionIdListContainCorrectKey_ReturnTrue()
        {
            // Arrange
            var functionIdList = new int[] { 54 };
            var userSession = new UserAuthInfo { FunctionIdList = functionIdList, ApplicationMode = AppMode.Self };

            // Action
            var result = _authorizationService.IsAllowedSpecialBA(userSession);

            // Assert
            Assert.That(result, Is.True);
        }

        [Test]
        public void IsAllowedSpecialBA_ApplicationModeIsNotParasiticAndFunctionIdListNotContainCorrectKey_ReturnFalse()
        {
            // Arrange
            var functionIdList = new int[] { 55 };
            var userSession = new UserAuthInfo { FunctionIdList = functionIdList, ApplicationMode = AppMode.Self };

            // Action
            var result = _authorizationService.IsAllowedSpecialBA(userSession);

            // Assert
            Assert.That(result, Is.False);
        }

    }
}
