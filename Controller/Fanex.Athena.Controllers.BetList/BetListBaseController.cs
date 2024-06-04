namespace Fanex.Athena.Controllers.BetList
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using System.Web.SessionState;
    using DataAccess.Core.Configuration.Interfaces;
    using Excel.Base.Helpers;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.MetaModel;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Utility;
    using Fanex.Athena.Web.ActionFilter;
    using Model.BetList.MetaModel;
    using Model.Core.DTO.Configuration;
    using Resources;
    using VendorAdapter.Interfaces;

    [SessionState(SessionStateBehavior.ReadOnly)]
    [UMFilter]
    public class BetListBaseController : CultureBaseController
    {
        protected const int PageSizeExcel = 63000;
        protected const int ExternalIdColumn = 1;
        protected const int SystemIdColumn = 2;
        protected const int WinLostColumn = 7;
        protected const int BetEffectiveColumn = 8;
        protected const int LicenseeWLColumn = 9;

        protected static readonly int[] HiddenColumnIndexes = new[] { WinLostColumn, BetEffectiveColumn, LicenseeWLColumn };

        public IBalanceUpDataAccess BalanceUpDataAccessInstance { get; set; }

        public IProductService ProductService { get; set; }

        public ISubsidiaryService SubsidiaryService { get; set; }

        public ICacheRefAdapter CacheRefAdapter { get; set; }

        public IBetListApiClient BetListApiClient { get; set; }

        protected static string GetViewInCurrency(BetListMetaModel metaModel)
        {
            return string.Format(
                ViewResources.Viewin,
                metaModel.IsConvert ? metaModel.BaseCurrency.ToUpperInvariant() : metaModel.CurrencyName);
        }

        protected static string GetViewInCurrency(int curencyId, string defaultCurrencyName)
        {
            if (curencyId == BaseCurrencyType.All)
            {
                return ViewResources.AllCurrencies;
            }

            return SystemConstants.BaseCurrencyList.ContainsKey(curencyId) ?
                string.Format(ViewResources.Viewin, SystemConstants.BaseCurrencyList[curencyId]) :
                string.Format(ViewResources.Viewin, defaultCurrencyName);
        }

        protected static string GetCustomerBetListTitle(BetListMetaModel metaModel, string currencyTitle)
        {
            return ViewResources.CustomerBetList + string.Format(
                 " {0} --> {1} - {2}{3} - {4}",
                 metaModel.FromDate.ToString(FormatKey.ShortDateFormat),
                 metaModel.ToDate.ToString(FormatKey.ShortDateFormat),
                 metaModel.ExternalId,
                 metaModel.IsFakeLicensee ? string.Empty : $"({metaModel.SystemId})",
                 currencyTitle);
        }

        protected static string GetBetListDetailTitle(string productCode, DateTime date)
        {
            return $"{productCode} - {ViewResources.DetailedBetlist} - {date.ToString("MM/dd/yyyy")}";
        }

        protected BalanceUp GetBalanceUp()
        {
            return BalanceUpDataAccessInstance.GetBalanceUp();
        }

        protected IDictionary<int, int[]> CurrencyAgentListBySubsidiaryBusiness(IMetaModelSubsidiarySearch metaModel) =>
           SubsidiaryService.IsIgnoredSubsidiarySearch(metaModel.SubsidiarySearch, metaModel.SubsidiaryList, SessionServiceInstance.UserSession) ? SessionServiceInstance.UserSession.CurrencyAgentList
           : SubsidiaryService.GetCurrencyAgentList(SessionServiceInstance.LicenseeSession.LicenseeName, SessionServiceInstance.UserSession.CurrencyAgentList, metaModel.SubsidiaryList);

        protected BetListMetaModel CreateDefaultMetaModel(BetListMetaModel metaModel = null)
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var defaultMetaModel = metaModel ?? new BetListMetaModel();
            defaultMetaModel.LicenseeId = licenseeSession.LicenseeId;
            defaultMetaModel.UserId = userSession.UserId;
            defaultMetaModel.HasPlayerCom = SessionServiceInstance.LicenseeSession.IsAllowedCustomerComm;
            defaultMetaModel.FromDate = DateTime.SpecifyKind(defaultMetaModel.FromDate.Date, DateTimeKind.Unspecified);
            defaultMetaModel.ToDate = DateTime.SpecifyKind(defaultMetaModel.ToDate.Date, DateTimeKind.Unspecified);
            defaultMetaModel.Date = DateTime.SpecifyKind(defaultMetaModel.Date.Date, DateTimeKind.Unspecified);
            defaultMetaModel.IsFakeLicensee = IsFakeLicensee(licenseeSession.LicenseeName);
            defaultMetaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(CurrencyAgentListBySubsidiaryBusiness(metaModel ?? new BetListMetaModel()), defaultMetaModel.CurrencyId);
            defaultMetaModel.IsShowIpvn = userSession.IsShowIpvn;
            defaultMetaModel.IsShowIp = userSession.IsShowIp;

            var balanceUp = GetBalanceUp();
            defaultMetaModel.BalanceUpDay = DateTime.SpecifyKind(balanceUp.BalanceUpDay.Date, DateTimeKind.Unspecified);
            defaultMetaModel.MoveBetsDay = DateTime.SpecifyKind(balanceUp.MoveBetsDay.Date, DateTimeKind.Unspecified);

            return defaultMetaModel;
        }

        protected void InitBaseCurrencyValue(BetListMetaModel metaModel)
        {
            if (metaModel != null && string.IsNullOrEmpty(metaModel.BaseCurrency)
                && metaModel.CurrencyId == 0)
            {
                metaModel.BaseCurrency = SessionServiceInstance.UserSession.DefaultBaseCurrency;
            }
        }

        protected void AssignSpecialPlatformValue(BetListMetaModel metaModel)
        {
            if (metaModel != null)
            {
                metaModel.SpecialPlatform = SessionServiceInstance.LicenseeSession.SpecialPlatform;
            }
        }

        protected internal virtual FileContentResult EmptyExcel()
        {
            return File(ExcelHelper.ExportEmptyFile(), "application/vnd.ms-excel", "Empty.xls");
        }

        protected virtual Task<ActionResult> ExportExcel(BetListExcelMetaModel metaModel)
        {
            return Task.FromResult<ActionResult>(null);
        }

        protected virtual bool IsValidExportExcel(BetListMetaModel model)
        {
            return true;
        }

        protected internal virtual async Task<ActionResult> ProcessExportExcel(
            BetListExcelMetaModel metaModel,
            string fileName,
            string apiPath = null)
        {
            var data = await BetListApiClient.PostStreamAsync(apiPath ?? "/BetList/ExportExcel", metaModel, SessionServiceInstance.UserSession.Language).ConfigureAwait(false);
            return File(data, "application/vnd.ms-excel", fileName + ".xls");
        }

        protected async Task<ActionResult> ProcessDefaultRequest(BetListExcelMetaModel model, string viewPath, string uspKey)
        {
            if (!model.IsExportExcel)
            {
                return View(viewPath, model);
            }

            if (IsValidExportExcel(model))
            {
                model.UspKey = uspKey;
                AutoBindMetaModelService.BindProductCodeList(model, SessionServiceInstance.LicenseeSession.OfferedSubProductList, ProductService);

                return await ExportExcel(model).ConfigureAwait(false);
            }

            return EmptyExcel();
        }
    }
}