namespace Fanex.Athena.Model.BetList.ViewModel
{
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Fanex.Athena.Model.Customer.DTO;

    public class LastBetsMonitoringViewModel : BetListBaseViewModel
    {
        public IEnumerable<SelectListItem> SportsList { get; set; }

        public IEnumerable<RiskLevel> RiskLevels { get; set; }

        public IDictionary<int, string> PlatformList { get; set; }
    }
}