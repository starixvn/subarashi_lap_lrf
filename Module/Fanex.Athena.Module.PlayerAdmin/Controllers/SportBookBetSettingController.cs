namespace Fanex.Athena.Module.PlayerAdmin.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using System.Web.SessionState;
    using Fanex.Athena.Controllers;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Module.PlayerAdmin.DTO;
    using Fanex.Athena.Module.PlayerAdmin.Repository.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.ViewModels;
    using Fanex.Athena.Service.Core.Common.Interfaces;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;
    using ONEbook.UM.Filters;

    [SessionState(SessionStateBehavior.ReadOnly)]
    [CheckUMFilter]
    //[AuthorizeRestriction(AppMode.Parasitic)]
    //[FunctionAuthorization(PermissionKeys.PlayerAdmin)]
    [CustomValidateAntiForgery]
    public class SportBookBetSettingController : CultureBaseController
    {
        private readonly ISportBookBetSettingRepository _betSettingRepository;

        private readonly IDcsBetSettingRepository _dcsBetSettingRepository;

        private readonly IAuthorizationService _authorizationService;

        public SportBookBetSettingController(
            ILanguageService languageService,
            ISessionService sessionService,
            IAppSettings appSettings,
            ISportBookBetSettingRepository betSettingRepository,
            IDcsBetSettingRepository dcsBetSettingRepository,
            IAuthorizationService authorizationService)
            : base(languageService, sessionService, appSettings, null)
        {
            _betSettingRepository = betSettingRepository;
            _dcsBetSettingRepository = dcsBetSettingRepository;
            _authorizationService = authorizationService;
        }

        [HttpPost]
        [AjaxRequest]
        [ValidatePermissionOnData]
        public async Task<JsonResult> GetSetting(int custId)
        {
            var userSession = SessionService.UserSession;
            var eSportSetting = await _dcsBetSettingRepository.GetSettingAsync(custId, ProductTypes.Sportsbooks2).ConfigureAwait(false);

            if (!eSportSetting.Any())
            {
                throw new InvalidOperationException("There is no E-sport setting data.");
            }

            var getSBSettingTask = await _betSettingRepository.GetSettingAsync(custId, AppSettings.IsShowMixedSport).ConfigureAwait(false);

            var viewModel = new PlayerBetSettingViewModel<PlayerBetSetting>
            {
                Data = getSBSettingTask.Concat(eSportSetting),
                Editable = true
            };

            return Json(viewModel);
        }
    }
}