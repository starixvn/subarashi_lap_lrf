using System;
using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Model.Report.MetaModel
{
    public class ExchangeVoidedMetaModel : IMetaModelValidation, IMetaModelAgent, IMetaModelSiteName
    {
        private const int MaximumSelectedMonths = 2;

        public DateTime SelectedDate { get; set; }

        public string UserName { get; set; }

        public string RefNo { get; set; }

        public int PageIndex { get; set; }

        public string AgentListXml { get; set; }

        public string Language { get; set; }

        public string Environment { get; set; }

        public string SiteName { get; set; }

        public bool IsExcludedTestData { get; set; }

        public bool IsValid => DateTime.Compare(DateTime.Now.Date.AddMonths(-MaximumSelectedMonths), SelectedDate.Date) <= 0;
    }
}