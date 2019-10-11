using System;
using Fanex.Athena.Model.Auth;
using Fanex.Athena.Service.StatelessCore;
using Fanex.Athena.Service.StatelessCore.Interfaces;

using LAP.ONEBook.Security;
using Newtonsoft.Json;
using NSubstitute;

using NUnit.Framework;

namespace Fanex.Athena.ServiceStatelessCore.UnitTests
{
    public class OneBookSecurityWrapperTest
    {
        private IOneBookSecurityWrapper _oneBookSecurityWrapper;
        private IStorageProvider _storageProvider;

        [SetUp]
        public void Setup()
        {
            _storageProvider = Substitute.For<IStorageProvider>();
            _oneBookSecurityWrapper = new OneBookSecurityWrapper(_storageProvider);
        }

        [TearDown]
        public void TearDown()
        {
            _storageProvider = null;
            _oneBookSecurityWrapper = null;
        }

        [TestCase(null, false)]
        [TestCase("havedata", true)]
        [TestCase("nonedata", false)]
        public void Authenticate_WithoutException_ReturnExpectedResult(string token, bool status)
        {
            //Arrange
            var expectedData = new DefaultAuthInfo<OneAuthPermission, OneAuthCurrency>();
            const string tokenHavingData = "havedata";
            _storageProvider.Authenticate(Arg.Is<string>(x => x == tokenHavingData))
                .Returns(JsonConvert.SerializeObject(expectedData));

            //Action
            var result = _oneBookSecurityWrapper.Authenticate(token);

            //Assert
            Assert.IsNotNull(status);
        }

        [Test]
        public void Authenticate_WithException_ThrowException()
        {
            //Arrange
            _storageProvider.Authenticate(Arg.Any<string>())
                .Returns("Any");

            //Action
            var result = Assert.Catch<Exception>(() => _oneBookSecurityWrapper.Authenticate("Any"));

            //Assert
            StringAssert.Contains("An error occurred when processing LAP.Token", result.Message);
        }
    }
}
