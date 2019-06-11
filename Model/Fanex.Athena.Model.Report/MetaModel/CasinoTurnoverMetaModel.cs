namespace Fanex.Athena.Model.Report.MetaModel
{
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.MetaModel;
    using System;
    using System.Linq;

    public class CasinoTurnoverMetaModel : IMetaModelValidation
    {
        private string[] _productCode;

        private int[] _status;

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public int CurrencyId { get; set; }

        public string BaseCurrency { get; set; }

        public bool IsConvertAll { get; set; }

        public string[] ProductCode
        {
            get
            {
                return _productCode;
            }

            set
            {
                _productCode = value ?? new string[0];
            }
        }

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
        private bool IsValidBaseCurrency => string.IsNullOrEmpty(BaseCurrency) || SystemConstants.BaseCurrencyList
.Any(x => x.Value.Equals(BaseCurrency, StringComparison.OrdinalIgnoreCase));
        public bool IsValid => FromDate <= ToDate && ProductCode.Any() && Status.Any()
            && IsValidBaseCurrency;

    }
}