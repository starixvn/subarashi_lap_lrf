namespace Fanex.Athena.Module.Notification.Report
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using System.Web.SessionState;
    using Fanex.Athena.Controllers;
    using Fanex.Athena.Excel.Base.Helpers;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Module.Notification.Excels;
    using Fanex.Athena.Module.Notification.MetaModel;
    using Fanex.Athena.Module.Notification.Service.Interfaces;
    using Fanex.Athena.Module.Notification.ViewModel;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Web.ActionFilter;
    using Fanex.Athena.Web.ResultExtension;

    [FunctionAuthorization(PermissionKeys.ResultAmendmentNotificationReport, PermissionKeys.Bell)]
    [SessionState(SessionStateBehavior.ReadOnly)]
    [UMFilter]
    public class NotificationReportController : CultureBaseController
    {
        private readonly INotificationService _notificationService;

        private readonly IDictionary<string, int> _notificationType = new Dictionary<string, int>
        {
            { PermissionKeys.ResultAmendmentNotificationReport , 1 },
            { PermissionKeys.ReportAbnormalBet , 2 }
        };

        private readonly string ResettlementMessageType = "Amendment";

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
                FromDate = DateTimeHelper.GetFirstDateOfWeek(DateTimeHelper.Now, DayOfWeek.Sunday),
                ToDate = DateTimeHelper.Now,
                LicenseeName = SessionServiceInstance.LicenseeSession.LicenseeName
            };

            return View("~/Views/Desktop/Module/Notification/Notification.cshtml", model);
        }

        [HttpGet]
        public async Task<ActionResult> GetNotificationMessages()
        {
            var metaModel = new NotificationMetaModel
            {
                IsOnlyUnread = true,
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
            if (metaModel.MessageType != ResettlementMessageType)
            {
                return Json(new
                {
                    Code = 0,
                    Message = ViewResources.MessageSuccess,
                    IsSuccessful = true
                });
            }

            metaModel.UserName = SessionServiceInstance.UserSession.UserName;
            metaModel.LicenseeName = SessionServiceInstance.LicenseeSession.LicenseeName;

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
        }

        private string GetMessageTypesByPermission(UserAuthInfo userSession)
        {
            var messageTypes = (userSession.FunctionList ?? Enumerable.Empty<Function>())
                .Where(x => _notificationType.ContainsKey(x.FunctionKey))
                .Select(x => _notificationType[x.FunctionKey]);

            return string.Join(",", messageTypes);
        }
    }
}