namespace Fanex.Athena.Service.Core.UnitTests.Users
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using DataAccess.Core.Users.Interfaces;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Model.Core.DTO.Common;

    using NSubstitute;

    using NUnit.Framework;

    using StatelessCore;
    using StatelessCore.Interfaces;

    using UnitTest.Common.Helpers;

    [TestFixture]
    public class AuthorizationServiceTest
    {
        private IAthorizationDataAccess _authorizationDataAccess;
        private IFunctionService _functionService;
        private IAuthorizationService _authorizationService;

        [OneTimeSetUp]
        public void SetUp()
        {
            _authorizationDataAccess = Substitute.For<IAthorizationDataAccess>();
            _functionService = Substitute.For<IFunctionService>();
            _authorizationService = new AuthorizationService(_authorizationDataAccess);
        }

        [OneTimeTearDown]
        public void TearDown()
        {
            _authorizationDataAccess = null;
            _functionService = null;
            _authorizationService = null;
        }

        [Test]
        public void HasPermissions_WhenCallWithFunctionIds_FunctionIsEmpty_ReturnFalse()
        {
            // Arrange
            var allFunctions = new List<Function>();
            var userFunctions = FakeHelper.CreateMany<Function>(10);
            var permissionKey = FakeHelper.Create<string>();

            _functionService.Functions.Returns(allFunctions);

            // Action
            var result = _authorizationService.HasPermissions(userFunctions, permissionKey);

            // Assert
            Assert.That(result, Is.False);
        }

        [Test]
        public void HasPermissions_WhenCallWithFunctionIds_PermissionKeyIsNotInAllFunctions_ReturnFalse()
        {
            // Arrange
            var allFunctions = new List<Function> { new Function { FunctionKey = "RealKey" } };
            var userFunctions = FakeHelper.CreateMany<Function>(10);
            var permissionKey = "FakeKey";

            _functionService.Functions.Returns(allFunctions);

            // Action
            var result = _authorizationService.HasPermissions(userFunctions, permissionKey);

            // Assert
            Assert.That(result, Is.False);
        }


        [Test]
        public void HasPermissions_WhenCallWithFunction_ValidFunction_ReturnTrue()
        {
            // Arrange
            var permissionKey = "Key";
            var allFunctions = new List<Function> {
                new Function {
                    FunctionKey = permissionKey, FunctionId = 4
                },
                new Function { FunctionKey = "Any", FunctionId = 5 }
            };
            _functionService.Functions.Returns(allFunctions);
            var userFunctions = allFunctions.Where(x => x.FunctionKey == permissionKey);

            // Action
            var result = _authorizationService.HasPermissions(userFunctions, permissionKey);

            // Assert
            Assert.That(result, Is.True);
        }

        [Test]
        public void HasPermissions_WhenCallWithFunctionKey_UserFunctionsDoNotHavePermision_ReturnFalse()
        {
            // Arrange
            var userFunctions = new List<Function> {
                new Function {
                    FunctionKey = "1Any", FunctionId = 4
                },
                new Function { FunctionKey = "Any", FunctionId = 5 }
            };
            var permissionKeys = new[] { "RealFunction" };

            // Action
            var result = _authorizationService.HasPermissions(userFunctions, permissionKeys);

            // Assert
            Assert.That(result, Is.False);
        }

        [Test]
        public void HasPermissions_WhenCallWithFunctionKey_UserFunctionsHavePermision_ReturnTrue()
        {
            // Arrange
            var userFunctions = new List<Function> {
                new Function {
                    FunctionKey = "1Any", FunctionId = 4
                },
                new Function { FunctionKey = "Any", FunctionId = 5 }
            };

            var permissionKeys = new[] { "RealFunction", userFunctions[0].FunctionKey };

            // Action
            var result = _authorizationService.HasPermissions(userFunctions, permissionKeys);

            // Assert
            Assert.That(result, Is.True);
        }

        [Test]
        public void HasPermissionOnData_CustIdAndTransIdAreZero_ReturnTrue()
        {
            // Arrange
            var licenseeId = Math.Abs(FakeHelper.Create<int>()) + 1;
            const int CustId = 0;
            const int TransId = 0;

            // Action
            var result = _authorizationService.HasPermissionOnData(licenseeId, CustId, TransId);

            // Assert
            Assert.That(result, Is.True);
        }

        [Test]
        public void HasPermissionOnData_AllParamsAreGreaterThanZero_ReturnFromDataAccess()
        {
            // Arrange
            var licenseeId = Math.Abs(FakeHelper.Create<int>()) + 1;
            var custId = Math.Abs(FakeHelper.Create<int>()) + 1;
            var transId = Math.Abs(FakeHelper.Create<int>()) + 1;

            // Action
            _authorizationService.HasPermissionOnData(licenseeId, custId, transId);

            // Assert
            _authorizationDataAccess.Received(1).IsCustomerBelonging(licenseeId, custId, transId);
        }
    }
}