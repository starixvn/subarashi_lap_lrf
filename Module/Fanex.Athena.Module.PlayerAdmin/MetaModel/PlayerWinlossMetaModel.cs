using System;
using System.Collections.Generic;
using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Model.Core.MetaModel.Product;

namespace Fanex.Athena.Module.PlayerAdmin.MetaModel
{
    public class PlayerWinLossMetaModel : IMetaModelAgent, IMetaModelValidation
    {
        private const int MinimumPageSize = 50;

        private string _userName;

        public string Username
        {
            get
            {
                return _userName;
            }

            set
            {
                _userName = value?.Trim();
            }
        }

        public int PageSize { get; set; } = MinimumPageSize;

        public int PageIndex { get; set; } = 1;

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public IEnumerable<ProductOption> ProductOptions { get; set; }

        public string AgentListXml { get; set; }

        public bool IsExportExcel { get; set; }

        public bool IsAllowBA { get; set; }

        public bool IsAllowedCustomerComm { get; set; }

        public bool SystemIdVisible { get; set; }

        public string ExcelTitle { get; set; }

        public bool IsValid => !string.IsNullOrEmpty(Username);

        public bool IsExcludedTestData { get; set; }
    }
}