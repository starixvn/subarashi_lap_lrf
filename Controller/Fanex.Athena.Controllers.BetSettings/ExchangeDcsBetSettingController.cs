// -----------------------------------------------------------------------
// <copyright file="ExchangeComm.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.BetSettings
{
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;
    using Model.BetSettings.MetaModel;
    using Model.BetSettings.ViewModel;
    using Resources;
    using Service.BetSettings.Interfaces;

    public class ExchangeDcsBetSettingController : BetSettingBaseController
    {
        private static readonly double[] ValidComms = new[] { 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7 };

        private readonly IDcsBetSettingService _betSettingService;

        private readonly IExchangeCommApiService _exchangeCommApiService;

        public ExchangeDcsBetSettingController(
            ICoreBetSettingService coreBetSettingService,
            IProductService productService,
            IDcsBetSettingService betSettingService,
            IExchangeCommApiService exchangeCommApiService
            )
        : base(coreBetSettingService, productService)
        {
            _betSettingService = betSettingService;
            _exchangeCommApiService = exchangeCommApiService;
        }

        [HttpGet]
        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        [ValidatePermissionOnData(isObject: true)]
        public async Task<ActionResult> Index(BetSettingMetaModel metaModel)
        {
            var viewModel = new ExchangeBetSettingViewModel
            {
                CommissionList = ValidComms
            };
            await AssignRequiredPropertiesAsync(viewModel, metaModel);

            viewModel.IsEnabled = await
                _betSettingService.GetStatusAsync(metaModel.CustId, metaModel.ProductId);

            var apiResult = await _exchangeCommApiService.GetCommission(metaModel.CustId, SessionServiceInstance.UserSession.Language);
            if (apiResult.IsSuccessful)
            {
                viewModel.Commission = apiResult.ExtendedData;
            }
            else
            {
                viewModel.IsNoInfo = true;
            }

            const string ViewPath = "~/Views/Desktop/Customer/BetSetting/Exchange.cshtml";
            return View(ViewPath, viewModel);
        }

        [HttpPost]
        [AjaxRequest]
        [CustomValidateAntiForgery]
        public async Task<ActionResult> UpdateComm(int custId, double oldCommission, double newCommission)
        {
            if (!ValidComms.Contains(newCommission))
            {
                const int InvalidChargeCommissionError = 100;
                return Json(new ResultInfo { Code = InvalidChargeCommissionError, Message = ViewResources.InvalidChargeCommission });
            }
            var userSession = SessionServiceInstance.UserSession;
            var result = await _exchangeCommApiService.UpdateCommissionAsync(
                userSession.UserId,
                custId,
                oldCommission,
                newCommission,
                userSession.Language);

            return Json(result);
        }
    }
}