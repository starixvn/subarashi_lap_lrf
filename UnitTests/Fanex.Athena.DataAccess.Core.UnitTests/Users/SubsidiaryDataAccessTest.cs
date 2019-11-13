namespace Fanex.Athena.DataAccess.Report.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using Core.UnitTests.TestHelpers;
    using Fanex.Athena.Model.Core.DTO.Users;
    using Model.Report.DTO;

    using NSubstitute;

    using NUnit.Framework;

    using UnitTest.Common.Helpers;
    using static Dapper.SqlMapper;

    [TestFixture]
    public class SubsidiaryDataAccessTest : BaseDataAccessHelperTest<SubsidiaryDataAccess>
    {
        protected override void SetUpDataAccess()
        {
            DataAccess = Substitute.ForPartsOf<SubsidiaryDataAccess>();
        }

        [Test]
        public void GetGroupSubsidiaries_WhenCall_PassCorrectParams()
        {
            // Arrange
            const string SpName = "Portal_Sub_GetSubsidiaryList";
            DataAccess.GetObjectDb(Arg.Is(SpName)).Returns(ObjectDb);
            Reader.Read().Returns(false);
            const string LisenseeName = "12Bet";

            // Action
            DataAccess.GetGroupSubsidiaries(LisenseeName);

            // Assert
            ObjectDb.Received(1).ExecuteReader(Arg.Is<object>(x => x != null
            && ValidateInputParameterFor_GetGroupSubsidiaries(x, LisenseeName)
            ), null);
        }

        private static bool ValidateInputParameterFor_GetGroupSubsidiaries(object x, string licenseeName)
        {
            const int reportQueryMode = 0;
            var type = x.GetType();
            var siteName = type.GetProperty("SiteName").GetValue(x) as string;
            var mode = (int)type.GetProperty("ForMgm").GetValue(x);
            var status = type.GetProperty("StatusList").GetValue(x) as ICustomQueryParameter;
            return siteName.Equals(licenseeName, StringComparison.OrdinalIgnoreCase)
                && mode == reportQueryMode && status != null;
        }
        [Test]
        public void GetGroupSubsidiaries_WhenCall_ReturnCorrectData()
        {
            // Arrange
            const string SpName = "Portal_Sub_GetSubsidiaryList";
            DataAccess.GetObjectDb(Arg.Is(SpName)).Returns(ObjectDb);
            Reader.Read().Returns(true, false);

            const string LisenseeName = "12Bet";
            const int whitelabelId = 1234;
            const string operatorId = "Abc";
            const string whitelabelName = "India";

            var readerDataMapping = new Dictionary<string, object>(StringComparer.InvariantCultureIgnoreCase)
            {
                { "WhiteLabelID", whitelabelId },
                { "Name", whitelabelName },
                { "OperatorId", operatorId }
            };
            DataAccessTestHelper.MapReaderData(Reader, readerDataMapping);

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
            var result = ObjectHelper.ToJson(DataAccess.GetGroupSubsidiaries(LisenseeName));

            // Assert
            Assert.That(result, Is.EqualTo(expectedResult));
        }
        [Test]
        public void GetSubsidiaryList_WhenCall_PassCorrectParams()
        {
            // Arrange
            const string SpName = "Lrf_SubsidiarySel";
            DataAccess.GetObjectDb(Arg.Is(SpName)).Returns(ObjectDb);
            Reader.Read().Returns(false);

            const string LisenseeName = "12Bet";

            // Action
            DataAccess.GetSubsidiaryList(LisenseeName);

            // Assert
            ObjectDb.Received(1).SetParameterValue("LicenseeName", LisenseeName);
        }

        [Test]
        public void GetOperatorList_WhenCall_ReturnCorrectData()
        {
            // Arrange
            const string SpName = "Lrf_SubsidiarySel";
            DataAccess.GetObjectDb(Arg.Is(SpName)).Returns(ObjectDb);
            Reader.Read().Returns(true, false);

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
            DataAccessTestHelper.MapReaderData(Reader, readerDataMapping);

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
            var result = ObjectHelper.ToJson(DataAccess.GetSubsidiaryList(LisenseeName));

            // Assert
            Assert.That(result, Is.EqualTo(expectedResult));
        }
    }
}