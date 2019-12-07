using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web.SessionState;
using Fanex.Athena.Controllers;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Module.PlayerAdmin.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.ViewModels;
using Fanex.Athena.Service.Core.Common.Interfaces;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.Web.ActionFilter;
using ONEbook.UM.Filters;

namespace Fanex.Athena.Module.PlayerAdmin.Controllers
{
    [SessionState(SessionStateBehavior.ReadOnly)]
    [CheckUMFilter]
    [FunctionAuthorization(PermissionKeys.AccountInfo)]
    public class PlayerBtcSingleCustomerController : CultureBaseController
    {
        private const byte AllPlatform = 0;

        private static readonly int[] _statusList = new[]
        {
            StatusTypes.Won, StatusTypes.Lose, StatusTypes.Draw, StatusTypes.Void,
            StatusTypes.AbnormalBet, StatusTypes.Reject, StatusTypes.Refund
        };

        private static readonly int[] _liveStatusList = new[] { LiveStatusTypes.NonLive, LiveStatusTypes.Live, LiveStatusTypes.Mix };

        private readonly IProductService _productService;

        private readonly IBetListApiClient _betListApiClient;

        public PlayerBtcSingleCustomerController(
            IBetListApiClient betListApiClient,
            IProductService productService)
        {
            _betListApiClient = betListApiClient;
            _productService = productService;
        }

        [HttpGet]
        public ActionResult Index(string userName, string currencyName)
        {
            var viewModel = new PlayerBtcSingleCustomerViewModel
            {
                UserName = userName?.Trim(),
                CurrencyName = currencyName?.Trim(),
                IsAllowedCustomerComm = SessionServiceInstance.LicenseeSession.IsAllowedCustomerComm,
                ProductCodeListString = GetProductCode()
            };

            return View("~/Views/Desktop/Module/PlayerAdmin/SingleCustomer/Index.cshtml", viewModel);
        }

        [HttpPost]
        [AjaxRequest]
        [CustomValidateAntiForgery]
        [ValidationWebRequest]
        [AutoBindMetaModel(BindAgent = true)]
        public async Task<dynamic> Index([Bind(Include = "Username,PageSize,PageIndex,IsExport,SortBy,SortOrder")]PlayerBtcSingleCustomerMetaModel metaModel)
        {
            var userSession = SessionServiceInstance.UserSession;
            metaModel.HasPlayerCom = SessionServiceInstance.LicenseeSession.IsAllowedCustomerComm;

            AssignMetaModelValue(metaModel);

            if (metaModel.IsExport)
            {
                var httpResponse = await _betListApiClient.PostAsync("/BettingTicketCenter/GetBySingleCustomer",
                metaModel,
                userSession.Language).ConfigureAwait(false);

                if (httpResponse.StatusCode == HttpStatusCode.NoContent)
                {
                    return new HttpStatusCodeResult(HttpStatusCode.NoContent);

                }
                return File(await httpResponse.Content.ReadAsStreamAsync(), "application/octet-stream");
            }

            return await _betListApiClient.PostAsync<dynamic>("/BettingTicketCenter/GetBySingleCustomer",
                metaModel,
                userSession.Language
                ).ConfigureAwait(false);
        }

        private void AssignMetaModelValue(PlayerBtcSingleCustomerMetaModel metaModel)
        {
            var now = DateTime.Now;

            metaModel.Status = GetStatus();
            metaModel.Platform = AllPlatform;
            metaModel.ProductCodeList = GetProductCode();
            metaModel.LiveStatus = GetLiveStatus();
            metaModel.BaseCurrency = null;
            metaModel.FromDate = new DateTime(now.Year, now.Month, 1);
            metaModel.ToDate = now;
        }

        private static string GetStatus()
        {
            return string.Join(",", _statusList);
        }

        private static string GetLiveStatus()
        {
            return string.Join(",", _liveStatusList);
        }

        private string GetProductCode(string functionConfigKey = FunctionNames.BettingTicketCenter)
        {
            var productAccess = _productService.GetSingleWalletProductAccess(
                SessionServiceInstance.LicenseeSession.LicenseeId,
                SessionServiceInstance.UserSession.Language,
                functionConfigKey);

            return string.Join(",", productAccess.ProductList.Select(i => i.ProductCode));
        }
    }
}