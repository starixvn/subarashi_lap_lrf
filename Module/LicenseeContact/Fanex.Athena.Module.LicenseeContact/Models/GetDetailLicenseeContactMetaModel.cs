using Fanex.Athena.Model.Core.MetaModel;
using System.Collections.Generic;

namespace Fanex.Athena.Module.LicenseeContact.Models
{
    public class GetDetailLicenseeContactMetaModel : IMetaModelSiteName
    {
        public string SiteName { get; set; }

        public int ContactId { get; set; }

        public IEnumerable<string> SubsidiaryList { get; set; }
    }
}
