namespace Fanex.Athena.Module.LicenseeContact.Models
{
    using Fanex.Athena.Model.Core.MetaModel;
    using System.Collections.Generic;
    using System.Linq;

    public class GetLicenseeContactsMetaModel : IMetaModelSiteName, IMetaModelLanguage
    {
        public string SiteName { get; set; }

        public string ContactName { get; set; }

        public string Language { get; set; }

        public IEnumerable<string> SubsidiaryList { get; set; }
    }
}
