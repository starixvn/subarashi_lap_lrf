namespace Fanex.Athena.Module.Notification.DTO
{
    using System.Collections.Generic;

    public class AmendmentTicketListing
    {
        public string MatchInfo { get; set; }

        public IList<AmendmentTicket> Data { get; set; }

        public static AmendmentTicketListing Empty()
            => new AmendmentTicketListing { Data = new List<AmendmentTicket>() };
    }

    public class AmendmentTicket
    {
        public int Index { get; set; }

        public string RefNo { get; set; }

        public string ExternalId { get; set; }

        public string SystemId { get; set; }
    }
}