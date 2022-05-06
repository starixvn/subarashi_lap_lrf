using Fanex.Athena.Controllers;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.Auth.Enum;
using Fanex.Athena.Module.LicenseeContact.Models;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.Web.ActionFilter;
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

        public LicenseeContactController(IOicApiClient oicApiClient)
        {
            _oicApiClient = oicApiClient;
        }

        [HttpGet]
        public ViewResult Index()
            => View("~/Views/Desktop/Module/LicenseeContact/Index.cshtml");

        [HttpGet]
        [AutoBindMetaModel(BindSiteName = true)]
        public async Task<JsonResult> GetSuggestions(GetLicenseeContactsMetaModel metaModel)
          => JsonString(await _oicApiClient.PostStringAsync("Api/LicenseeContact/GetSuggestions", metaModel, SessionServiceInstance.UserSession.Language), JsonRequestBehavior.AllowGet);

        [HttpPost]
        [CustomValidateAntiForgery]
        [AutoBindMetaModel(BindSiteName = true, BindLanguage = true)]
        public async Task<ActionResult> GetList(GetLicenseeContactsMetaModel metaModel)
            => JsonString(await _oicApiClient.PostStringAsync("Api/LicenseeContact/GetList", metaModel, SessionServiceInstance.UserSession.Language));

        [HttpPost]
        [CustomValidateAntiForgery]
        [AutoBindMetaModel(BindSiteName = true)]
        public async Task<JsonResult> GetDetail(GetDetailLicenseeContactMetaModel metaModel)
          => JsonString(await _oicApiClient.PostStringAsync("Api/LicenseeContact/GetDetail", metaModel, SessionServiceInstance.UserSession.Language));

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
            metaModel.UserName = SessionServiceInstance.UserSession.UserName;
            metaModel.SiteId = SiteId;
            return JsonString(await _oicApiClient.PostStringAsync("Api/LicenseeContact/Add", metaModel, SessionServiceInstance.UserSession.Language));
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [AutoBindMetaModel(BindSiteName = true, BindIp = true)]
        public async Task<JsonResult> Edit(EditLicenseeContactMetaModel metaModel)
        {
            metaModel.UserName = SessionServiceInstance.UserSession.UserName;
            metaModel.SiteId = SiteId;
            return JsonString(await _oicApiClient.PostStringAsync("Api/LicenseeContact/Edit", metaModel, SessionServiceInstance.UserSession.Language));
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [AutoBindMetaModel(BindSiteName = true, BindIp = true)]
        public async Task<JsonResult> Delete(DeleteLicenseeContactMetaModel metaModel)
        {
            metaModel.UserName = SessionServiceInstance.UserSession.UserName;
            metaModel.SiteId = SiteId;
            return JsonString(await _oicApiClient.PostStringAsync("Api/LicenseeContact/Delete", metaModel, SessionServiceInstance.UserSession.Language));
        }
    }
}
