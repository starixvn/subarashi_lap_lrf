namespace Fanex.Athena.Model.Customer.MetaModel
{
    using System;

    public class MonitoredPlayerListMetaModel : BasePlayerListMetaModel
    {
        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public bool IsGetAll { get; set; }

        public string SelectedCurrencyCodes { get; set; }

        public string XMLReachList { get; set; }

        public override bool IsValid => base.IsValid && (IsGetAll || FromDate <= ToDate);
    }
}