using Fanex.Athena.Model.Core.MetaModel;
using System.Collections.Generic;

namespace Fanex.Athena.Module.LicenseeContact.Models
{
    public class ModifyLicenseeContactMetaModel : IMetaModelSiteName, IMetaModelIp
    {
        public int SiteId { get; set; }

        public string SiteName { get; set; }

        public string UserName { get; set; }

        public byte ContactType { get; set; }

        public string ContactName { get; set; }

        public string Position { get; set; }

        public string Department { get; set; }

        public string Email { get; set; }

        public string Skype { get; set; }

        public string Remark { get; set; }

        public string Ip { get; set; }

        public IEnumerable<LicenseeContactCategory> Categories { get; set; }
    }

    public class AddLicenseeContactMetaModel : ModifyLicenseeContactMetaModel
    {
    }

    public class EditLicenseeContactMetaModel : ModifyLicenseeContactMetaModel
    {
        public int ContactId { get; set; }
    }

    public class DeleteLicenseeContactMetaModel : IMetaModelSiteName, IMetaModelIp
    {
        public int ContactId { get; set; }

        public int SiteId { get; set; }

        public string SiteName { get; set; }

        public string UserName { get; set; }

        public string Ip { get; set; }
    }
}
