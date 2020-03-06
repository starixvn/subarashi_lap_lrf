// -----------------------------------------------------------------------
// <copyright file="PlayerSegmentationViewModel.cs" company="">
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Model.Customer.ViewModel
{
    using System.Collections.Generic;

    public class PlayerSegmentationViewModel
    {
        public IEnumerable<string> TabKeys { get; set; }
        public bool HasVIPManagementPermission { get; set; }
        public ProblemPlayerViewModel ProblemPlayerVM { get; set; }
        public VipPlayerViewModel VipPlayerVM { get; set; }
    }
}