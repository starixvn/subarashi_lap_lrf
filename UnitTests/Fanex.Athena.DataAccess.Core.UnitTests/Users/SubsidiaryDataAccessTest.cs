namespace Fanex.Athena.DataAccess.Report.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using Fanex.Athena.Extension.Utility.Interfaces;
    using Fanex.Athena.Model.Core.DTO.Users;
    using Fanex.Data;
    using Model.Report.DTO;

    using NSubstitute;

    using NUnit.Framework;

    using UnitTest.Common.Helpers;

    [TestFixture]
    public class SubsidiaryDataAccessTest
    {
        private IDbFactory _dbFactory;

        protected IObjectDb _objectDb { get; set; }

        private SubsidiaryDataAccess _dataAccess;

        [OneTimeSetUp]
        public void FixtureSetUp()
        {
            _dbFactory = Substitute.For<IDbFactory>();
            _objectDb = Substitute.For<IObjectDb>();
            _dataAccess = new SubsidiaryDataAccess(_dbFactory);
        }

        [OneTimeTearDown]
        public void FixtureTearDown()
        {
            _dbFactory = null;
            _objectDb = null;
            _dataAccess = null;
        }

        [SetUp]
        public void SetUp()
        {
            _objectDb.ClearReceivedCalls();
        }

        [Test]
        public void GetGroupSubsidiaries_WhenCall_PassCorrectParams()
        {
            // Arrange
            const string SpName = "Portal_Sub_GetSubsidiaryList";
            const string LisenseeName = "12Bet";

            var reader = Substitute.For<IDataReader>();

            reader.Read().Returns(false);
            _dbFactory.GetObjectDb(Arg.Is(SpName)).Returns(_objectDb);
            _objectDb.ExecuteReader(Arg.Any<object>()).Returns(reader);

            // Action
            _dataAccess.GetGroupSubsidiaries(LisenseeName);

            // Assert
            _objectDb.Received(1).ExecuteReader(
                Arg.Is<object>(x => x != null && ValidateInputParameterFor_GetGroupSubsidiaries(x, LisenseeName)),
                null);
        }

        [Test]
        public void GetGroupSubsidiaries_WhenCall_ReturnCorrectData()
        {
            // Arrange
            const string SpName = "Portal_Sub_GetSubsidiaryList";
            const string LisenseeName = "12Bet";
            const int whitelabelId = 1234;
            const string operatorId = "Abc";
            const string whitelabelName = "India";

            var reader = Substitute.For<IDataReader>();

            _dbFactory.GetObjectDb(Arg.Is(SpName)).Returns(_objectDb);
            _objectDb.ExecuteReader(Arg.Any<object>()).Returns(reader);
            reader.Read().Returns(true, false);

            var readerDataMapping = new Dictionary<string, object>(StringComparer.InvariantCultureIgnoreCase)
            {
                { "WhiteLabelID", whitelabelId },
                { "Name", whitelabelName },
                { "OperatorId", operatorId }
            };
            DataAccessTestHelper.MapReaderData(reader, readerDataMapping);

            var expectedData = new List<GroupSubsidiary>
            {
                new GroupSubsidiary
                {
                    WhiteLabelID=whitelabelId,
                    OperatorId = operatorId,
                    WhiteLabelName = whitelabelName
                }
            };
            var expectedResult = ObjectHelper.ToJson(expectedData);

            // Action
            var result = ObjectHelper.ToJson(_dataAccess.GetGroupSubsidiaries(LisenseeName));

            // Assert
            Assert.That(result, Is.EqualTo(expectedResult));
        }
        [Test]
        public void GetSubsidiaryList_WhenCall_PassCorrectParams()
        {
            // Arrange
            const string SpName = "Lrf_SubsidiarySel";
            const string LisenseeName = "12Bet";

            var reader = Substitute.For<IDataReader>();

            _dbFactory.GetObjectDb(Arg.Is(SpName)).Returns(_objectDb);
            _objectDb.ExecuteReader().Returns(reader);
            reader.Read().Returns(false);

            // Action
            _dataAccess.GetSubsidiaryList(LisenseeName);

            // Assert
            _objectDb.Received(1).SetParameterValue("LicenseeName", LisenseeName);
        }

        [Test]
        public void GetOperatorList_WhenCall_ReturnCorrectData()
        {
            // Arrange
            const string SpName = "Lrf_SubsidiarySel";

            var reader = Substitute.For<IDataReader>();

            _dbFactory.GetObjectDb(Arg.Is(SpName)).Returns(_objectDb);
            _objectDb.ExecuteReader().Returns(reader);
            reader.Read().Returns(true, false);

            const string LisenseeName = "12Bet";
            const int AgentId = 1234;
            const int CurrencyId = 13;
            const string OperatorName = "India";

            var readerDataMapping = new Dictionary<string, object>(StringComparer.InvariantCultureIgnoreCase)
            {
                { "AgentID", AgentId },
                { "OperatorID", OperatorName },
                { "Currency", CurrencyId }
            };
            DataAccessTestHelper.MapReaderData(reader, readerDataMapping);

            var expectedData = new List<Subsidiary>
            {
                new Subsidiary
                {
                    AgentId = AgentId,
                    OperatorId = OperatorName,
                    CurrencyId = CurrencyId
                }
            };
            var expectedResult = ObjectHelper.ToJson(expectedData);

            // Action
            var result = ObjectHelper.ToJson(_dataAccess.GetSubsidiaryList(LisenseeName));

            // Assert
            Assert.That(result, Is.EqualTo(expectedResult));
        }

        private static bool ValidateInputParameterFor_GetGroupSubsidiaries(object x, string licenseeName)
        {
            const int reportQueryMode = 0;
            var type = x.GetType();
            var siteName = type.GetProperty("SiteName").GetValue(x) as string;
            var mode = (int)type.GetProperty("ForMgm").GetValue(x);
            var status = type.GetProperty("StatusList").GetValue(x) as DataTable;
            return siteName.Equals(licenseeName, StringComparison.OrdinalIgnoreCase)
                && mode == reportQueryMode && status != null;
        }
    }
}