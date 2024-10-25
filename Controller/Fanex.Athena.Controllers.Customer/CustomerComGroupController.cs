namespace Fanex.Athena.Controllers.Customer
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Threading.Tasks;
    using System.Web.Hosting;
    using System.Web.Mvc;
    using System.Web.SessionState;
    using Fanex.Athena.Excel.Customer;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Extension.Utility.Interfaces;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.DTO.Configuration;
    using Fanex.Athena.Model.Core.Enum;
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
        private readonly ICustomMemoryCacheService _cacheService;

        public CustomerComGroupController(
            IGroupComService groupComService,
            IProductService productService,
            IFunctionUMService functionUMService,
            ICustomMemoryCacheService cacheService)
        {
            _groupComService = groupComService;
            _productService = productService;
            _functionUMService = functionUMService;
            _cacheService = cacheService;
        }

        #region Get data

        [HttpGet]
        public async Task<ActionResult> Index()
        {
            var licenseeId = SessionServiceInstance.LicenseeSession.LicenseeId;
            var productAccess = _productService.GetProductAccess(licenseeId, SessionServiceInstance.UserSession.Language);

            var (groups, productList) = await _groupComService.GetAllAsync(licenseeId, productAccess).ConfigureAwait(false);

            var model = new CommissionGroupListViewModel(groups, productList);

            return View("~/Views/Desktop/Customer/CustomerComm/GroupCommList.cshtml", model);
        }

        #endregion Get data

        #region Create group

        [HttpGet]
        public async Task<ActionResult> Create()
        {
            var licenseeId = SessionServiceInstance.LicenseeSession.LicenseeId;

            var cacheKey = $"{CacheKey.MemorycacheCommSettingsByLicensee}_{licenseeId}";
            var commSettings = _cacheService.Get<IEnumerable<GroupCommSettingMetaModel>>(cacheKey);

            if (commSettings == null)
            {
                var productAccess = _productService.GetProductAccess(licenseeId, SessionServiceInstance.UserSession.Language);
                commSettings = await _groupComService.InitCommValues(productAccess);
                _cacheService.Set(cacheKey, commSettings);
            }

            var model = new GroupCommMetaModel
            {
                CommValues = commSettings
            };

            await CreateMetaModel(model);

            return View("~/Views/Desktop/Customer/CustomerComm/CreateNewGroup.cshtml", model);
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        public async Task<ActionResult> Create(GroupCommMetaModel metaModel)
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            metaModel.LicenseeId = licenseeSession.LicenseeId;

            var userSession = SessionServiceInstance.UserSession;
            IResultInfo result = new ResultInfo();
            ValidateGroupCommRequest(metaModel, result);

            if (result.IsSuccessful)
            {
                var request = new Request
                {
                    Language = userSession.Language,
                    Ip = ClientHelper.GetClientIp(Request)
                };

                result = await _groupComService.InsertGroupAsync(metaModel, request, userSession.UserId);
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
            var licenseeId = SessionServiceInstance.LicenseeSession.LicenseeId;
            var productAccess = _productService.GetProductAccess(licenseeId, SessionServiceInstance.UserSession.Language);
            var model = await _groupComService.GetById(groupId, licenseeId, productAccess);

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
                    Ip = ClientHelper.GetClientIp(Request),
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
            var (groupList, _) = await _groupComService.GetAllAsync(SessionServiceInstance.LicenseeSession.LicenseeId, productAccess).ConfigureAwait(false);
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
            var productAccess = _productService.GetProductAccess(SessionServiceInstance.LicenseeSession.LicenseeId, SessionServiceInstance.UserSession.Language);

            var licenseeId = SessionServiceInstance.LicenseeSession.LicenseeId;
            var (groups, productList) = await _groupComService.GetAllAsync(licenseeId, productAccess).ConfigureAwait(false);

            var model = new CommissionGroupListViewModel(groups, productList);

            var excel = CreateExcel(templatePath, model);

            excel.Export();

            return new ExcelResult(excel.Workbook, FileName);
        }

        protected internal virtual CustomerCommGroupExcel CreateExcel(
            string templatePath, CommissionGroupListViewModel viewModel)
        {
            return new CustomerCommGroupExcel(templatePath, viewModel);
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

            var (groupList, _) = await _groupComService.GetAllAsync(licenseeId, productAccess).ConfigureAwait(false);
            var defaultGroupId = groupList.FirstOrDefault(x => x.IsDefaultGroup)?.GroupCommId ?? 0;

            metaModel.LicenseeId = licenseeId;
            metaModel.DefaultGroupId = defaultGroupId;
            metaModel.OriginalGroupName = metaModel.GroupName;
        }

        private async Task<IResultInfo> UpdateGroupComm(GroupCommMetaModel metaModel)
        {
            var userSession = SessionServiceInstance.UserSession;
            var productAccess = _productService.GetProductAccess(metaModel.LicenseeId, SessionServiceInstance.UserSession.Language);

            var currentGroup = await _groupComService.GetById(metaModel.GroupCommId, metaModel.LicenseeId, productAccess).ConfigureAwait(false);
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
                Ip = ClientHelper.GetClientIp(Request)
            };

            var result = await _groupComService.UpdateGroupAsync(metaModel, request, userSession).ConfigureAwait(false);

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