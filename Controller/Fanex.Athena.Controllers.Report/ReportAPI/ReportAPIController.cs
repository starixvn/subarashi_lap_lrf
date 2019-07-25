// -----------------------------------------------------------------------
// <copyright file="ReportAPIController.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.Report
{
    using Extension.Utility;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Service.Core.Users.Interfaces;
    using Service.Report.Interfaces;

    public partial class ReportAPIController : NonCultureBaseController
    {
        private readonly IBetTypeService _betTypeService;

        private readonly ICustomerTurnoverService _customerTurnoverService;

        private readonly ITurnoverService _turnoverService;
        private ILicenseeSettingService _licenseeSettingService;
        public ReportAPIController(
            ISessionService sessionService,
            IBetTypeService betTypeService,
            ICustomerTurnoverService customerTurnoverService,
            ITurnoverService turnoverService,
            ILicenseeSettingService licenseeSettingService)
            : base(sessionService)
        {
            _betTypeService = betTypeService;
            _customerTurnoverService = customerTurnoverService;
            _turnoverService = turnoverService;
            _licenseeSettingService = licenseeSettingService;
        }

        private bool IsFakeLicensee(string siteName)
        {
            return _licenseeSettingService.IsFakeLicensee(siteName);
        }
    }
}