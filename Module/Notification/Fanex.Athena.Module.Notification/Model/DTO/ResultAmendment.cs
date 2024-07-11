namespace Fanex.Athena.Module.Notification.DTO
{
    public class ResultAmendment : NotificationMessage
    {
        public string DataFilePath { get; set; }

        public string SessionId { get; set; }

        public bool IsRead { get; set; }
    }
}