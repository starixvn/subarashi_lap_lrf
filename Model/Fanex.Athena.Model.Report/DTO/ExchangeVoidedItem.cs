namespace Fanex.Athena.Model.Report.DTO
{
    public class ExchangeVoidedItem
    {
        public long RefNo { get; set; }

        public string EventType { get; set; }

        public string Event { get; set; }

        public string SiteId { get; set; }

        public string UserId { get; set; }
    }
}