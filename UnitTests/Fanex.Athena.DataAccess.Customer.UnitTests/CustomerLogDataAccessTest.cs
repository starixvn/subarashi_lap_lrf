namespace Fanex.Athena.DataAccess.Customer.UnitTests
{
    using Core.UnitTests.TestHelpers;

    using Model.Customer.MetaModel.CustomerLog;

    using NSubstitute;

    using NUnit.Framework;

    public class CustomerLogDataAccessTest : BaseDataAccessHelperTest<CustomerLogDataAccess>
    {
        [Test]
        public void GetCustomerSettingList_WhenCall_ParametersPassedCorrectly()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is("Lrf_CustomerSettingLog_Sel")).Returns(ObjectDb);
            var metaModel = new CustomerLogMetaModel();

            // Action
            _ = DataAccess.GetCustomerSettingList(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                ObjectDb.Received(1).SetParameterValue("AgentList", metaModel.AgentListXml);
                ObjectDb.Received(1).SetParameterValue("UserName", metaModel.UserName);
                ObjectDb.Received(1).SetParameterValue("FromDate", metaModel.FromDate);
                ObjectDb.Received(1).SetParameterValue("ToDate", metaModel.ToDate);
                ObjectDb.Received(1).SetParameterValue("FilterBy", metaModel.ViewById);
                ObjectDb.Received(1).SetParameterValue("LicenseeId", metaModel.LicenseeId);
                ObjectDb.Received(1).SetParameterValue("siteName", metaModel.SiteName);
            });
        }

        [Test]
        public void GetGroupCommList_WhenCall_ParametersPassedCorrectly()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is("Lrf_GroupCommLog_Sel"), 900).Returns(ObjectDb);
            var metaModel = new CustomerLogMetaModel();

            // Action
            _ = DataAccess.GetGroupCommList(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                ObjectDb.Received(1).SetParameterValue("FromDate", metaModel.FromDate);
                ObjectDb.Received(1).SetParameterValue("ToDate", metaModel.ToDate);
                ObjectDb.Received(1).SetParameterValue("LicenseeId", metaModel.LicenseeId);
                ObjectDb.Received(1).SetParameterValue("siteName", metaModel.SiteName);
            });
        }
    }
}