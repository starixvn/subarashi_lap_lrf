namespace Fanex.Athena.Module.Notification.DTO
{
    using System;

    public class ResultAmendment : Notification
    {
        public string DataFilePath { get; set; }
        public string SessionId { get; set; }
    }
}