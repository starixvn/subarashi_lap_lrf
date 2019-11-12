namespace Fanex.Athena.Model.Report.ViewModel
{
    using System;
    using System.Collections.Generic;
    using Core.DTO.Common;
    using Core.MetaModel.Product;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Users;

    public class SubsidiaryPerformanceViewModel
    {
        public SubsidiaryPerformanceViewModel()
        {
            FromDate = DateTime.Today;
            ToDate = DateTime.Today;
        }

        public IEnumerable<GroupSubsidiary> GroupSubsidiaryList { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public IEnumerable<ProductOption> ProductOptionList { get; set; }

        public bool ConvertAll { get; set; }

        public SubsidiaryViewType ViewType { get; set; }
    }
}