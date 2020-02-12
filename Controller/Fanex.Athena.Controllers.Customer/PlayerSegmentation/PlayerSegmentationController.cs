using ONEbook.UM.Filters;
using System.Web.Mvc;

namespace Fanex.Athena.Controllers.Customer.PlayerSegmentation
{
    [CheckUMFilter]
    public class PlayerSegmentationController : CultureBaseController
    {
        public PlayerSegmentationController()
        {
        }

        public ViewResult Index()
        {
            return View("~/Views/Desktop/Customer/PlayerSegmentation/Main.cshtml");
        }
    }
}