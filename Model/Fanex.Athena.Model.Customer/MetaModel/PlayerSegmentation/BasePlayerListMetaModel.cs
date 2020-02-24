namespace Fanex.Athena.Model.Customer.MetaModel
{
    using Fanex.Athena.Model.Core.MetaModel;

    public abstract class BasePlayerListMetaModel : IMetaModelValidation, IMetaModelAgent, IMetaModelCurrencyIdList
    {
        public string UserName { get; set; }

        public string AgentListXml { get; set; }
        public bool IsExcludedTestData { get; set; }
        public string CurrencyIdList { get; set; }

        public int PageIndex { get; set; }
        public int PageSize { get; set; }

        public virtual bool IsValid => true;
    }
}