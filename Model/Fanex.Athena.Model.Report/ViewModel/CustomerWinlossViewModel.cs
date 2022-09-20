namespace Fanex.Athena.Model.Report.ViewModel
{
    using System;
    using System.Collections.Generic;
    using MetaModel;
    using Model.Core.ViewModel;

    public class CustomerWinLossViewModel : BaseViewModel
    {
        public CustomerWinLossMetaModel Param { get; set; }

        public bool IgnoreSharding { get; set; }

        public bool IsHistory { get; set; }

        public bool IsFakeLicensee { get; set; }

        public DateTime MinDate { get; set; }

        public DateTime MaxDate { get; set; }

        public IEnumerable<string> OddsGroups { get; set; }

        public IEnumerable<string> CustomerClassList { get; set; }
    }
}