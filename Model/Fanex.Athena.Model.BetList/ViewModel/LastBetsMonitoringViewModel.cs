namespace Fanex.Athena.Model.BetList.ViewModel
{
    using Fanex.Athena.Model.Customer.DTO;
    using System.Collections.Generic;
    using System.Web.Mvc;

    public class LastBetsMonitoringViewModel : BetListBaseViewModel
    {
        public IEnumerable<SelectListItem> SportsList { get; set; }

        public IEnumerable<RiskLevel> RiskLevels { get; set; }
    }
}