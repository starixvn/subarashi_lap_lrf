namespace Fanex.Athena.Model.Report.ViewModel
{
    using System;
    using System.Collections.Generic;
    using Core.DTO.Common;
    using Core.MetaModel.Product;

    public class SubsidiaryPerformanceViewModel
    {
        public SubsidiaryPerformanceViewModel()
        {
            FromDate = DateTime.Today;
            ToDate = DateTime.Today;
        }

        public IEnumerable<CheckedItem> GroupSubsidiaryList { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public IEnumerable<ProductOption> ProductOptionList { get; set; }

        public bool ConvertAll { get; set; }

        public byte ViewType { get; set; }
    }
}