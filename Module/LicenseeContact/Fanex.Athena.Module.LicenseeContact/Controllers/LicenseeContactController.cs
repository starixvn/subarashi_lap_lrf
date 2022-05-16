using Fanex.Athena.Controllers;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.Auth.Enum;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Module.LicenseeContact.Models;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.Web.ActionFilter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web.SessionState;

namespace Fanex.Athena.Module.LicenseeContact.Controllers
{
    [FunctionAuthorization(PermissionKeys.LicenseeContacts)]
    [AuthorizeRestriction(AppMode.Parasitic)]
    [SessionState(SessionStateBehavior.ReadOnly)]
    [UMFilter]
    public class LicenseeContactController : CultureBaseController
    {
        private const int SiteId = -1; //from LAP

        private readonly IOicApiClient _oicApiClient;
        private readonly ISubsidiaryService _subsidiaryService;

        public LicenseeContactController(IOicApiClient oicApiClient, ISubsidiaryService subsidiaryService)
        {
            _oicApiClient = oicApiClient;
            _subsidiaryService = subsidiaryService;
        }

        [HttpGet]
        public ViewResult Index()
        {
            var subsidiaryList = _subsidiaryService.GetWhiteLabelTree(SessionServiceInstance.UserSession, SessionServiceInstance.LicenseeSession.LicenseeName);
            ViewBag.SubsidiaryList = subsidiaryList;
            ViewBag.SubsidiaryViewType = SessionServiceInstance.UserSession.SubsidiaryViewType;

            return View("~/Views/Desktop/Module/LicenseeContact/Index.cshtml");
        }

        [HttpGet]
        [AutoBindMetaModel(BindSiteName = true)]
        public async Task<JsonResult> GetSuggestions(GetLicenseeContactsMetaModel metaModel)
        {
            metaModel.SubsidiaryList = GetAllowedSubsidiaryList();
            return JsonString(await _oicApiClient.PostStringAsync("Api/LicenseeContact/GetSuggestions", metaModel, SessionServiceInstance.UserSession.Language), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [AutoBindMetaModel(BindSiteName = true, BindLanguage = true)]
        public async Task<ActionResult> GetList(GetLicenseeContactsMetaModel metaModel)
        {
            metaModel.SubsidiaryList = EnsureAllowedSubsidiaryList(metaModel.SubsidiaryList);
            return JsonString(await _oicApiClient.PostStringAsync("Api/LicenseeContact/GetList", metaModel, SessionServiceInstance.UserSession.Language));
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [AutoBindMetaModel(BindSiteName = true)]
        public async Task<JsonResult> GetDetail(GetDetailLicenseeContactMetaModel metaModel)
        {
            metaModel.SubsidiaryList = EnsureAllowedSubsidiaryList(metaModel.SubsidiaryList);
            return JsonString(await _oicApiClient.PostStringAsync("Api/LicenseeContact/GetDetail", metaModel, SessionServiceInstance.UserSession.Language));
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [AutoBindMetaModel(BindSiteName = true)]
        public async Task<JsonResult> GetCategories(GetLicenseeContactCategoriesMetaModel metaModel)
            => JsonString(await _oicApiClient.PostStringAsync("Api/LicenseeContact/GetCategories", metaModel, SessionServiceInstance.UserSession.Language));

        [HttpPost]
        [CustomValidateAntiForgery]
        [AutoBindMetaModel(BindSiteName = true, BindIp = true)]
        public async Task<JsonResult> Add(AddLicenseeContactMetaModel metaModel)
        {
            if(SessionServiceInstance.UserSession.UserLevel == UserLevelType.Subsidiary)
            {
                metaModel.Subsidiary = SessionServiceInstance.UserSession.OperatorId;
            }
            BindModificationMetaModel(metaModel);
            return JsonString(await _oicApiClient.PostStringAsync("Api/LicenseeContact/Add", metaModel, SessionServiceInstance.UserSession.Language));
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [AutoBindMetaModel(BindSiteName = true, BindIp = true)]
        public async Task<JsonResult> Edit(EditLicenseeContactMetaModel metaModel)
        {
            BindModificationMetaModel(metaModel);
            return JsonString(await _oicApiClient.PostStringAsync("Api/LicenseeContact/Edit", metaModel, SessionServiceInstance.UserSession.Language));
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [AutoBindMetaModel(BindSiteName = true, BindIp = true)]
        public async Task<JsonResult> Delete(DeleteLicenseeContactMetaModel metaModel)
        {
            BindModificationMetaModel(metaModel);
            return JsonString(await _oicApiClient.PostStringAsync("Api/LicenseeContact/Delete", metaModel, SessionServiceInstance.UserSession.Language));
        }

        private void BindModificationMetaModel(BaseModificationLicenseeContactMetaModel metaModel)
        {
            metaModel.UserName = SessionServiceInstance.UserSession.UserName;
            metaModel.SiteId = SiteId;
            metaModel.SubsidiaryList = GetAllowedSubsidiaryList();
        }

        private IEnumerable<string> GetAllowedSubsidiaryList()
        {
            var userSession = SessionServiceInstance.UserSession;
            var licenseeName = SessionServiceInstance.LicenseeSession.LicenseeName;
            var allowedSubsidiaryList = _subsidiaryService.GetWhiteLabelTree(userSession, licenseeName)
                    .SelectMany(_ => _.Children.Select(__ => __.Name));
            if (userSession.SubsidiaryViewType != (byte)SubsidiaryViewType.NormalManagement && userSession.UserLevel != UserLevelType.Subsidiary)
            {
                allowedSubsidiaryList = allowedSubsidiaryList.Concat(new[] { licenseeName });
            }
            return allowedSubsidiaryList;
        }

        private IEnumerable<string> EnsureAllowedSubsidiaryList(IEnumerable<string> subsidiaryList)
        {
            var allowedSubsidiaryList = GetAllowedSubsidiaryList();
            if (subsidiaryList != null && subsidiaryList.Any())
            {
                allowedSubsidiaryList = subsidiaryList.Where(sub => allowedSubsidiaryList.Any(allowedSub => string.Equals(allowedSub, sub, StringComparison.InvariantCultureIgnoreCase)));
            }
            return allowedSubsidiaryList;
        }
    }
}
