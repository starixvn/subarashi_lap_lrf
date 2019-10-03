namespace Fanex.Athena.DataAccess.Customer.UnitTests
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;

    using Core.UnitTests.TestHelpers;

    using Customer;

    using Model.Customer.MetaModel;

    using NSubstitute;

    using NUnit.Framework;

    public class DormantCustomerListDataAccessTest : BaseDataAccessHelperTest<DormantCustomerListDataAccess>
    {
        [Test]
        public async Task GetDormantCustomers_WhenCall_ParametersPassedCorrectly()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is("Lrf_DormantCustomerSel")).Returns(ObjectDb);
            var metaModel = new CustomerListMetaModel
            {
                Username = "abc",
                PageIndex = 12,
                PageSize = 2323,
                AgentListXml = "sdflskdjflksjdlfkjsdf"
            };

            // Action
            await DataAccess.GetDormantCustomers(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                ObjectDb.Received(1).SetParameterValue("username", metaModel.Username);
                ObjectDb.Received(1).SetParameterValue("PageSize", metaModel.PageSize);
                ObjectDb.Received(1).SetParameterValue("PageIndex", metaModel.PageIndex);
                ObjectDb.Received(1).SetParameterValue("AgentList", metaModel.AgentListXml);
                ObjectDb.Received(1).SetParameterValue("BaseCurrency", metaModel.BaseCurrency);
                ObjectDb.Received(1).SetParameterValue("TotalRows", null);
            });
        }

        [Test]
        public async Task GetDormantCustomers_WhenCall_ReturnCorrectData()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is("Lrf_DormantCustomerSel")).Returns(ObjectDb);
            Reader.Read().Returns(true, false);

            var expectedData = new
            {
                custid = 999,
                username = "BillDate",
                nickname = "Bill",
                Balance = 123.5m,
                ArchivedDate = new DateTime(2018, 4, 5)
            };

            MapReaderData(expectedData);

            var metaModel = new CustomerListMetaModel { BaseCurrency = "GBP" };

            // Action
            var result = await DataAccess.GetDormantCustomers(metaModel);
            var firstItem = result.DataList.First();

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(firstItem.CustId, Is.EqualTo(expectedData.custid));
                Assert.That(firstItem.SystemId, Is.EqualTo(expectedData.username));
                Assert.That(firstItem.ExternalId, Is.EqualTo(expectedData.nickname));
                Assert.That(firstItem.Balance, Is.EqualTo(expectedData.Balance));
                Assert.That(firstItem.ArchivedDate, Is.EqualTo(expectedData.ArchivedDate));
            });
        }
    }
}