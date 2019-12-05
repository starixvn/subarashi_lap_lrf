using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Service.StatelessCore;
using Fanex.Athena.ServiceStatelessCore.UnitTests.MockHelper;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.ServiceStatelessCore.UnitTests
{
    [TestFixture]
    public class ReportAPIClientTest
    {
        private const string Language = "en-US";
        private const string ApiUrl = "/api/Report/Action";
        private readonly Uri BaseAddress = new Uri("http://localhost:80");

        [Test]
        public async Task PostAsync_WhenCall_ReturnCorrectResult()
        {
            // Arrange

            // Action
           
            // Assert
               //check correct content type & stream
        }
    }
}