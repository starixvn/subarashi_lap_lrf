using System.Collections;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Criteria
{
    public class GetSubsidaryCriteria
    {
        public string LicenseeName { get; set; }

        public string GetSpName() => "Lrf_SubsidiarySel";

        public Hashtable GetSpParams()
        {
            var result = new Hashtable
            {
                ["LicenseeName"] = LicenseeName
            };

            return result;
        }
    }
}
