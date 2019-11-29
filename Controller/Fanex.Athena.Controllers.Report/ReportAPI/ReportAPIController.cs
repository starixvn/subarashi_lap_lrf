// -----------------------------------------------------------------------
// <copyright file="ReportAPIController.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.Report
{
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Service.Report.Interfaces;

    public partial class ReportAPIController : NonCultureBaseController
    {
        private readonly IBetTypeService _betTypeService;

        private readonly ICustomerTurnoverService _customerTurnoverService;

        private readonly ITurnoverService _turnoverService;
        private readonly ILicenseeSettingService _licenseeSettingService;

        public ReportAPIController(
            IBetTypeService betTypeService,
            ICustomerTurnoverService customerTurnoverService,
            ITurnoverService turnoverService,
            ILicenseeSettingService licenseeSettingService)
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