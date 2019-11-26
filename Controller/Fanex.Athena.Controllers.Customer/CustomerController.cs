// -----------------------------------------------------------------------
// <copyright file="CustomerController.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.Customer
{
    using DataAccess.Core.Users.Interfaces;

    using Excel.Base.Helpers;

    using Fanex.Athena.Excel.Customer;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.DTO.Users;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.Model.Customer.ViewModel;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.Customer.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Utility;
    using Fanex.Athena.Web.ActionFilter;
    using Fanex.Athena.Web.ResultExtension;

    using Model.Core.DataDomain;
    using Model.Customer.DTO;

    using Newtonsoft.Json;

    using Resources;


    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;

    [FunctionAuthorization(PermissionKeys.CustomerInfoCustomerList)]
    public class CustomerController : CultureBaseController
    {
        private const string GROUP = "Group";
        private const string BASTATUS = "BAStatus";
        private const string CUSTOMERCOMM = "Commission";
        private const string STATUS = "Status";

        private static readonly IEnumerable<string> GridColumns = new[]
        {
            "ExternalId",
            "SystemId",
            "AvailableFunds",
            "PendingFunds",
            "SpecialLevel",
            "OddsGroup",
            "CustomerOption"
        };

        private static readonly IEnumerable<string> GridColumnsForFakeLincesee = new[]
        {
            "ExternalId",
            "AvailableFunds",
            "PendingFunds",
            "CustomerOption"
        };

        private readonly ICustomerListService _customerListService;
        private readonly IGroupComService _groupComService;
        private readonly ILicenseeDataAccess _licenseeDataAccess;
        private readonly IProductService _productService;
        private readonly ISubsidiaryService _subsidiaryService;
        private readonly IAuthorizationService _authorizationService;

        public CustomerController(
            ICustomerListService customerListService,
            IGroupComService groupComService,
            ILicenseeDataAccess licenseeDataAccess,
            IProductService productService,
            ISubsidiaryService subsidiaryService,
            IAuthorizationService authorizationService
            )
        {
            _customerListService = customerListService;
            _groupComService = groupComService;
            _licenseeDataAccess = licenseeDataAccess;
            _productService = productService;
            _subsidiaryService = subsidiaryService;
            _authorizationService = authorizationService;
        }

        #region Action

        [HttpGet]
        public async Task<ActionResult> CustomerList(string userName = "", int groupId = -1)
        {
            var licensee = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var productAccess = this._productService.GetProductAccess(licensee.LicenseeId, userSession.Language);
            var allowLicensees = AppSettingInstance.LicenseeOfferStatusFunction;
            var placeholderUsername = IsFakeLicensee(licensee.LicenseeName) ? ViewResources.ExternalId : ViewResources.ExternalIdOrSystemId;
            var metaModel = new CustomerListMetaModel
            {
                Username = userName == placeholderUsername ? string.Empty : userName,
                GroupCommId = groupId,
                LicenseeId = licensee.LicenseeId,
                IsShowStatusDropdown = allowLicensees.Contains(licensee.LicenseeId),
                GridColumns = InitGridColumns(productAccess.IsAllow(Product.BA), allowLicensees),
                OddsGroups = GetOddsGroups(),
                BaseCurrency = userSession.DefaultBaseCurrency
            };

            var model = await CreateCustomerViewModelAsync(metaModel);

            if (!model.IsSubsidiary)
            {
                this.SetValueForBaStatus(model);
            }

            ViewBag.ProductList = productAccess.ProductList.Select(x => x.ProductCode);
            return View("~/Views/Desktop/Customer/Customers.cshtml", model);
        }

        [HttpPost]
        [AjaxRequest]
        [CustomValidateAntiForgery]
        [ValidationWebRequest]
        public async Task<dynamic> CustomerList(CustomerListMetaModel metaModel)
        {
            AssignMetaModelData(metaModel);

            var result = await _customerListService.GetActiveCustomersAsync(metaModel);
            return new JsonResult
            {
                Data = new
                {
                    Data = result.DataList,
                    result.TotalRows
                },
                MaxJsonLength = int.MaxValue
            };
        }

        [HttpPost]
        [AjaxRequest]
        [CustomValidateAntiForgery]
        [ValidationWebRequest]
        public async Task<dynamic> DormantCustomerList(CustomerListMetaModel metaModel)
        {
            AssignMetaModelData(metaModel);

            var result = await _customerListService.GetDormantCustomersAsync(metaModel);
            return new JsonResult
            {
                Data = new
                {
                    Data = result.DataList,
                    result.TotalRows
                },
                MaxJsonLength = int.MaxValue
            };
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        public async Task<ActionResult> ExportExcel(string excelParam)
        {
            if (string.IsNullOrEmpty(excelParam))
            {
                return null;
            }

            var metaModel = JsonConvert.DeserializeObject<CustomerListMetaModel>(excelParam);
            if (metaModel != null && metaModel.IsValid)
            {
                var licensee = SessionServiceInstance.LicenseeSession;
                var user = SessionServiceInstance.UserSession;
                metaModel.IsShowStatusDropdown = AppSettingInstance.LicenseeOfferStatusFunction.Contains(licensee.LicenseeId);
                metaModel.LicenseeId = licensee.LicenseeId;
                metaModel.AgentListXml = GetAgentListXml(user, licensee.LicenseeName, metaModel);

                if (metaModel.GridColumns.Any(i => i.Checked))
                {
                    var templatePath = Server.MapPath(@"~/App_Data/Template/Customers/CustomerList.xls");

                    var data = await _customerListService.GetActiveCustomersAsync(metaModel).ConfigureAwait(false);
                    var model = new CustomerListViewModel
                    {
                        Param = metaModel,
                        DataList = data.DataList,
                        TotalRows = data.TotalRows,
                        IsAllowedCustomerCommission = licensee.IsAllowedCustomerComm,
                        ProductAccess = this._productService.GetProductAccess(licensee.LicenseeId, user.Language)
                    };
                    var fileName = "CustomerList_" + DateTime.Now.ToString("MM-dd-yyyy");
                    var reportTitle = ViewResources.CustomerList + " - "
                        + string.Format(ViewResources.Viewin, metaModel.IsConvert ? metaModel.BaseCurrency.ToUpper(CultureInfo.CurrentCulture) : metaModel.CurrencyName);

                    var excel = CreateExcel(templatePath, reportTitle, model);

                    excel.Export();

                    return new ExcelResult(excel.Workbook, fileName);
                }
            }

            return File(ExcelHelper.ExportEmptyFile(), "application/vnd.ms-excel", "Empty.xls");
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        public async Task<ActionResult> ExportExcelDormantCustomer(string excelParam)
        {
            if (string.IsNullOrEmpty(excelParam))
            {
                return null;
            }

            var metaModel = JsonConvert.DeserializeObject<CustomerListMetaModel>(excelParam);
            if (metaModel != null && metaModel.IsValid)
            {
                var licensee = SessionServiceInstance.LicenseeSession;
                metaModel.LicenseeId = licensee.LicenseeId;
                metaModel.AgentListXml = GetAgentListXml(SessionServiceInstance.UserSession, licensee.LicenseeName, metaModel);

                var templatePath = Server.MapPath(@"~/App_Data/Template/Customers/DormantCustomerList.xls");

                var resultModel = await _customerListService.GetDormantCustomersAsync(metaModel);
                if (resultModel.DataList.Any())
                {
                    var fileName = "DormantCustomerList_" + DateTime.Now.ToString("MM-dd-yyyy");
                    var reportTitle = ViewResources.DormantCustomers + " - "
                        + string.Format(ViewResources.Viewin, metaModel.IsConvert ? metaModel.BaseCurrency.ToUpper(CultureInfo.CurrentCulture) : metaModel.CurrencyName);

                    var excel = CreateDormantCustomerExcel(templatePath, reportTitle, resultModel.DataList);

                    excel.Export();

                    return new ExcelResult(excel.Workbook, fileName);
                }
            }

            return File(ExcelHelper.ExportEmptyFile(), "application/vnd.ms-excel", "Empty.xls");
        }

        [CustomValidateAntiForgery]
        [ValidatePermissionOnData]
        public ActionResult LogInfo(int custId)
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var logInfo = _customerListService.GetCustomerLoginInfo(custId,
                licenseeSession.LicenseeId, licenseeSession.LicenseeName);

            var model = new LogInfoViewModel
            {
                LogInfo = logInfo,
                ProductAccess = this._productService.GetProductAccess(licenseeSession.LicenseeId,
                userSession.Language)
            };

            return View("~/Views/Desktop/Customer/CustomerDialog/LogInfo.cshtml", model);
        }

        #endregion Action

        #region Ultilities

        protected internal virtual CustomerListExcel CreateExcel(
            string templatePath,
            string reportTitle,
            CustomerListViewModel model)
        {
            return new CustomerListExcel(templatePath, reportTitle, model);
        }

        protected internal virtual DormantCustomerListExcel CreateDormantCustomerExcel(
            string templatePath,
            string reportTitle,
            IEnumerable<DormantCustomer> dataList)
        {
            return new DormantCustomerListExcel(templatePath, reportTitle, dataList);
        }

        private static IEnumerable<CheckedItem> GetOddsGroups()
        {
            return new List<CheckedItem>
            {
                new CheckedItem { Name = "A", Checked = true },
                new CheckedItem { Name = "B", Checked = true },
                new CheckedItem { Name = "C", Checked = true },
                new CheckedItem { Name = "D", Checked = true },
                new CheckedItem { Name = "E", Checked = true },
                new CheckedItem { Name = "F", Checked = true }
            };
        }

        private void AssignMetaModelData(CustomerListMetaModel metaModel)
        {
            var licensee = SessionServiceInstance.LicenseeSession;
            var placeholderUsername = IsFakeLicensee(licensee.LicenseeName) ?
                            ViewResources.ExternalId :
                            ViewResources.ExternalIdOrSystemId;

            metaModel.LicenseeId = licensee.LicenseeId;
            metaModel.IsShowStatusDropdown = AppSettingInstance.LicenseeOfferStatusFunction.Contains(metaModel.LicenseeId);
            metaModel.Username = metaModel.Username == placeholderUsername ? string.Empty : metaModel.Username;
            metaModel.AgentListXml = GetAgentListXml(
                SessionServiceInstance.UserSession,
                licensee.LicenseeName,
                metaModel);
        }

        private async Task<CustomerListViewModel> CreateCustomerViewModelAsync(CustomerListMetaModel metaModel)
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var isSubsidiary = userSession.UserLevel == UserLevelType.Subsidiary;
            var model = new CustomerListViewModel
            {
                Param = metaModel,
                CurrencyList = userSession.CurrencyList,
                ProductAccess = this._productService.GetProductAccess(licenseeSession.LicenseeId, userSession.Language),
                IsAllowedUserEditComm = _authorizationService.IsAllowedEditCommission(userSession),
                IsAllowedUserChangeBA = _authorizationService.IsAllowedSpecialBA(userSession),
                IsAllowedCustomerCommission = licenseeSession.IsAllowedCustomerComm,
                IsFakeLicensee = IsFakeLicensee(licenseeSession.LicenseeName),
                GroupSubsidiaryList = _subsidiaryService.GetSubsidiaryTree(userSession, licenseeSession.LicenseeName),
                ViewType = (SubsidiaryViewType)userSession.SubsidiaryViewType,
                IsSubsidiary = isSubsidiary
            };
            if (!isSubsidiary && licenseeSession.IsAllowedCustomerComm)
            {
                model.GroupCommDataList = await _groupComService.GetAllAsync(licenseeSession.LicenseeId);
                model.CurrentGroupComm = _groupComService.GetById(metaModel.GroupCommId, licenseeSession.LicenseeId);
            }

            return model;
        }

        /// <summary>
        ///     This function relates to special BA permission of Justin - Martin.
        ///     Martin - Justin can update BA anytime.
        ///     Other users can update BA on a special time only, and they can not turn on BA
        ///     for the user who Martin-Justin has turned off.
        /// </summary>
        /// <param name="model">The view model.</param>
        private void SetValueForBaStatus(CustomerListViewModel model)
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var specialBaPermission = _authorizationService.IsAllowedSpecialBA(userSession);
            var productAccess = _productService.GetProductAccess(licenseeSession.LicenseeId, userSession.Language);
            var request = new Request
            {
                Language = userSession.Language,
                Ip = Request.UserHostAddress
            };
            var canUpdateBa = specialBaPermission;
            var canUpdateBaMessage = string.Empty;
            if (!specialBaPermission)
            {
                var canUpdateBaResult = _licenseeDataAccess.IsAllowUpdateMemberBAStatus(request, licenseeSession.LicenseeId);
                canUpdateBa = canUpdateBaResult.ExtendedData;
                canUpdateBaMessage = canUpdateBaResult.Message;
            }

            model.BATimeCheck = (!canUpdateBa && productAccess.IsAllowBA)
                                    ? canUpdateBaMessage
                                    : string.Empty;
            model.CanUpdateBA = canUpdateBa;
            model.CanUpdateBAMessage = canUpdateBaMessage;
        }

        private IEnumerable<CheckedItem> InitGridColumns(bool isAllowBA, IEnumerable<int> allowLicensees)
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var isSubsidiary = SessionServiceInstance.UserSession.UserLevel == UserLevelType.Subsidiary;
            var isFakeLicensee = IsFakeLicensee(licenseeSession.LicenseeName);
            var gridColumns = isFakeLicensee ? GridColumnsForFakeLincesee : GridColumns;
            var items = new List<CheckedItem>();
            foreach (var name in gridColumns)
            {
                items.Add(new CheckedItem { Name = name, Checked = true });
            }

            if (isAllowBA && !isSubsidiary)
            {
                items.Add(new CheckedItem { Name = BASTATUS, Checked = true });
            }

            if (licenseeSession.IsAllowedCustomerComm && !isFakeLicensee && !isSubsidiary)
            {
                items.Insert(0, new CheckedItem { Name = GROUP, Checked = true });
                items.Add(new CheckedItem { Name = CUSTOMERCOMM, Checked = true });
            }

            if (allowLicensees.Contains(licenseeSession.LicenseeId))
            {
                items.Add(new CheckedItem { Name = STATUS, Checked = true });
            }

            return items;
        }

        #endregion Ultilities

        private string GetAgentListXml(UserAuthInfo user, string licenseeName, CustomerListMetaModel metaModel)
        {
            var viewType = (SubsidiaryViewType)user.SubsidiaryViewType;
            if (metaModel.IsViewOnSubsidiary && (viewType == SubsidiaryViewType.MasterManagement || viewType == SubsidiaryViewType.NormalManagement))
            {
                var currencyAgentList = _subsidiaryService.GetCurrencyAgentList(user, licenseeName,
                    metaModel.SubsidiaryList, currencyId: metaModel.CurrencyId);
                return AuthParameterHelper.GenerateAgentListXml(user.CurrencyList, currencyAgentList);
            }
            return AuthParameterHelper.GenerateAgentListXml(user.CurrencyAgentList, metaModel.CurrencyId);
        }
    }
}