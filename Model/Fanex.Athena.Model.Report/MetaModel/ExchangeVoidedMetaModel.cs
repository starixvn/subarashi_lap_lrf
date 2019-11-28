using System;
using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Model.Report.MetaModel
{
    public class ExchangeVoidedMetaModel : IMetaModelValidation, IMetaModelAgent
    {
        public DateTime SelectedDate { get; set; }

        public string UserName { get; set; }

        public int RefNo { get; set; }

        public int PageIndex { get; set; }

        public string AgentListXml { get; set; }

        public bool IsExcludedTestData { get; set; }

        public bool IsValid => DateTime.Compare(DateTime.Now.Date.AddMonths(-2), SelectedDate.Date) <= 0;
    }
}