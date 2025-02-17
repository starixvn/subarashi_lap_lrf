namespace Fanex.Athena.Module.Notification.MetaModel
{
    using System;

    public class MatchInfoMetaModel
    {
        public int MatchId { get; set; }

        public DateTime EventDate { get; set; }

        public bool IsValid => MatchId != 0 && EventDate != DateTime.MinValue;
    }
}