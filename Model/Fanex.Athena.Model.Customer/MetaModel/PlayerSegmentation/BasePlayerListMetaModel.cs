namespace Fanex.Athena.Model.Customer.MetaModel
{
    using Fanex.Athena.Model.Core.MetaModel;

    public abstract class BasePlayerListMetaModel : IMetaModelValidation, IMetaModelAgent, IMetaModelCurrencyIdList, IMetaModelPaging
    {
        protected BasePlayerListMetaModel()
        {
            PageIndex = 1;
            PageSize = 500;
        }

        public string UserName { get; set; }

        public string AgentListXml { get; set; }
        public bool IsExcludedTestData { get; set; }
        public string CurrencyIdList { get; set; }

        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public byte OrderCol { get; set; }
        public byte SortType { get; set; }

        public virtual bool IsValid => true;
    }
}