using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using System.Web;
using System.Web.Mvc;

namespace Fanex.Athena.Controllers.Customer.PlayerSegmentation
{
    public partial class PlayerSegmentationController : CultureBaseController
    {
        private static readonly string VIP_LIST_TEMPLATE_PATH = "~/App_Data/Template/Customers/VipPlayerList.xls";

        [HttpPost]
        public JsonResult UploadVipList()
        {
            var files = Request.Files;
            if (files.Count > 0)
            {
                var upLoadedFile = files[0];
                if (IsValidFile(upLoadedFile))
                {
                    XSSFWorkbook workbook = new XSSFWorkbook(upLoadedFile.InputStream);
                    ISheet sheet = workbook.GetSheetAt(0);
                }
            }

            return Json(new { });
        }

        [HttpGet]
        public FileResult DowloadVipListTemplate()
        {
            var templatePath = Server.MapPath(VIP_LIST_TEMPLATE_PATH);
            return File(templatePath, "application/vnd.ms-excel", "VipPlayerList.xls");
        }

        private static bool IsValidFile(HttpPostedFileBase file)
        {
            return true;
        }
    }
}