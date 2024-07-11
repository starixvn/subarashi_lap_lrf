namespace Fanex.Athena.Module.Notification.Controller
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.SessionState;
    using Fanex.Athena.Controllers;
    using Fanex.Athena.Excel.Base.Helpers;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Module.Notification.DTO;
    using Fanex.Athena.Module.Notification.Excels;
    using Fanex.Athena.Module.Notification.Helper;
    using Fanex.Athena.Module.Notification.MetaModel;
    using Fanex.Athena.Module.Notification.Service.Interfaces;
    using Fanex.Athena.Module.Notification.ViewModel;
    using Fanex.Athena.Web.ActionFilter;
    using Fanex.Athena.Web.ResultExtension;

    [FunctionAuthorization(PermissionKeys.ResultAmendmentNotificationReport, PermissionKeys.Bell)]
    [SessionState(SessionStateBehavior.ReadOnly)]
    [UMFilter]
    public class NotificationReportController : CultureBaseController
    {
        private readonly INotificationManagerService _notificationManagerService;

        public NotificationReportController(INotificationManagerService notificationManagerService)
        {
            _notificationManagerService = notificationManagerService;
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
        public ActionResult GetNotificationMessages()
        {
            var metaModel = new NotificationMetaModel
            {
                IsOnlyUnread = true,
                PageIndex = 1,
                PageSize = 10
            };

            UpdateMetaModel(metaModel);
            var data = _notificationManagerService.GetNotificationMessages(metaModel);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [ValidationWebRequest]
        public ActionResult ResultAmendment(NotificationMetaModel metaModel)
        {
            UpdateMetaModel(metaModel);

            var result = _notificationManagerService.GetResultAmendment(metaModel);

            return Json(new
            {
                result.DataList,
                result.TotalRows
            });
        }

        [HttpPost]
        public ActionResult MarkNotificationAsRead(NotificationMarkAsReadMetaModel metaModel)
        {
            metaModel.UserName = SessionServiceInstance.UserSession.UserName;
            metaModel.LicenseeName = SessionServiceInstance.LicenseeSession.LicenseeName;

            var result = _notificationManagerService.MarkNotificationAsRead(metaModel);

            return Json(new
            {
                result.Code,
                result.Message,
                result.IsSuccessful
            });
        }

        [HttpPost]
        [AutoBindMetaModel(BindAgent = true)]
        public ActionResult GetAmendmentTicketListing(AmendmentTicketListingMetaModel metaModel)
        {
            var data = _notificationManagerService.GetAmendmentTicketListing(metaModel);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [AutoBindMetaModel(BindAgent = true)]
        public ActionResult ExportAmendmentTicketListing(AmendmentTicketListingMetaModel metaModel)
        {
            var data = _notificationManagerService.GetAmendmentTicketListing(metaModel);
            if (data.Data.IsPresent())
            {
                var excel = new AmendmentTicketListingExcel(data);
                excel.Export();
                var result = new ExcelResult(excel.Workbook, "TicketListing");
                return result;
            }

            return File(ExcelHelper.ExportEmptyFile(), "application/vnd.ms-excel");
        }

        [HttpPost]
        [AutoBindMetaModel(BindAgent = true)]
        public ActionResult ExportAllAmendmentTicketListing(NotificationMetaModel metaModel)
        {
            UpdateMetaModel(metaModel);

            var result = _notificationManagerService.GetResultAmendment(metaModel);
            var sessionIdList = result.DataList.Select(_ => _.SessionId);
            var amendmentTicketList = new List<AmendmentTicketListing>();

            foreach (var sessionid in sessionIdList)
            {
                var amendmentTicketMetaModel = new AmendmentTicketListingMetaModel
                {
                    SessionId = sessionid,
                    AgentListXml = metaModel.AgentListXml
                };
                var amendmentTicket = _notificationManagerService.GetAmendmentTicketListing(amendmentTicketMetaModel);
                amendmentTicketList.Add(amendmentTicket);
            }

            if (amendmentTicketList.Any())
            {
                var excel = new AmendmentTicketListingMultipleExcel(amendmentTicketList);
                excel.Export();
                return new ExcelResult(excel.Workbook, "TicketListing");
            }

            return File(ExcelHelper.ExportEmptyFile(), "application/vnd.ms-excel");
        }

        private void UpdateMetaModel(NotificationMetaModel metaModel)
        {
            var userSession = SessionServiceInstance.UserSession;
            var permissionKeys = (userSession.FunctionList ?? Enumerable.Empty<Function>()).Select(x => x.FunctionKey);
            metaModel.UserName = userSession.UserName;
            metaModel.LicenseeName = SessionServiceInstance.LicenseeSession.LicenseeName;
            metaModel.Language = Util.MapLanguages.GetValueOrDefault(userSession.Language, "en");
            metaModel.MessageTypes = NotificationHelper.GetMessageTypesByPermission(permissionKeys);
        }
    }
}