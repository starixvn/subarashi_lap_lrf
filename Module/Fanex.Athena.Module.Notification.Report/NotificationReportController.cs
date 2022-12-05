namespace Fanex.Athena.Module.Notification.Report
{
    using Fanex.Athena.Controllers;
    using Fanex.Athena.Excel.Base.Helpers;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.Constants;
    using Fanex.Athena.Module.Notification.Excels;
    using Fanex.Athena.Module.Notification.MetaModel;
    using Fanex.Athena.Module.Notification.Service.Interfaces;
    using Fanex.Athena.Module.Notification.ViewModel;
    using Fanex.Athena.Web.ActionFilter;
    using Fanex.Athena.Web.ResultExtension;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using System.Web.SessionState;

    [FunctionAuthorization(PermissionKeys.Bell)]
    [SessionState(SessionStateBehavior.ReadOnly)]
    [UMFilter]
    public class NotificationReportController : CultureBaseController
    {
        private readonly INotificationService _notificationService;

        private readonly IDictionary<string, string> _notificationType = new Dictionary<string, string>
        {
            { PermissionKeys.ResultAmendmentNotificationReport , "0" },
            { PermissionKeys.ReportAbnormalBet , "1" }
        };

        public NotificationReportController(
             INotificationService notificationService
            )
        {
            _notificationService = notificationService;
        }

        [HttpGet]
        public ActionResult Index()
        {
            var model = new NotificationViewModel
            {
                FromDate = DateTimeHelper.GetFirstDateOfWeek(DateTime.Now, DayOfWeek.Sunday),
                ToDate = DateTime.Now,
                LicenseeName = SessionServiceInstance.LicenseeSession.LicenseeName
            };

            return View("~/Views/Desktop/Module/Notification/Notification.cshtml", model);
        }

        [HttpGet]
        public async Task<ActionResult> GetNotificationMessages()
        {
            var maximumMonthDistance = NotificationMetaModel.MaximumMonthRange - 1;

            var today = DateTime.Today;
            var metaModel = new NotificationMetaModel
            {
                IsOnlyUnread = true,
                FromDate = new DateTime(today.Year, today.Month, 1).AddMonths(-maximumMonthDistance),
                ToDate = today.AddDays(1).AddMilliseconds(-1),
                PageIndex = 1,
                PageSize = 10
            };

            UpdateMetaModel(metaModel);
            var data = await _notificationService.GetNotificationMessages(metaModel);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [ValidationWebRequest]
        public ActionResult ResultAmendment(NotificationMetaModel metaModel)
        {
            UpdateMetaModel(metaModel);

            var result = _notificationService.GetResultAmendment(metaModel);

            return Json(new
            {
                result.DataList,
                result.TotalRows
            });
        }

        [HttpPost]
        public async Task<ActionResult> MarkNotificationAsRead(NotificationMarkAsReadMetaModel metaModel)
        {
            metaModel.UserName = SessionServiceInstance.UserSession.UserName;
            metaModel.LicenseeName = SessionServiceInstance.LicenseeSession.LicenseeName;
            metaModel.SystemId = SystemId.LRF;

            var result = await _notificationService.MarkNotificationAsRead(metaModel);

            return Json(new
            {
                result.Code,
                result.Message,
                result.IsSuccessful
            });
        }

        [HttpPost]
        public ActionResult DownLoadFileAttachment(NotificationAttachmentMetaModel metaModel)
        {
            var data = _notificationService.GetFileAttachmentData(metaModel);

            if (data.Code == 0)
            {
                return File(Convert.FromBase64String(data.ExtendedData), "application/octet-stream");
            }

            return new HttpStatusCodeResult(HttpStatusCode.NoContent);
        }

        [HttpPost]
        [AutoBindMetaModel(BindAgent = true)]
        public async Task<ActionResult> GetAmendmentTicketListing(AmendmentTicketListingMetaModel metaModel)
        {
            var data = await _notificationService.GetAmendmentTicketListing(metaModel);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [AutoBindMetaModel(BindAgent = true)]
        public async Task<ActionResult> ExportAmendmentTicketListing(AmendmentTicketListingMetaModel metaModel)
        {
            var data = await _notificationService.GetAmendmentTicketListing(metaModel);
            if (data.Data.IsPresent())
            {
                var excel = new AmendmentTicketListingExcel(data);
                excel.Export();
                var result = new ExcelResult(excel.Workbook, "TicketListing");
                return result;
            }

            return File(ExcelHelper.ExportEmptyFile(), "application/vnd.ms-excel");
        }

        private void UpdateMetaModel(NotificationMetaModel metaModel)
        {
            var userSession = SessionServiceInstance.UserSession;
            metaModel.UserName = userSession.UserName;
            metaModel.LicenseeName = SessionServiceInstance.LicenseeSession.LicenseeName;
            metaModel.Language = Util.MapLanguages.GetValueOrDefault(userSession.Language, "en");
            metaModel.MessageTypes = GetMessageTypesByPermission(userSession);
            metaModel.SystemId = SystemId.LRF;
        }

        private string GetMessageTypesByPermission(UserAuthInfo userSession)
        {
            var messageTypes = userSession.FunctionList
                .Where(x => _notificationType.ContainsKey(x.FunctionKey))
                .Select(x => _notificationType[x.FunctionKey]);

            return string.Join(",", messageTypes);
        }
    }
}