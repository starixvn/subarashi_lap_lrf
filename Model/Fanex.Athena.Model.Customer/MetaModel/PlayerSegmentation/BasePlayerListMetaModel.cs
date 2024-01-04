namespace Fanex.Athena.Model.Customer.MetaModel
{
    using Fanex.Athena.Model.Core.MetaModel;

    public class BasePlayerListMetaModel : IMetaModelValidation, IMetaModelAgent, IMetaModelCurrencyIdList,
        IMetaModelPaging, IMetaModelSubsidiarySearch
    {
        private const int DefaultPageSize = 500;
        private readonly int MaxPageSize;

        protected BasePlayerListMetaModel(int maxPageSize = 2000)
        {
            PageIndex = 1;
            PageSize = DefaultPageSize;
            OrderCol = 1;
            SortType = 1;
            MaxPageSize = maxPageSize;
        }

        public string UserName { get; set; }

        public string AgentListXml { get; set; }

        public bool IsExcludedTestData { get; set; }

        public string CurrencyIdList { get; set; }

        public int PageIndex { get; set; }

        public int PageSize { get; set; }

        public byte OrderCol { get; set; }

        public byte SortType { get; set; }

        public string SubsidiaryList { get; set; }

        public bool SubsidiarySearch { get; set; }

        public string CustomerClass { get; set; }

        public virtual bool IsValid => PageIndex > 0 && PageSize <= MaxPageSize;
    }
}