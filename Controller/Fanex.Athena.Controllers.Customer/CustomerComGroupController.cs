namespace Fanex.Athena.Controllers.Customer
{
    using Fanex.Athena.Excel.Base.Entities;
    using Fanex.Athena.Excel.Customer;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.Service.Customer.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;
    using Fanex.Athena.Web.ResultExtension;

    using Helpers;

    using ONEbook.UM.Filters;

    using Resources;

    using System;
    using System.Data;
    using System.Globalization;
    using System.Linq;
    using System.Net;
    using System.Threading.Tasks;
    using System.Web.Hosting;
    using System.Web.Mvc;
    using System.Web.SessionState;

    [SessionState(SessionStateBehavior.ReadOnly)]
    [CheckUMFilter]
    [FunctionAuthorization(PermissionKeys.CustomerInfoCommissionGroupList)]
    public class CustomerComGroupController : CultureBaseController
    {
        private const int InvalidGroupName = 1;
        private const int InvalidCommvalue = 2;
        private const int InvalidParams = 3;

        private readonly IGroupComService _groupComService;
        private readonly IProductService _productService;

        public CustomerComGroupController(
            IGroupComService groupComService,
            IProductService productService
            )
        {
            _groupComService = groupComService;
            _productService = productService;
        }

        #region Get data

        [HttpGet]
        public async Task<ActionResult> Index()
        {
            var licenseeId = SessionServiceInstance.LicenseeSession.LicenseeId;
            var productAccess = _productService.GetProductAccess(licenseeId, SessionServiceInstance.UserSession.Language);
            var model = await _groupComService.GetAllAsync(licenseeId);
            ViewBag.IsAllowNG = productAccess.IsAllowNG;
            ViewBag.IsAllowCS = productAccess.IsAllowCS;

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
            var userSession = SessionServiceInstance.UserSession;
            IResultInfo result = new ResultInfo();
            metaModel.LicenseeId = licenseeSession.LicenseeId;

            if (ModelState.IsValid)
            {
                if (metaModel.GroupName.Trim().Equals("none", StringComparison.OrdinalIgnoreCase))
                {
                    UpdateErrorResult(result, InvalidGroupName);
                }
                else if (CustomerComGroupHelper.IsValidCommissions(metaModel))
                {
                    var request = new Request
                    {
                        Language = userSession.Language,
                        Ip = Request.UserHostAddress
                    };
                    result = await _groupComService.InsertGroupAsync(metaModel, request, userSession.UserId);

                    result.Message = CustomerComGroupHelper.GetCreateGroupErrorMessage(result.Code);

                    if (result.IsSuccessful)
                    {
                        result.Message = ViewResources.MessageSuccess;
                        CustomerComGroupHelper.UpdateMetaModelAfterProcessSuccessfully(metaModel);
                    }
                }
                else
                {
                    UpdateErrorResult(result, InvalidCommvalue);
                }
            }
            else
            {
                UpdateErrorResult(result, InvalidParams);
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
            var model = _groupComService.GetById(groupId, SessionServiceInstance.LicenseeSession.LicenseeId);
            if (model == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.NotFound);
            }

            await CreateMetaModel(model);

            CustomerComGroupHelper.SetDropDownListComm(model);

            return View("~/Views/Desktop/Customer/CustomerComm/UpdateGroup.cshtml", model);
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        public async Task<ActionResult> Update(GroupCommMetaModel metaModel)
        {
            IResultInfo result = new ResultInfo();
            metaModel.LicenseeId = SessionServiceInstance.LicenseeSession.LicenseeId;

            if (ModelState.IsValid)
            {
                if (metaModel.GroupName.Trim().ToLower(CultureInfo.CurrentCulture).Equals("none"))
                {
                    UpdateErrorResult(result, InvalidGroupName);
                }
                else if (CustomerComGroupHelper.IsValidCommissions(metaModel))
                {
                    result = await UpdateGroupComm(metaModel);
                }
                else
                {
                    UpdateErrorResult(result, InvalidCommvalue);
                }
            }
            else
            {
                UpdateErrorResult(result, InvalidParams);
            }

            ViewBag.Result = result;

            return View("~/Views/Desktop/Customer/CustomerComm/UpdateGroup.cshtml", metaModel);
        }

        #endregion Update group

        #region Delete group

        [HttpPost]
        [CustomValidateAntiForgery]
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
            var groupList = await _groupComService.GetAllAsync(SessionServiceInstance.LicenseeSession.LicenseeId);
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
            var showingOption = new ShowingOption
            {
                SBVisible = productAccess.IsAllowSB,
                NGVisible = productAccess.IsAllowNG,
                CSVisible = productAccess.IsAllowCS,
                ABVisible = productAccess.IsAllowAB
            };

            var mainTable = await _groupComService.GetDataForExcelAsync(licenseeId);

            var excel = CreateExcel(templatePath, mainTable, showingOption);

            excel.Export();

            return new ExcelResult(excel.Workbook, FileName);
        }

        protected internal virtual CustomerCommGroupExcel CreateExcel(string templatePath, DataTable mainTable, ShowingOption showingOption)
        {
            return new CustomerCommGroupExcel(templatePath, mainTable, showingOption);
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
            var groupList = await _groupComService.GetAllAsync(licenseeId);
            var defaultGroupId = groupList.FirstOrDefault(x => x.IsDefaultGroup)?.GroupCommId ?? 0;

            metaModel.LicenseeId = licenseeId;
            metaModel.IsUpdateNG = productAccess.IsAllowNG;
            metaModel.IsUpdateCS = productAccess.IsAllowCS;
            metaModel.DefaultGroupId = defaultGroupId;
            metaModel.OriginalGroupName = metaModel.GroupName;
        }

        private async Task<IResultInfo> UpdateGroupComm(GroupCommMetaModel metaModel)
        {
            var userSession = SessionServiceInstance.UserSession;
            var currentGroup = _groupComService.GetById(metaModel.GroupCommId, metaModel.LicenseeId);
            if (currentGroup != null && !CustomerComGroupHelper.IsSameGroup(currentGroup, metaModel))
            {
                var request = new Request
                {
                    Language = userSession.Language,
                    Ip = Request.UserHostAddress
                };
                var result = await _groupComService.UpdateGroupAsync(metaModel, request, userSession);
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
            else
            {
                return new ResultInfo
                {
                    Message = ViewResources.MessageSuccess
                };
            }
        }

        #endregion Utility
    }
}