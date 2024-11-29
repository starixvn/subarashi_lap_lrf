namespace Fanex.Athena.Model.Customer.DTO.OddsGroupLicenseeSetting
{
    public class CustomerOddsGroupLog
    {
        public int LogId { get; set; }

        public string LogDate { get; set; }

        public string Action { get; set; }

        public string Object { get; set; }

        public string NewValue { get; set; }

        public string OldValue { get; set; }

        public string Modify { get; set; }
    }
}