namespace Fanex.Athena.Model.Report.MetaModel
{
    using System;
    using System.Linq;
    using Fanex.Athena.Model.Core.Helper;
    using Fanex.Athena.Model.Core.MetaModel;

    public class CasinoTurnoverMetaModel : IMetaModelValidation,
        IMetaModelCurrency, IMetaModelProductCodeList, IMetaModelAgent
    {
        private int[] _status;

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public int CurrencyId { get; set; }

        public string BaseCurrency { get; set; }

        public bool IsConvertAll { get; set; }
        public string ProductCodeList { get; set; }

        public string UserName { get; set; }

        public int[] Status
        {
            get
            {
                return _status;
            }

            set
            {
                _status = value ?? new int[0];
            }
        }

        public string AgentListXml { get; set; }

        public int PageSize { get; set; }

        public int PageIndex { get; set; }

        public bool IsExportExcel { get; set; }

        private bool IsValidBaseCurrency => MetaModelValidationHelper.ValidateBaseCurrency(BaseCurrency);

        public bool IsValid => FromDate <= ToDate && !string.IsNullOrEmpty(ProductCodeList) && Status.Any()
            && IsValidBaseCurrency;

        public bool IsExcludedTestData { get; set; }
    }
}