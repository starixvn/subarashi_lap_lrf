using System.Collections.Generic;
using System.Threading.Tasks;
using Fanex.Athena.DataAccess.Report.Interfaces;
using Fanex.Athena.Model.Report.DTO;
using Fanex.Athena.Model.Report.MetaModel;
using Fanex.Athena.Model.Report.ViewModel;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.UnitTest.Common.Helpers;
using Newtonsoft.Json;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Service.Report.UnitTests
{
    [TestFixture]
    public class ExchangeVoidedServiceTest
    {
        private ILGAPIClient _lgAPIClient;

        private IExchangeVoidedDataAccess _dataAccess;

        [SetUp]
        public void SetUp()
        {
            _lgAPIClient = Substitute.For<ILGAPIClient>();
            _dataAccess = Substitute.For<IExchangeVoidedDataAccess>();
        }

        [TearDown]
        public void TearDown()
        {
            _lgAPIClient = null;
            _dataAccess = null;
        }

        [Test]
        public async Task GetData_UserNameHasValueButCanNotGetCustId_ReturnEmptyResult()
        {
            // Arrange
            var metaModel = FakeHelper.Create<ExchangeVoidedMetaModel>();
            var expectedResult = new ExchangeVoidedViewModel { DataList = new List<ExchangeVoidedItem>(), TotalPage = 0 };

            const int ExpectedCustId = 0;

            _dataAccess.GetCustIdAsync(metaModel.UserName, metaModel.AgentListXml)
                    .Returns(Task.FromResult(ExpectedCustId));
            var service = new ExchangeVoidedService(_lgAPIClient, _dataAccess);

            // Action
            var result = await service.GetData(metaModel);

            // Assert
            Assert.That(result.DataList.Count, Is.Zero);
            Assert.That(result.TotalPage, Is.Zero);
            await _lgAPIClient.DidNotReceiveWithAnyArgs().PostAsync<ExchangeVoidedViewModel>(default, default, default);
        }

        [Test]
        public async Task GetData_UserNameHasValueAndGetCorrectCustId_CallClientApiWithCorrectParameter()
        {
            // Arrange
            var metaModel = FakeHelper.Create<ExchangeVoidedMetaModel>();
            const int ExpectedCustId = 1;
            var apiMetaModel = new
            {
                CustId = ExpectedCustId,
                metaModel.SelectedDate,
                metaModel.PageIndex,
                metaModel.Environment,
                metaModel.RefNo,
                metaModel.SiteName
            };
            var expectedResult = JsonConvert.SerializeObject(apiMetaModel);

            object passedParam = null;

            _dataAccess.GetCustIdAsync(metaModel.UserName, metaModel.AgentListXml)
                .Returns(Task.FromResult(ExpectedCustId));

            const string apiPath = "/ExchangeBetHistory/Index";
            _lgAPIClient.PostAsync<ExchangeVoidedViewModel>(apiPath, Arg.Any<object>(), metaModel.Language)
                .Returns(x =>
                {
                    passedParam = x.ArgAt<object>(1);

                    return new ExchangeVoidedViewModel();
                });

            var service = new ExchangeVoidedService(_lgAPIClient, _dataAccess);

            // Action
            await service.GetData(metaModel);
            var jsonPassedParam = JsonConvert.SerializeObject(passedParam);

            // Assert
            Assert.That(jsonPassedParam, Is.EqualTo(expectedResult));
        }

        [Test]
        public async Task GetData_UserNameIsEmpty_DoNotGetCustIdAndCallClientApiWithCorrectParameter()
        {
            // Arrange
            var metaModel = FakeHelper.Create<ExchangeVoidedMetaModel>();
            metaModel.UserName = null;
            var apiMetaModel = new
            {
                CustId = 0,
                metaModel.SelectedDate,
                metaModel.PageIndex,
                metaModel.Environment,
                metaModel.RefNo,
                metaModel.SiteName
            };
            var expectedResult = JsonConvert.SerializeObject(apiMetaModel);

            const string apiPath = "/ExchangeBetHistory/Index";
            object passedParam = null;
            _lgAPIClient.PostAsync<ExchangeVoidedViewModel>(apiPath, Arg.Any<object>(), metaModel.Language)
                .Returns(x =>
                {
                    passedParam = x.ArgAt<object>(1);

                    return new ExchangeVoidedViewModel();
                });

            var service = new ExchangeVoidedService(_lgAPIClient, _dataAccess);

            // Action
            await service.GetData(metaModel);
            var jsonPassedParam = JsonConvert.SerializeObject(passedParam);

            // Assert
            Assert.That(jsonPassedParam, Is.EqualTo(expectedResult));
            await _dataAccess.DidNotReceiveWithAnyArgs().GetCustIdAsync(default, default);
        }
    }
}