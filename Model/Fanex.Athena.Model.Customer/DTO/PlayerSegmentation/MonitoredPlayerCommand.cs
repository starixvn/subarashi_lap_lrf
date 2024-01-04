namespace Fanex.Athena.Model.Customer.DTO.PlayerSegmentation
{
    public class MonitoredPlayerCommand
    {
        public int ErrorCode { get; set; }

        public string ExternalId { get; set; }

        public string SystemId { get; set; }

        public int NumberOfError { get; set; } = 1;
    }
}