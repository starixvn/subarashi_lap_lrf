using System;
using System.Collections.Generic;
using System.Linq;
using Fanex.Athena.DataAccess.Core.Users.Interfaces;
using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Model.Auth;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.Auth.Enum;
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

        private ICustomMemoryCacheService _cache;

        [SetUp]
        public void SetUp()
        {
            _authorizationDataAccess = Substitute.For<IAthorizationDataAccess>();
            _cache = Substitute.For<ICustomMemoryCacheService>();
            _authorizationService = new AuthorizationService(_authorizationDataAccess, _cache);
        }

        [TearDown]
        public void TearDown()
        {
            _authorizationDataAccess = null;
        }

        [Test]
        public void IsAllowedEditCommission_ApplicationModeIsParasiticAndPortalFunctionListContainCorrectKey_ReturnTrue()
        {
            // Arrange
            var functionList = new OneAuthPermission[] {
                new OneAuthPermission {FunctionKey="CommissionGroupList55" } };
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
            var functionList = new OneAuthPermission[] {
                new OneAuthPermission {FunctionKey=PermissionKeys.BettingTicketCenter } };
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
            var functionList = new List<Function> {
                new Function {
                    FunctionKey = PermissionKeys.CustomerInfoCommissionGroupList
                }
            };
            var userSession = new UserAuthInfo { FunctionList = functionList, ApplicationMode = AppMode.Self };

            // Action
            var result = _authorizationService.IsAllowedEditCommission(userSession);

            // Assert
            Assert.That(result, Is.True);
        }

        [Test]
        public void IsAllowedEditCommission_ApplicationModeIsNotParasiticAndFunctionListNotContainCorrectKey_ReturnFalse()
        {
            // Arrange
            var functionList = new List<Function> {
                new Function {
                    FunctionKey = PermissionKeys.BettingTicketCenter
                }
            }; var userSession = new UserAuthInfo { FunctionList = functionList, ApplicationMode = AppMode.Self };

            // Action
            var result = _authorizationService.IsAllowedEditCommission(userSession);

            // Assert
            Assert.That(result, Is.False);
        }

        [Test]
        public void IsAllowedSpecialBA_ApplicationModeIsParasiticAndPortalFunctionListContainCorrectKey_ReturnTrue()
        {
            // Arrange
            var functionList = new OneAuthPermission[] {
                new OneAuthPermission {FunctionKey= PermissionKeys.CustomerInfoSpecialBA } };
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
            var functionList = new OneAuthPermission[] {
                new OneAuthPermission {FunctionKey= PermissionKeys.BettingTicketCenter } };

            var userSession = new UserAuthInfo { PortalFunctionList = functionList, ApplicationMode = AppMode.Parasitic };

            // Action
            var result = _authorizationService.IsAllowedSpecialBA(userSession);

            // Assert
            Assert.That(result, Is.False);
        }

        [Test]
        public void IsAllowedSpecialBA_ApplicationModeIsNotParasiticAndFunctionListContainCorrectKey_ReturnTrue()
        {
            // Arrange
            var functionList = new List<Function> {
                new Function {
                    FunctionKey = PermissionKeys.CustomerInfoSpecialBA
                }
            };
            var userSession = new UserAuthInfo { FunctionList = functionList, ApplicationMode = AppMode.Self };

            // Action
            var result = _authorizationService.IsAllowedSpecialBA(userSession);

            // Assert
            Assert.That(result, Is.True);
        }

        [Test]
        public void IsAllowedSpecialBA_ApplicationModeIsNotParasiticAndFunctionIdListNotContainCorrectKey_ReturnFalse()
        {
            // Arrange
            var functionList = new List<Function> {
                new Function {
                    FunctionKey = PermissionKeys.CustomerInfoCommissionGroupList
                }
            };
            var userSession = new UserAuthInfo { FunctionList = functionList, ApplicationMode = AppMode.Self };

            // Action
            var result = _authorizationService.IsAllowedSpecialBA(userSession);

            // Assert
            Assert.That(result, Is.False);
        }

        [Test]
        public void HasPermissionOnData_CustIdAndTransIdIsZero_ReturnTrue()
        {
            //Arrange
            var currencyAgent = new Dictionary<int, int[]>
            {
                { 1, new[] { 100, 200 } }
            };

            //Action

            var result = _authorizationService.HasPermissionOnData(currencyAgent, 0, 0);

            //Assert

            Assert.That(result, Is.True);
        }

        [Test]
        public void HasPermissionOnData_CustBelongToUser_ReturnTrue()
        {
            //Arrange
            var currencyAgent = new Dictionary<int, int[]>
            {
                { 1, new[] { 100, 200 } }
            };

            _authorizationDataAccess.IsCustomerBelonging(Arg.Any<int>(), Arg.Any<long>()).Returns(new Tuple<int, int>(1, 100));

            //Action

            var result = _authorizationService.HasPermissionOnData(currencyAgent, 0, 0);

            //Assert

            Assert.That(result, Is.True);
        }

        [Test]
        public void HasPermissionOnData_CustNotBelongToUser_ReturnFalse()
        {
            //Arrange
            const int custId = 1;
            var currencyAgent = new Dictionary<int, int[]>
            {
                { 1, new[] { 100, 200 } }
            };
            _authorizationDataAccess.IsCustomerBelonging(custId, Arg.Any<long>()).Returns(new Tuple<int, int>(1, 1));

            //Action

            var result = _authorizationService.HasPermissionOnData(currencyAgent, custId, 0);

            //Assert

            Assert.That(result, Is.False);
        }

        [TestCase("alex", "alex2", "any,any2", false, false)]
        [TestCase("alex", "any2", "alex,any2", false, true)]
        [TestCase("alex", "any2", "alex", false, true)]
        [TestCase("alex", "alex2", "any,any2", true, true)]
        public void HasPermissions_WhenCallWithPortalFunctionKey_ReturnCorrectResult(
            string permissionKey1,
            string permissinKey2,
            string userPermissionKey,
            bool isAdmin,
            bool expectedResult)
        {
            //Arrange
            var userFunctionList = userPermissionKey.Split(',').Select(x => new OneAuthPermission { FunctionKey = x }).ToArray();
            var userAuthInfo = new UserAuthInfo { PortalFunctionList = userFunctionList, IsSuperAdmin = isAdmin, ApplicationMode = AppMode.Parasitic };

            //Action

            var result = _authorizationService.HasPermissions(userAuthInfo, permissionKey1, permissinKey2);

            //Assert

            Assert.AreEqual(expectedResult, result);
        }

        [TestCase("alex", "alex2", "any,any2", false)]
        [TestCase("alex", "any2", "alex,any2", true)]
        [TestCase("alex", "any2", "alex", true)]
        public void HasPermissions_WhenCallWithPortalSubFunctionKey_ReturnCorrectResult(string permissionKey1, string permissinKey2, string userPermissionKey, bool expectedResult)
        {
            //Arrange
            var userFunctionList = new OneAuthPermission[] { new OneAuthPermission { SubFunctionKeys = userPermissionKey.Split(',') } };
            var userAuthInfo = new UserAuthInfo { PortalFunctionList = userFunctionList, ApplicationMode = AppMode.Parasitic };

            //Action

            var result = _authorizationService.HasPermissions(userAuthInfo, permissionKey1, permissinKey2);

            //Assert

            Assert.AreEqual(expectedResult, result);
        }

        [TestCase("alex", "alex2", "any,any2", false)]
        [TestCase("alex", "any2", "alex,any2", true)]
        [TestCase("alex", "any2", "alex", true)]
        public void HasPermissions_WhenCallWithFunctionKey_ReturnCorrectResult(string permissionKey1, string permissinKey2, string userPermissionKey, bool expectedResult)
        {
            //Arrange
            var userFunctionList = userPermissionKey.Split(',').Select(x => new Function { FunctionKey = x }).ToList();
            var userAuthInfo = new UserAuthInfo { FunctionList = userFunctionList, ApplicationMode = AppMode.Self };

            //Action

            var result = _authorizationService.HasPermissions(userAuthInfo, permissionKey1, permissinKey2);

            //Assert

            Assert.AreEqual(expectedResult, result);
        }
    }
}