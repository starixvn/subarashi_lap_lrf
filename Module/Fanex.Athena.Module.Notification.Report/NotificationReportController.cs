namespace Fanex.Athena.Module.Notification.Report
{
    using Fanex.Athena.Controllers;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.ResultModel;
    using Fanex.Athena.Module.Notification.DTO;
    using Fanex.Athena.Module.Notification.MetaModel;
    using Fanex.Athena.Module.Notification.Service.Interfaces;
    using Fanex.Athena.Module.Notification.ViewModel;
    using Fanex.Athena.Service.Core.Common.Interfaces;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    using ONEbook.UM.Filters;

    using System;
    using System.Collections.Generic;
    using System.Net;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Web.Mvc;
    using System.Web.SessionState;

    [FunctionAuthorization(PermissionKeys.ResultAmendmentNotificationReport)]
    [SessionState(SessionStateBehavior.ReadOnly)]
    [CheckUMFilter]
    public class NotificationReportController : ContentBaseController
    {
        private readonly INotificationService _notificationService;

        public NotificationReportController(
            ILanguageService languageService,
            ISessionService sessionService,
             INotificationService notificationService
            )
        : base(languageService, sessionService)
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
                LicenseeName = SessionService.LicenseeSession.LicenseeName
            };

            return View("~/Views/Desktop/Module/Notification/Notification.cshtml", model);
        }

        [HttpGet]
        public ActionResult GetNotificationMessages()
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

            return Json(
                _notificationService.GetNotificationMessages(metaModel), JsonRequestBehavior.AllowGet);
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
        public ActionResult MarkNotificationAsRead(NotificationMarkAsReadMetaModel metaModel)
        {
            metaModel.UserName = SessionService.UserSession.UserName;
            metaModel.LicenseeName = SessionService.LicenseeSession.LicenseeName;

            var result = _notificationService.MarkNotificationAsRead(metaModel);

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

        private void UpdateMetaModel(NotificationMetaModel metaModel)
        {
            var userSession = SessionService.UserSession;
            metaModel.UserName = userSession.UserName;
            metaModel.LicenseeName = SessionService.LicenseeSession.LicenseeName;
            metaModel.Language = Util.MapLanguages.GetValueOrDefault(userSession.Language, "en");
        }
    }
}