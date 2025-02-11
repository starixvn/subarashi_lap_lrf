namespace Fanex.Athena.Module.Notification.DTO
{
    using System;

    public class MatchInfo
    {
        public int MatchId { get; set; }

        public DateTime EventDate { get; set; }

        public bool IsNeutral { get; set; }

        public string MatchCode { get; set; }

        public int SportType { get; set; }

        public int ProductId { get; set; }

        public int AwayId { get; set; }

        public int HomeId { get; set; }
    }
}