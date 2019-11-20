// -----------------------------------------------------------------------
// <copyright file="AccountController.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.Account
{
    using System.Web.Mvc;

    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Auth.Enum;

    using Model.Core.DTO.Common;

    using ONEbook.UM.Filters;

    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    using Web.ActionFilter;

    [CheckUMFilter]
    [FunctionAuthorization(PermissionKeys.AccountManageAccount)]
    [AuthorizeRestriction(AppMode.Self)]
    public class AccountBaseController : CultureBaseController
    {
        protected JsonResult JsonErrorResult(string message)
        {
            return Json(new ResultInfo
            {
                Code = -1,
                Message = message
            });
        }

        protected int GetUserId()
        {
            int.TryParse(Request.Params["UserId"], out int userId);
            return userId;
        }
    }
}