namespace Fanex.Athena.Model.Customer.ViewModel
{
    public abstract class PlayerViewModel
    {
        public string ExternalId { get; set; }
        public string SystemId { get; set; }
        public bool IsVIP { get; set; }
    }
}