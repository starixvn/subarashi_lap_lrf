using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using Fanex.Athena.DataAccess.Report.Interfaces;
using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Report.DTO;
using Fanex.Athena.Model.Report.MetaModel;
using Fanex.Athena.Model.Report.ViewModel;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.Web.ActionFilter;

namespace Fanex.Athena.Controllers.Report
{
    [FunctionAuthorization(PermissionKeys.BettingTicketCenter)]
    public class ExchangeVoidedController : ReportBaseController
    {
        private readonly IProductService _productService;

        private readonly ILGAPIClient _lgClient;

        private readonly IAppSettings _appSetting;

        private readonly IExchangeVoidedDataAccess _dataAccess;

        public ExchangeVoidedController(
                  ILGAPIClient lgClient,
                  IAppSettings appSetting,
                  IExchangeVoidedDataAccess dataAccess,
                  IProductService productService)
        {
            _lgClient = lgClient;
            _appSetting = appSetting;
            _dataAccess = dataAccess;
            _productService = productService;
        }

        [HttpGet]
        public ActionResult Index()
        {
            var hasPermission = HasPermission();

            return View("~/Views/Desktop/Report/ExchangeVoided/Index.cshtml", model: hasPermission);
        }

        [HttpPost]
        [ValidationWebRequest(ObjectName = "metaModel")]
        [AutoBindMetaModel(BindAgent = true)]
        public async Task<ActionResult> Index(ExchangeVoidedMetaModel metaModel)
        {
            if (!HasPermission())
            {
                return JsonNet(new ExchangeVoidedViewModel { DataList = new List<ExchangeVoidedItem>(), TotalPage = 0 });
            }

            var userName = metaModel.UserName?.Trim();
            var custId = 0;
            if (!string.IsNullOrEmpty(userName))
            {
                custId = await _dataAccess.GetCustIdAsync(userName, metaModel.AgentListXml);

                if (custId == 0)
                {
                    return JsonNet(new ExchangeVoidedViewModel { DataList = new List<ExchangeVoidedItem>(), TotalPage = 0 });
                }
            }

            var apiMetaModel = new
            {
                CustId = custId,
                metaModel.RefNo,
                metaModel.SelectedDate,
                metaModel.PageIndex,
                _appSetting.Environment
            };

            const string apiPath = "/ExchangeBetHistory/Index";

            return JsonNet(await _lgClient.PostAsync<ExchangeVoidedViewModel>(apiPath, apiMetaModel, SessionServiceInstance.UserSession.Language).ConfigureAwait(false));
        }

        private bool HasPermission()
        {
            var productList = _productService.GetProductList(
                SessionServiceInstance.LicenseeSession.LicenseeId,
                SessionServiceInstance.UserSession.Language);

            return productList.Any(x => string.Equals(Product.Exchange, x.ProductCode, StringComparison.InvariantCultureIgnoreCase));
        }
    }
}