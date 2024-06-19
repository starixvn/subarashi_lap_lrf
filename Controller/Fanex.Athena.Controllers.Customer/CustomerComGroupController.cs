namespace Fanex.Athena.Controllers.Customer
{
    using System;
    using System.Data;
    using System.Linq;
    using System.Net;
    using System.Threading.Tasks;
    using System.Web.Hosting;
    using System.Web.Mvc;
    using System.Web.SessionState;
    using Fanex.Athena.Excel.Customer;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.Enum;
    using Fanex.Athena.Model.Core.Helper;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.Model.Customer.ViewModel.CommissionGroupList;
    using Fanex.Athena.Service.Customer.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Utility;
    using Fanex.Athena.Web.ActionFilter;
    using Fanex.Athena.Web.ResultExtension;
    using Helpers;
    using Resources;

    [SessionState(SessionStateBehavior.ReadOnly)]
    [UMFilter]
    [FunctionAuthorization(PermissionKeys.CustomerInfoCommissionGroupList)]
    public class CustomerComGroupController : CultureBaseController
    {
        private const int InvalidGroupName = 1;
        private const int InvalidCommvalue = 2;
        private const int InvalidParams = 3;

        private readonly IGroupComService _groupComService;
        private readonly IProductService _productService;
        private readonly IFunctionUMService _functionUMService;
        private readonly string[] supportedProducts;

        public CustomerComGroupController(
            IGroupComService groupComService,
            IProductService productService,
            IFunctionUMService functionUMService)
        {
            _groupComService = groupComService;
            _productService = productService;
            _functionUMService = functionUMService;

            supportedProducts = _productService.GetAllowedProducts("CommissionGroups");
        }

        #region Get data

        [HttpGet]
        public async Task<ActionResult> Index()
        {
            var licenseeId = SessionServiceInstance.LicenseeSession.LicenseeId;
            var productAccess = _productService.GetProductAccess(licenseeId, SessionServiceInstance.UserSession.Language);
            var permissions = CommissionGroupHelper.GetProductPermissions(supportedProducts, productAccess);
            var group = _groupComService.GetAllAsync(licenseeId, permissions);

            var model = new CommissionGroupListViewModel(
                groups: await _groupComService.GetAllAsync(licenseeId, permissions).ConfigureAwait(false),
                productPermissions: permissions);

            return View("~/Views/Desktop/Customer/CustomerComm/GroupCommList.cshtml", model);
        }

        #endregion Get data

        #region Create group

        [HttpGet]
        public async Task<ActionResult> Create()
        {
            var model = new GroupCommMetaModel();

            await CreateMetaModel(model);

            return View("~/Views/Desktop/Customer/CustomerComm/CreateNewGroup.cshtml", model);
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        public async Task<ActionResult> Create(GroupCommMetaModel metaModel)
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            metaModel.LicenseeId = licenseeSession.LicenseeId;

            var productAccess = _productService.GetProductAccess(metaModel.LicenseeId, SessionServiceInstance.UserSession.Language);
            metaModel.ProductPermissions = CommissionGroupHelper.GetProductPermissions(supportedProducts, productAccess);

            var userSession = SessionServiceInstance.UserSession;
            IResultInfo result = new ResultInfo();
            ValidateGroupCommRequest(metaModel, result);

            if (result.IsSuccessful)
            {
                var request = new Request
                {
                    Language = userSession.Language,
                    Ip = Request.UserHostAddress
                };

                result = await _groupComService.InsertGroupAsync(metaModel, request, userSession.UserId, metaModel.ProductPermissions);
                result.Message = CustomerComGroupHelper.GetCreateGroupErrorMessage(result.Code);

                if (result.IsSuccessful)
                {
                    result.Message = ViewResources.MessageSuccess;
                    CustomerComGroupHelper.UpdateMetaModelAfterProcessSuccessfully(metaModel);
                }
            }

            ViewBag.Result = result;
            return View("~/Views/Desktop/Customer/CustomerComm/CreateNewGroup.cshtml", metaModel);
        }

        [HttpGet]
        public string Validate(string groupName)
        {
            return string.IsNullOrEmpty(groupName)
                || _groupComService.CheckExistingGroupByName(SessionServiceInstance.LicenseeSession.LicenseeId, groupName)
                ? "NO" : "OK";
        }

        #endregion Create group

        #region Update group

        [HttpGet]
        public async Task<ActionResult> Update(int groupId)
        {
            var productAccess = _productService.GetProductAccess(SessionServiceInstance.LicenseeSession.LicenseeId, SessionServiceInstance.UserSession.Language);
            var productPermissions = CommissionGroupHelper.GetProductPermissions(supportedProducts, productAccess);

            var model = _groupComService.GetById(groupId, SessionServiceInstance.LicenseeSession.LicenseeId, productPermissions);
            if (model == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.NotFound);
            }

            await CreateMetaModel(model);

            return View("~/Views/Desktop/Customer/CustomerComm/UpdateGroup.cshtml", model);
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        public async Task<ActionResult> Update(GroupCommMetaModel metaModel)
        {
            var licenseeId = SessionServiceInstance.LicenseeSession.LicenseeId;
            var productAccess = _productService.GetProductAccess(licenseeId, SessionServiceInstance.UserSession.Language);
            metaModel.ProductPermissions = CommissionGroupHelper.GetProductPermissions(supportedProducts, productAccess);

            IResultInfo result = new ResultInfo();
            metaModel.LicenseeId = SessionServiceInstance.LicenseeSession.LicenseeId;

            ValidateGroupCommRequest(metaModel, result);

            if (result.IsSuccessful)
            {
                result = await UpdateGroupComm(metaModel);
            }

            ViewBag.Result = result;
            return View("~/Views/Desktop/Customer/CustomerComm/UpdateGroup.cshtml", metaModel);
        }

        #endregion Update group

        #region Delete group

        [HttpPost]
        [CustomValidateAntiForgery]
        [FunctionUMFilter(FunctionUMType.Commission)]
        public async Task<JsonResult> Delete(int groupId, bool isRemovePlayerComm, bool isResetDefault)
        {
            var licenseeId = SessionServiceInstance.LicenseeSession.LicenseeId;
            var userSession = SessionServiceInstance.UserSession;
            var productAccess = _productService.GetProductAccess(licenseeId, userSession.Language);

            var result = await _groupComService.DeleteGroupAsync(
                new DeleteGroupMetaModel
                {
                    GroupId = groupId,
                    LicenseeId = licenseeId,
                    UserId = userSession.UserId,
                    UserName = userSession.UserName,
                    Ip = Request.UserHostAddress,
                    Language = userSession.Language,
                    IsRemoveCommSetting = isRemovePlayerComm,
                    IsAllowedCSComm = productAccess.IsAllowCS,
                    IsResetDefault = isResetDefault
                }).ConfigureAwait(false);

            if (result.Code == 0)
            {
                result.Message = isRemovePlayerComm ? ViewResources.CommIsClear : ViewResources.CommIsUnChange;
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        #endregion Delete group

        #region Group Comm API

        [HttpGet]
        public async Task<JsonResult> GetDefaultGroup()
        {
            var productAccess = _productService.GetProductAccess(SessionServiceInstance.LicenseeSession.LicenseeId, SessionServiceInstance.UserSession.Language);
            var productPermissions = CommissionGroupHelper.GetProductPermissions(supportedProducts, productAccess);
            var groupList = await _groupComService.GetAllAsync(SessionServiceInstance.LicenseeSession.LicenseeId, productPermissions).ConfigureAwait(false);
            var defaultGroupId = groupList.FirstOrDefault(x => x.IsDefaultGroup)?.GroupCommId ?? 0;

            return Json(new { id = defaultGroupId }, JsonRequestBehavior.AllowGet);
        }

        #endregion Group Comm API

        #region Export Excel

        [HttpPost]
        [CustomValidateAntiForgery]
        public async Task<ActionResult> ExportExcel()
        {
            const string FileName = "CustomerCommGroup";
            var templatePath = HostingEnvironment.MapPath(@"~/App_Data/Template/CustomerGroup/CustomerCommGroup.xls");

            var licenseeId = SessionServiceInstance.LicenseeSession.LicenseeId;
            var productAccess = _productService.GetProductAccess(licenseeId, SessionServiceInstance.UserSession.Language);
            var mainTable = await _groupComService.GetDataForExcelAsync(licenseeId);
            var permissions = CommissionGroupHelper.GetProductPermissions(supportedProducts, productAccess);
            var viewModel = new CommissionGroupListViewModel(null, permissions);
            var excel = CreateExcel(templatePath, mainTable, viewModel);

            excel.Export();

            return new ExcelResult(excel.Workbook, FileName);
        }

        protected internal virtual CustomerCommGroupExcel CreateExcel(
            string templatePath, DataTable mainTable, CommissionGroupListViewModel viewModel)
        {
            return new CustomerCommGroupExcel(templatePath, mainTable, viewModel);
        }

        #endregion Export Excel

        #region Utility

        private static void UpdateErrorResult(IResultInfo result, int errorCode)
        {
            switch (errorCode)
            {
                case InvalidGroupName:
                    result.Code = InvalidGroupName;
                    result.Message = ViewResources.ChooseGroupNameMsg;
                    break;

                case InvalidCommvalue:
                    result.Code = InvalidCommvalue;
                    result.Message = ViewResources.MessageInvalidCommValue;
                    break;

                default:
                    result.Code = InvalidParams;
                    result.Message = ViewResources.InvalidParams;
                    break;
            }
        }

        private async Task CreateMetaModel(GroupCommMetaModel metaModel)
        {
            var licenseeId = SessionServiceInstance.LicenseeSession.LicenseeId;
            var productAccess = _productService.GetProductAccess(licenseeId, SessionServiceInstance.UserSession.Language);
            metaModel.ProductPermissions = CommissionGroupHelper.GetProductPermissions(supportedProducts, productAccess);

            var groupList = await _groupComService.GetAllAsync(licenseeId, metaModel.ProductPermissions).ConfigureAwait(false);
            var defaultGroupId = groupList.FirstOrDefault(x => x.IsDefaultGroup)?.GroupCommId ?? 0;

            metaModel.LicenseeId = licenseeId;
            metaModel.DefaultGroupId = defaultGroupId;
            metaModel.OriginalGroupName = metaModel.GroupName;
        }

        private async Task<IResultInfo> UpdateGroupComm(GroupCommMetaModel metaModel)
        {
            var userSession = SessionServiceInstance.UserSession;

            var currentGroup = _groupComService.GetById(metaModel.GroupCommId, metaModel.LicenseeId, metaModel.ProductPermissions);
            if (currentGroup == null || CustomerComGroupHelper.IsSameGroup(currentGroup, metaModel))
            {
                return new ResultInfo
                {
                    Message = ViewResources.MessageSuccess
                };
            }

            var request = new Request
            {
                Language = userSession.Language,
                Ip = Request.UserHostAddress
            };

            var result = await _groupComService.UpdateGroupAsync(metaModel, request, userSession, metaModel.ProductPermissions);
            if (string.IsNullOrWhiteSpace(result.Message))
            {
                result.Message = CustomerComGroupHelper.GetUpdateGroupErrorMessage(result.Code);
            }

            if (result.IsSuccessful)
            {
                result.Message = ViewResources.MessageSuccess;
                CustomerComGroupHelper.UpdateMetaModelAfterProcessSuccessfully(metaModel);
            }

            return result;
        }

        private void ValidateGroupCommRequest(GroupCommMetaModel metaModel, IResultInfo result)
        {
            (bool isUM, string timeFrom, string timeTo) = _functionUMService.GetUnderMaintenanceInfo(FunctionUMType.Commission);
            if (isUM)
            {
                result.Code = FunctionUMHelper.UMCode;
                result.Message = FunctionUMHelper.BuildUMMessage(timeFrom, timeTo);
                return;
            }

            if (!ModelState.IsValid)
            {
                result.Code = InvalidParams;

                var errors = ModelState.Values.FirstOrDefault(v => v.Errors.Count > 0)?.Errors;
                result.Message = errors?.FirstOrDefault()?.ErrorMessage ?? ViewResources.InvalidParams;
                return;
            }

            if (metaModel.GroupName.Trim().Equals("none", StringComparison.OrdinalIgnoreCase))
            {
                UpdateErrorResult(result, InvalidGroupName);
                return;
            }

            if (!CustomerComGroupHelper.IsValidCommissions(metaModel))
            {
                UpdateErrorResult(result, InvalidCommvalue);
            }
        }

        #endregion Utility
    }
}