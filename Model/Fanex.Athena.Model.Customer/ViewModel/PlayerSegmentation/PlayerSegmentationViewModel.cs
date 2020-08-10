namespace Fanex.Athena.Model.Customer.ViewModel
{
    using Fanex.Athena.Model.Core.DTO.Common;
    using System.Collections.Generic;

    public class PlayerSegmentationViewModel
    {
        public IEnumerable<string> TabKeys { get; set; }
        public bool HasVIPManagementPermission { get; set; }
        public ProblemPlayerViewModel ProblemPlayerVM { get; set; }
        public VipPlayerViewModel VipPlayerVM { get; set; }
        public string BaseCurrency { get; set; }
        public byte ViewType { get; set; }
        public IEnumerable<CheckedItem> SubsidiaryList { get; set; }
    }
}