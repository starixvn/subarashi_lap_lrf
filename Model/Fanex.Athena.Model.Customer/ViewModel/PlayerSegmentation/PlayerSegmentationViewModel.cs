namespace Fanex.Athena.Model.Customer.ViewModel
{
    using System.Collections.Generic;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;

    public class PlayerSegmentationViewModel
    {
        public IEnumerable<string> TabKeys { get; set; }

        public bool HasVIPManagementPermission { get; set; }

        public bool HasVIPManagementEditPermission { get; set; }

        public ProblemPlayerViewModel ProblemPlayerVM { get; set; }

        public VipPlayerViewModel VipPlayerVM { get; set; }

        public MonitoredPlayerViewModel MonitoredPlayerVM { get; set; }

        public DangerLevelViewModel DangerLevelVM { get; set; }

        public SubsidiaryViewType ViewType { get; set; }

        public IEnumerable<CheckedItem> SubsidiaryList { get; set; }
    }
}