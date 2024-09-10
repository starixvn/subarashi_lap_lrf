using Fanex.Athena.Model.Core.MetaModel;


namespace Fanex.Athena.Model.BetList.MetaModel
{
    public class ExchangeRunningTicketMetaModel : IMetaModelAgent, IMetaModelCurrencyIdList
    {
        public string AgentListXml { get; set; }

        public string Username { get; set; } = string.Empty;

        public string BaseCurrency { get; set; }

        public string CurrencyIdList { get; set; }

        public bool IsConvertAllToBaseCurrency { get; set; }

        public int PageSize { get; set; }

        public int PageIndex { get; set; }

        public int SortBy { get; set; } 

        public byte SortOrder { get; set; }

        public bool IsExcludedTestData { get; set; }
    }
}
