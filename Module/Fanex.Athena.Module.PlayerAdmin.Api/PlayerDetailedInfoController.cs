using System.Web.Http;
using Fanex.Athena.Api.StatelessBase;

namespace Fanex.Athena.Module.PlayerAdmin.Api
{
    public class PlayerDetailedInfoController : ExternalApiBaseController
    {
        [HttpPost]
        public dynamic GetCustomerBettingStatus()
        {
            return Json(new
            {
                VoidRejectCancel = 20000m,
                Win = 80000m,
                Loss = 40000m,
                Turnover = 50000m,
                Margin = 2
            });
        }
    }
}