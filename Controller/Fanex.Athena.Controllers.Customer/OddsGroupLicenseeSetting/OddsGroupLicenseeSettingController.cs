namespace Fanex.Athena.Controllers.Customer
{
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Customer.ViewModel;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Web.ActionFilter;
    using System.Web.Mvc;
    using System.Web.SessionState;

    [SessionState(SessionStateBehavior.ReadOnly)]
    [UMFilter]
    [FunctionAuthorization(PermissionKeys.OddsGroupLicenseeSetting)]
    public partial class OddsGroupLicenseeSettingController : CultureBaseController
    {
        private readonly ISubsidiaryService _subsidiaryService;

        private bool IsOneworksMaster =>
           SessionServiceInstance.UserSession.UserLevel == UserLevelType.Oneworks
           && SessionServiceInstance.UserSession.SubsidiaryViewType == (byte)SubsidiaryViewType.NormalManagement;

        public OddsGroupLicenseeSettingController(ISubsidiaryService subsidiaryService)
        {
            _subsidiaryService = subsidiaryService;
        }

        public ViewResult Index()
        {
            var model = BuildViewModel();
            return View("~/Views/Desktop/Customer/OddsGroupLicenseeSetting/Index.cshtml", model);
        }

        private OddsGroupLicenseeSettingViewModel BuildViewModel()
        {
            var userSession = SessionServiceInstance.UserSession;
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var subsidiaryList = _subsidiaryService.GetWhiteLabelTree(userSession, licenseeSession.LicenseeName);

            var model = new OddsGroupLicenseeSettingViewModel
            {
                CurrencyList = userSession.CurrencyList,
                OddsGroup = licenseeSession.OfferedOddsGroupsList,
                SubsidiaryViewType = IsOneworksMaster ? (byte)SubsidiaryViewType.MasterManagement : userSession.SubsidiaryViewType,
                SubsidiaryList = subsidiaryList,
                IsOneworksMaster = IsOneworksMaster,
            };

            return model;
        }
    }
}