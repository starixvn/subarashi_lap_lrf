using Fanex.Athena.Extension.Helper;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Core.MetaModel.Product;
using Fanex.Athena.Model.Report.MetaModel;
using Fanex.Athena.Model.Report.ViewModel;
using Fanex.Athena.Resources;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.VendorAdapter.Interfaces;
using Fanex.Athena.Web.ActionFilter;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace Fanex.Athena.Controllers.Report
{
    [FunctionAuthorization(PermissionKeys.ReportExtraPayout)]
    public class ExtraPayoutReportController : ReportBaseController
    {
        private readonly IReportSettingService _reportSettingService;
        private readonly ICacheRefAdapter _cacheRefAdapter;
        private readonly ISubsidiaryService _subsidiaryService;

        public ExtraPayoutReportController(
            IReportSettingService reportSettingService,
            ICacheRefAdapter cacheRefAdapter,
            ISubsidiaryService subsidiaryService
            )
        {
            _reportSettingService = reportSettingService;
            _cacheRefAdapter = cacheRefAdapter;
            _subsidiaryService = subsidiaryService;
        }

        public ActionResult Index()
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var reportSetting = _reportSettingService.GetSetting(PermissionKeys.ReportExtraPayout,
                licenseeSession.LicenseeName);
            var productAccess = ProductServiceInstance.GetSingleWalletProductAccess(
               licenseeSession.LicenseeId,
               userSession.Language,
               FunctionNames.ExtraPayout);
            var subsidiaryList = _subsidiaryService.GetWhiteLabelTree(userSession, licenseeSession.LicenseeName);
            var viewType = !subsidiaryList.Any() ? SubsidiaryViewType.NotManagement : (SubsidiaryViewType)userSession.SubsidiaryViewType;

            var param = new ExtraPayoutMetaModel
            {
                LicenseeId = licenseeSession.LicenseeId,
                ProductOptions = AddPlayerTipsProDuct(ToProductOptions(productAccess.ProductList)),
                IsExcludedTestData = true,
                ReportBy = ReportByType.Daily
            };

            var model = new ExtraPayoutViewModel
            {
                Param = param,
                CurrencyList = userSession.CurrencyList,
                IsAllowedCustomerCommission = licenseeSession.IsAllowedCustomerComm,
                ReportSetting = reportSetting,
                ViewType = viewType,
                SubsidiaryList = subsidiaryList
            };

            ViewBag.DefaultSelectedBaseCurrency = userSession.DefaultBaseCurrency;

            return View("~/Views/Desktop/Report/ExtraPayout/Main.cshtml", model);
        }

        [HttpGet]
        public ActionResult GetPromotionTypes(string productCode)
        {
            var result = BuildPromotionTypeList(productCode).Select(x => new { value = x.ID, label = x.Name, status = true });
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        private IEnumerable<CheckedItem> BuildPromotionTypeList(string productCode)
        {
            var promotionTypeList = new List<CheckedItem>();

            if (string.IsNullOrEmpty(productCode))
            {
                return promotionTypeList;
            }
            const string productResource = "Product";
            var productCodeList = productCode?.Split(',');

            AddPromotionTypesForProductPP(promotionTypeList, productCodeList, productResource);
            AddPromotionTypesForProductSPR(promotionTypeList, productCodeList);

            if (productCodeList.IsPresent(_ => _ == Product.SAG))
            {
                promotionTypeList.AddRange(new List<CheckedItem>
                {
                    new CheckedItem { ID = ExtraPayoutMapType.SAGamingTip, Name = _cacheRefAdapter.GetBettype((int)BetType.SAGamingTip), Checked = true }
                });
            }

            AddPromotionTypesForProductSBC(promotionTypeList, productCodeList, productResource);

            if (productCodeList.IsPresent(_ => _ == Product.SXG))
            {
                promotionTypeList.AddRange(new List<CheckedItem>
                {
                    new CheckedItem { ID = ExtraPayoutMapType.EASexyLuckyDraw, Name = _cacheRefAdapter.GetBettype((int)BetType.EASexyLuckyDraw), Checked = true }
                });
            }

            if (productCodeList.IsPresent(_ => _ == Product.CC))
            {
                promotionTypeList.AddRange(new List<CheckedItem>
                {
                    new CheckedItem { ID = ExtraPayoutMapType.ArcadiaGamingBonus, Name = _cacheRefAdapter.GetBettype((int)BetType.ArcadiaGamingBonus), Checked = true }
                });
            }

            AddPromotionTypesForProductVGA(promotionTypeList, productCodeList, productResource);

            if (productCodeList.IsPresent(_ => _ == Product.SG))
            {
                promotionTypeList.AddRange(new List<CheckedItem>
                {
                    new CheckedItem { ID = ExtraPayoutMapType.SGJackpotPrize,
                        Name = $"{ViewResources.ResourceManager.GetString(productResource + Product.SG)} - {_cacheRefAdapter.GetBettype((int)BetType.SGJackpotPrize)}", Checked = true },
                    new CheckedItem { ID = ExtraPayoutMapType.SGJackpotContribution,
                        Name = $"{ViewResources.ResourceManager.GetString(productResource + Product.SG)} - {_cacheRefAdapter.GetBettype((int)BetType.SGJackpotContribution)}", Checked = true },
                    new CheckedItem { ID = ExtraPayoutMapType.SGPromotion,
                        Name = $"{ViewResources.ResourceManager.GetString(productResource + Product.SG)} - {_cacheRefAdapter.GetBettype((int)BetType.SGPromotion)}", Checked = true }
                });
            }

            if (productCodeList.IsPresent(_ => _ == Product.AB))
            {
                promotionTypeList.AddRange(new List<CheckedItem>
                {
                    new CheckedItem { ID = ExtraPayoutMapType.AllbetPromotion,
                        Name = $"{ViewResources.ResourceManager.GetString(productResource + Product.AB)} - {_cacheRefAdapter.GetBettype((int)BetType.AllbetPromotion)}", Checked = true }
                });
            }

            if (productCodeList.IsPresent(_ => _ == Product.TIP))
            {
                promotionTypeList.AddRange(new List<CheckedItem>
                {
                    new CheckedItem { ID = ExtraPayoutMapType.TIPStreamerTips,
                        Name = _cacheRefAdapter.GetBettype((int)BetType.TIPStreamerTips), Checked = true }
                });
            }

            if (productCodeList.IsPresent(_ => _ == Product.MGRNG))
            {
                promotionTypeList.AddRange(new List<CheckedItem>
                {
                    new CheckedItem { ID = ExtraPayoutMapType.MGRNGPromotion,
                        Name = $"{ViewResources.ResourceManager.GetString(productResource + Product.MGRNG)} - {_cacheRefAdapter.GetBettype((int)BetType.MGRNGPromotion)}", Checked = true }
                });
            }

            return promotionTypeList;
        }

        private void AddPromotionTypesForProductPP(List<CheckedItem> promotionTypeList, IEnumerable<string> productCodeList, string productResource)
        {
            if (productCodeList.IsPresent(_ => _ == Product.PP))
            {
                promotionTypeList.AddRange(new List<CheckedItem>
                {
                    new CheckedItem { ID = ExtraPayoutMapType.PPTournamentPrize,
                        Name = $"{ViewResources.ResourceManager.GetString(productResource + Product.PP)} - {_cacheRefAdapter.GetBettype((int)BetType.PPTournamentPrize)}", Checked = true },
                    new CheckedItem { ID = ExtraPayoutMapType.PPPromotionPrize,
                        Name = $"{ViewResources.ResourceManager.GetString(productResource + Product.PP)} - {_cacheRefAdapter.GetBettype((int)BetType.PPPromotionPrize)}", Checked = true },
                    new CheckedItem { ID = ExtraPayoutMapType.PPJackpotPrize,
                        Name = $"{ViewResources.ResourceManager.GetString(productResource + Product.PP)} - {_cacheRefAdapter.GetBettype((int)BetType.PPJackpotPrize)}", Checked = true },
                    new CheckedItem { ID = ExtraPayoutMapType.PPJackpotContribution,
                        Name = $"{ViewResources.ResourceManager.GetString(productResource + Product.PP)} - {_cacheRefAdapter.GetBettype((int)BetType.PPJackpotContribution)}", Checked = true }
                });
            }
        }

        private void AddPromotionTypesForProductSPR(List<CheckedItem> promotionTypeList, IEnumerable<string> productCodeList)
        {
            if (productCodeList.IsPresent(_ => _ == Product.SPR))
            {
                promotionTypeList.AddRange(new List<CheckedItem>
                {
                    new CheckedItem { ID = ExtraPayoutMapType.SabaLuckySpin, Name = _cacheRefAdapter.GetBettype((int)BetType.SabaLuckySpin), Checked = true },
                    new CheckedItem { ID = ExtraPayoutMapType.SabaLoyaltyPointsExchange, Name = _cacheRefAdapter.GetBettype((int)BetType.SabaLoyaltyPointsExchange), Checked = true },
                    new CheckedItem { ID = ExtraPayoutMapType.SabaRedEnvelope, Name = _cacheRefAdapter.GetBettype((int)BetType.SabaRedEnvelope), Checked = true }
                });
            }
        }

        private void AddPromotionTypesForProductSBC(List<CheckedItem> promotionTypeList, IEnumerable<string> productCodeList, string productResource)
        {
            if (productCodeList.IsPresent(_ => _ == Product.SBC))
            {
                promotionTypeList.AddRange(new List<CheckedItem>
                {
                    new CheckedItem { ID = ExtraPayoutMapType.SCBFreeBets,
                        Name = $"{ViewResources.ResourceManager.GetString(productResource + Product.SBC)} - {ViewResources.FreeBets}", Checked = true },
                    new CheckedItem { ID = ExtraPayoutMapType.SCBFreeBetsJackpotPrize,
                        Name = $"{ViewResources.ResourceManager.GetString(productResource + Product.SBC)} - {_cacheRefAdapter.GetBettype((int)BetType.SCBFreeBetsJackpotPrize)}", Checked = true },
                    new CheckedItem { ID = ExtraPayoutMapType.SCBFreeBetsJackpotContribution,
                        Name = $"{ViewResources.ResourceManager.GetString(productResource + Product.SBC)} - {_cacheRefAdapter.GetBettype((int)BetType.SCBFreeBetsJackpotContribution)}",
                        Checked = true }
                });
            }
        }

        private void AddPromotionTypesForProductVGA(List<CheckedItem> promotionTypeList, IEnumerable<string> productCodeList, string productResource)
        {
            if (productCodeList.IsPresent(_ => _ == Product.VGA))
            {
                promotionTypeList.AddRange(new List<CheckedItem>
                {
                    new CheckedItem { ID = ExtraPayoutMapType.VgamingFreeBets,
                        Name = $"{ViewResources.ResourceManager.GetString(productResource + Product.VGA)} - {ViewResources.FreeBets}", Checked = true },
                    new CheckedItem { ID = ExtraPayoutMapType.VgamingFreeBetsJackpotPrize,
                        Name = $"{ViewResources.ResourceManager.GetString(productResource + Product.VGA)} - {_cacheRefAdapter.GetBettype((int)BetType.VgamingFreeBetsJackpotPrize)}", Checked = true },
                    new CheckedItem { ID = ExtraPayoutMapType.VgamingFreeBetsJackpotContribution,
                        Name = $"{ViewResources.ResourceManager.GetString(productResource + Product.VGA)} - {_cacheRefAdapter.GetBettype((int)BetType.VgamingFreeBetsJackpotContribution)}",
                        Checked = true }
                });
            }
        }

        private IList<ProductOption> AddPlayerTipsProDuct(IList<ProductOption> productList)
        {
            var originalProductList = ProductServiceInstance.GetProductList(SessionServiceInstance.LicenseeSession.LicenseeId, SessionServiceInstance.UserSession.Language);

            if (originalProductList.Any(_ => _.ProductCode == Product.SB))
            {
                productList.Add(new ProductOption { Code = Product.TIP, Name = ViewResources.ProductTIP, Status = true });
            }

            return productList;
        }
    }
}