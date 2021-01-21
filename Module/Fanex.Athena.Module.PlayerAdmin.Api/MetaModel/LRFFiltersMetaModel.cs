using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Module.PlayerAdmin.Api.MetaModel
{
    public class LRFFiltersMetaModel : ILicenseeInfoMetaModel
    {
        public string SiteName { get; set; }

        public int LicenseeId { get; set; }

        public bool HasCommPermissionRead { get; set; }
    }
}
