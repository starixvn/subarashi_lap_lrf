// -----------------------------------------------------------------------
// <copyright file="PlatformWinLossViewModel.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Model.Report.ViewModel
{
    using MetaModel;
    using Model.Core.ViewModel;

    public class PlatformWinLossViewModel : BaseViewModel
    {
        public PlatformWinLossMetaModel Param { get; set; }

        public int Colspan { get; set; }
    }
}