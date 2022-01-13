namespace Fanex.Athena.Model.Report.MetaModel
{
    public class ExtraPayoutDetailMetaModel : ExtraPayoutMetaModel
    {
        public int CustId { get; set; }

        public string ExternalId { get; set; }

        public string SystemId { get; set; }
    }
}