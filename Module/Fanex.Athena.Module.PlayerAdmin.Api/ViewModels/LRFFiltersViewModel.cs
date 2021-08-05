using System.Collections.Generic;

namespace Fanex.Athena.Module.PlayerAdmin.Api.ViewModels
{
    public class LRFFiltersViewModel
    {
        public IEnumerable<string> CustomerClass { get; set; }

        public List<CommGroupViewModel> CommGroups { get; set; }

        public IEnumerable<SubsidiaryViewModel> Subsidiaries { get; set; }
        public byte SubsidiaryViewType { get; set; }

        public bool HasSpecialLevelWrite { get; set; }
        public bool HasOddsGroupWrite { get; set; }
    }
}
