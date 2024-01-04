using System.Collections.Generic;
using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Module.LicenseeContact.Models
{
    public class GetDetailLicenseeContactMetaModel : IMetaModelSiteName
    {
        public string SiteName { get; set; }

        public int ContactId { get; set; }

        public IEnumerable<string> SubsidiaryList { get; set; }
    }
}