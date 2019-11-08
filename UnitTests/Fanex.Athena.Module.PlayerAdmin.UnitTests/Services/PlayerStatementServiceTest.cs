namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Services
{
    using System;
    using System.Net;
    using System.Net.Http;
    using System.Text;
    using System.Threading.Tasks;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
    using Fanex.Athena.Service.StatelessCore.CustomException;
    using Fanex.Athena.Module.PlayerAdmin.Services;
    using Fanex.Athena.UnitTest.Common.Helpers;
    using NSubstitute;
    using NUnit.Framework;
    using NSubstitute.ExceptionExtensions;

    public class PlayerStatementServiceTest
    {
        private const string ApiHost = "ExtAPIHostUrl";

        private const string User = "ExtAPIUser";

        private const string Password = "ExtAPIPassword";

        private const string FormatDate = "MM-dd-yyyy";

        private IAppSettings _appSetting;

        private HttpMessageHandler _messageHandler;

        private HttpClient _client;

        private PlayerStatementService _service;

        [OneTimeSetUp]
        public void SetUp()
        {
            _appSetting = Substitute.For<IAppSettings>();
            _messageHandler = Substitute.For<HttpMessageHandler>();
            _client = new HttpClient(_messageHandler);
            _service = new PlayerStatementService(_appSetting, _client);
        }

        [OneTimeTearDown]
        public void TearDown()
        {
            _service = null;
        }
    }
}
