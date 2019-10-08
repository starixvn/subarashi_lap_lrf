using System.Text;
using Fanex.Athena.DataAccess.Core.Common.Interfaces;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Service.StatelessCore;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.UnitTest.Common.Helpers;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.ServiceStatelessCore.UnitTests
{
    [TestFixture]
    public class BusinessLogServiceTest
    {
        private IBusinessLogBuilderFactory _logBuilderFactory;
        private IBusinessLogDataAccess _logDataAccess;

        [SetUp]
        public void SetUp()
        {
            _logBuilderFactory = Substitute.For<IBusinessLogBuilderFactory>();
            _logDataAccess = Substitute.For<IBusinessLogDataAccess>();
        }

        [TearDown]
        public void TearDown()
        {
            _logBuilderFactory = null;
            _logDataAccess = null;
        }

        [Test]
        public void Write_CanNotGetLogItem_DoNothing()
        {
            // Arrange
            var itemToBuild = new object();

            var logService = new BusinessLogService(_logBuilderFactory, _logDataAccess);

            // Action
            logService.Write(Model.Core.DataDomain.BusinessLogType.CustomerUpdateBA, itemToBuild);

            // Assert
            _logDataAccess.DidNotReceiveWithAnyArgs();
        }

        [Test]
        public void Write_GotLogItem_CallDataAccess()
        {
            // Arrange
            var itemToBuild = new StringBuilder();
            var expectedBuiltItem = FakeHelper.Create<BusinessLogItem>();
            var logBuilder = Substitute.For<IBusinessLogBuilderExtension>();
            logBuilder.Build(itemToBuild).Returns(expectedBuiltItem);
            _logBuilderFactory.GetBuilder(BusinessLogType.CustomerUpdateBA).Returns(logBuilder);

            var logService = new BusinessLogService(_logBuilderFactory, _logDataAccess);

            // Action
            logService.Write(BusinessLogType.CustomerUpdateBA, itemToBuild);

            // Assert
            _logDataAccess.Received(1).Write(expectedBuiltItem);
        }
    }
}