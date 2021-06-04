namespace Fanex.Athena.Module.PlayerAdmin.MetaModel.PlayerBatchUpdate
{
    public class UpdateBAStatusQuery : BasePlayerBatchUpdateQuery
    {
        public string BAStatusId { get; set; }

        public string VendorId { get; set; }
        public string LicenseeName { get; set; }

        public bool AllowBA => BAStatusId == "1";
    }
}
