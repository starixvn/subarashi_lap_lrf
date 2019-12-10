namespace Fanex.Athena.Module.Dashboard.UnitTests.Data
{
    using System.Collections;
    using System.Threading.Tasks;

    using Fanex.Athena.DataAccess.Core.UnitTests.TestHelpers;
    using Fanex.Athena.Module.Dashboard.Data.Dashboard;
    using Fanex.Athena.Module.Dashboard.MetaModel;

    using NSubstitute;

    using NUnit.Framework;

    using UnitTest.Common.Helpers;

    [TestFixture]
    public class SingleValueDataAccessTest : BaseDataAccessHelperTest<SingleValueDataAccess>
    {
        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            DataAccess.GetObjectDb(Arg.Any<string>()).Returns(ObjectDb);
        }

        [Test]
        public async Task GetPendingFunds_WhenCall_PassCorrectParam()
        {
            // Arrange
            var metaModel = new DashboardBaseModel
            {
                CurrencyId = 0,
                BaseCurrency = "EUR",
                AgentListXml = "<Root></Root>"
            };
            Hashtable passedParam = null;
            ObjectDb.When(x => x.ExecuteReaderAsync(Arg.Any<Hashtable>())).Do(x => passedParam = (Hashtable)x[0]);

            // Action
            await DataAccess.GetPendingFunds(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(passedParam.Count, Is.EqualTo(2));
                Assert.That(passedParam["BaseCurrency"], Is.EqualTo(metaModel.BaseCurrency));
            });
        }

        [Test]
        public async Task GetPendingFunds_WhenCall_ReturnCorrectData()
        {
            // Arrange
            var expected = 500M;

            Reader.Read().Returns(true, false);
            Reader["PendingFund"].Returns(expected);

            var metaModel = new DashboardBaseModel { BaseCurrency = "EUR", AgentListXml = "<Root></Root>" };

            // Action
            var result = await DataAccess.GetPendingFunds(metaModel);

            // Assert
            Assert.That(result, Is.EqualTo(expected));
        }

        [Test]
        public void GetTodayWithdrawal_WhenCall_PassCorrectParam()
        {
            // Arrange
            var metaModel = new DashboardBaseModel
            {
                BaseCurrency = "EUR",
                FromDate = new System.DateTime(2017, 1, 1),
                AgentListXml = "<Root></Root>"
            };
            Hashtable passedParam = null;
            ObjectDb.When(x => x.ExecuteReaderAsync(Arg.Any<Hashtable>())).Do(x => passedParam = (Hashtable)x[0]);

            // Action
            DataAccess.GetTodayWithdrawal(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(passedParam.Count, Is.EqualTo(3));
                Assert.That(passedParam["ReportDate"], Is.EqualTo(metaModel.FromDate));
                Assert.That(passedParam["BaseCurrency"], Is.EqualTo(metaModel.BaseCurrency));
            });
        }

        [Test]
        public async Task GetTodayWithdrawal_WhenCall_ReturnCorrectData()
        {
            // Arrange
            var expected = 600M;

            Reader.Read().Returns(true, false);
            Reader["Withdrawal"].Returns(expected);

            var metaModel = new DashboardBaseModel { BaseCurrency = "EUR", AgentListXml = "<Root></Root>" };

            // Action
            var result = await DataAccess.GetTodayWithdrawal(metaModel);

            // Assert
            Assert.That(result, Is.EqualTo(expected));
        }

        [Test]
        public async Task GetCustomerBalance_WhenCall_PassCorrectParam()
        {
            // Arrange
            var metaModel = FakeHelper.Create<DashboardBaseModel>();
            Hashtable passedParam = null;
            ObjectDb.When(x => x.ExecuteReaderAsync(Arg.Any<Hashtable>())).Do(x => passedParam = (Hashtable)x[0]);

            // Action
            await DataAccess.GetCustomerBalance(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(passedParam.Count, Is.EqualTo(3));
                Assert.That(passedParam["ReportDate"], Is.EqualTo(metaModel.FromDate));
                Assert.That(passedParam["BaseCurrency"], Is.EqualTo(metaModel.BaseCurrency));
            });
        }

        [Test]
        public async Task GetCustomerBalance_WhenCall_ReturnCorrectData()
        {
            // Arrange
            var expected = 800M;

            Reader.Read().Returns(true, false);
            Reader["ClosingBalance"].Returns(expected);

            var metaModel = new DashboardBaseModel { BaseCurrency = "EUR", AgentListXml = "<Root></Root>" };

            // Action
            var result = await DataAccess.GetCustomerBalance(metaModel);

            // Assert
            Assert.That(result, Is.EqualTo(expected));
        }

        [Test]
        public async Task GetTodayDeposit_WhenCall_PassCorrectParam()
        {
            // Arrange
            var metaModel = FakeHelper.Create<DashboardBaseModel>();
            Hashtable passedParam = null;
            ObjectDb.When(x => x.ExecuteReaderAsync(Arg.Any<Hashtable>())).Do(x => passedParam = (Hashtable)x[0]);

            // Action
            await DataAccess.GetTodayDeposit(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(passedParam.Count, Is.EqualTo(3));
                Assert.That(passedParam["ReportDate"], Is.EqualTo(metaModel.FromDate));
                Assert.That(passedParam["BaseCurrency"], Is.EqualTo(metaModel.BaseCurrency));
            });
        }

        [Test]
        public async Task GetTodayDeposit_WhenCall_ReturnCorrectData()
        {
            // Arrange
            var expected = 900M;

            Reader.Read().Returns(true, false);
            Reader["Deposit"].Returns(expected);

            var metaModel = new DashboardBaseModel { BaseCurrency = "EUR", AgentListXml = "<Root></Root>" };

            // Action
            var result = await DataAccess.GetTodayDeposit(metaModel);

            // Assert
            Assert.That(result, Is.EqualTo(expected));
        }
    }
}