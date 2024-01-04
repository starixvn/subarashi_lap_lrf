namespace Fanex.Athena.Model.Report.ViewModel
{
    using System.Collections.Generic;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Report.MetaModel;
    using Model.Core.ViewModel;

    public class ThirdPartyWinLossViewModel : BaseViewModel
    {
        public ThirdPartyWinLossMetaModel Param { get; set; }

        public SubsidiaryViewType ViewType { get; set; } = SubsidiaryViewType.NotManagement;

        public IEnumerable<CheckedItem> SubsidiaryList { get; set; }
    }
}