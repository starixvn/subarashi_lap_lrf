using System.Collections;
using System.Collections.Generic;
using Fanex.Athena.Model.Auth;
using Fanex.Athena.Service.StatelessCore.Utility;
using NUnit.Framework;

namespace Fanex.Athena.ServiceStatelessCore.UnitTests.Utility
{
    [TestFixture]
    public class AuthParameterHelperTest
    {
        [TestCaseSource(typeof(TestingData), "TestCases")]
        public string ToXml_WhenCall_ReturnCorrectString(IEnumerable<OneAuthCurrency> authCurrencyList, string selectedCurrency)
        {
            return AuthParameterHelper.GenerateAgentListXml(authCurrencyList, selectedCurrency);
        }
    }

    public class TestingData
    {
        public static IEnumerable TestCases
        {
            get
            {
                yield return new TestCaseData(null, string.Empty).Returns(string.Empty);
                yield return new TestCaseData(new List<OneAuthCurrency>(), "1,2,3").Returns(string.Empty);
                yield return new TestCaseData(CreateAuthCurrencyList(), string.Empty).Returns(CreateDefaultAgentListXml());
                yield return new TestCaseData(CreateAuthCurrencyList(), "1,2").Returns(CreateDefaultAgentListXml());
            }
        }

        private static IEnumerable<OneAuthCurrency> CreateAuthCurrencyList()
        {
            return new OneAuthCurrency[]
            {
                new OneAuthCurrency
                {
                    CurrencyId = 1,
                    Currency = "USD",
                    AgentId = new int [] { 1,2 }
                },
                new OneAuthCurrency
                {
                    CurrencyId = 2,
                    Currency = "EUR",
                    AgentId = new int [] { 8,9, }
                }
            };
        }

        private static string CreateDefaultAgentListXml()
        {
            var xml1 = "<Agent AgentId=\"1\" Currency=\"1\"/><Agent AgentId=\"2\" Currency=\"1\"/>";
            var xml2 = "<Agent AgentId=\"8\" Currency=\"2\"/><Agent AgentId=\"9\" Currency=\"2\"/>";

            return $"<ROOT>{xml1}{xml2}</ROOT>";
        }
    }
}