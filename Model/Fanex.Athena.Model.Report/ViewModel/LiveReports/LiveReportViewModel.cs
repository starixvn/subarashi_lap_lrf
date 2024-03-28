// -----------------------------------------------------------------------
// <copyright file="LiveReportViewModel.cs" company="">
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Model.Report.ViewModel.LiveReports
{
    using System;
    using System.Collections.Generic;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Report.DTO.LiveReports;
    using Fanex.Athena.Model.Report.MetaModel;
    using Model.Core.ViewModel;

    /// <summary>
    /// LiveReportViewModel class.
    /// </summary>
    [Serializable]
    public class LiveReportViewModel : BaseViewModel
    {
        public LiveReportMetaModel Param { get; set; }

        public IList<LiveReport> MainResult { get; set; }

        public bool IsAllowedNumberGame { get; set; }

        public DateTime BalanceUpDate { get; set; }

        public IEnumerable<CheckedItem> SubsidiaryList { get; set; }

        public bool IsFakeLicensee { get; set; }

        public bool IsOneworksMaster { get; set; }

        public byte SubsidiaryViewType { get; set; }

        public bool SubsidiarySearch { get; set; }
    }
}