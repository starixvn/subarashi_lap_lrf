namespace Fanex.Athena.Model.Customer.ViewModel
{
    using System.Collections.Generic;
    using Core.DataDomain;
    using Core.DTO.Common;

    public class PlayerSegmentationViewModel
    {
        public IEnumerable<string> TabKeys { get; set; }

        public bool HasVIPManagementPermission { get; set; }

        public bool HasVIPManagementEditPermission { get; set; }

        public bool IsHideSaba { get; set; }

        public VipPlayerViewModel VipPlayerVM { get; set; }

        public MonitoredPlayerViewModel MonitoredPlayerVM { get; set; }

        public SubsidiaryViewType ViewType { get; set; }

        public IEnumerable<CheckedItem> SubsidiaryList { get; set; }
    }
}