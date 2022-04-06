namespace Fanex.Athena.Controllers
{
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Auth.MetaModel;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Web.ActionFilter;
    using ONEbook.UM.Services;

    using Resources;

    using System;
    using System.Collections.Generic;
    using System.Drawing;
    using System.Drawing.Imaging;
    using System.Globalization;
    using System.IO;
    using System.Text;
    using System.Text.RegularExpressions;
    using System.Threading.Tasks;
    using System.Web;
    using System.Web.Caching;
    using System.Web.Mvc;
    using System.Web.Security;
    using System.Web.UI;

    public class AuthorizationController : CultureBaseController
    {
        private const int InvalidCaptchaError = 101;
        private const int InvalidUserNameError = 102;
        private const int InvalidPasswordError = 103;

        private readonly IUserService _userService;
        private readonly IInternalAuthService _authService;
        private readonly IMaintenanceService _maintenanceService;

        public AuthorizationController(
            IMaintenanceService maintenanceService,
            IUserService userService,
            IInternalAuthService authService
            )
        {
            _maintenanceService = maintenanceService;
            _userService = userService;
            _authService = authService;
        }

        [UMFilter]
        [AllowAnonymous]
        [HttpGet]
        [OutputCache(NoStore = true, Location = OutputCacheLocation.None, Duration = 0, VaryByParam = "*")]
        public ActionResult SignIn()
        {
            var requestHost = Request.Url.AbsoluteUri;

            var isInternalDomain = requestHost.Contains(AppSettingInstance.GetValue("InternalSubDomain"));

            if (!isInternalDomain)
            {
                return RedirectToAction("LocationRestriction", "Utility");
            }

            SetErrorForView(0, string.Empty);
            ViewBag.LogInToken = CreateToken();
            return View("~/Views/Desktop/Authorization/SignIn.cshtml");
        }

        [UMFilter]
        [AllowAnonymous]
        [HandleAntiForgeryError]
        [HttpPost]
        [CustomValidateAntiForgery]
        [OutputCache(NoStore = true, Location = OutputCacheLocation.None, Duration = 0, VaryByParam = "*")]
        public async Task<ActionResult> SignIn(LoginMetalModel model)
        {
            if (string.IsNullOrEmpty(model.UserName))
            {
                SetErrorForView(InvalidUserNameError, ViewResources.AlertUserNameMsg);
            }
            else if (string.IsNullOrEmpty(model.PassWord))
            {
                SetErrorForView(InvalidPasswordError, ViewResources.AlertPasswordEmptyMsg);
            }
            else if (!IsValidCaptcha(model.Captcha))
            {
                SessionServiceInstance.CaptchaCode = CreateRandomCaptchaCode();
                SetErrorForView(InvalidCaptchaError, ViewResources.InvalidCaptchaMsg);
            }
            else
            {
                var oauthInfo = await _authService.RequestOAuthInfoAsync(model, Request.UserHostAddress, Session.SessionID);

                if (!oauthInfo.IsError)
                {
                    _authService.SignIn(oauthInfo);

                    if (oauthInfo.IsAdministrator)
                    {
                        return RedirectToAction("Index", "LicenseeList");
                    }
                    else
                    {
                        FormsAuthentication.RedirectFromLoginPage(oauthInfo.IdentityName, false);
                    }
                }
                else
                {
                    SetErrorForView(1, oauthInfo.ErrorMsg);
                }
            }

            ViewBag.LogInToken = CreateToken();
            return View("~/Views/Desktop/Authorization/SignIn.cshtml");
        }

        [HttpGet]
        [AllowAnonymous]
        [OutputCache(NoStore = true, Duration = 0, Location = OutputCacheLocation.None, VaryByParam = "*")]
        public async Task<ActionResult> RecheckIn()
        {
            if (_maintenanceService.IsUnderMaintenance())
            {
                var time = _maintenanceService.GetUnderMaintenanceTime();
                var message = string.Format(ViewResources.UndermaintenanceMsg, time.From, time.To);
                return Json(RecheckInResult(ErrorType.UnderMaintenance, message), JsonRequestBehavior.AllowGet);
            }

            var userSession = SessionServiceInstance.UserSession;
            var currentLoginId = Request["onid"];
            if (!Request.IsAuthenticated || string.IsNullOrEmpty(currentLoginId) || userSession == null)
            {
                return Json(RecheckInResult(ErrorType.AccessDenied, ViewResources.InvalidRequestOrNotAuthorizedMsg), JsonRequestBehavior.AllowGet);
            }

            if (currentLoginId != userSession.OnUserId.ToString() 
                || !string.Equals(User.Identity.Name, userSession.IdentityName, StringComparison.InvariantCultureIgnoreCase))
            {
                return Json(RecheckInResult(ErrorType.SessionOverride, ViewResources.SessionLoggedMsg), JsonRequestBehavior.AllowGet);
            }

            var errorCode = ErrorType.Success;

            var isKickout = _userService.RecheckIn(userSession.OnUserId);
            var errorMsg = string.Empty;
            if (isKickout)
            {
                errorCode = ErrorType.KickedOut;
                errorMsg = ViewResources.SessionLoggedMsg;
            }
            else if(userSession.AccessTokenLifeTime <= DateTime.Now)
            {
                var (newAccessToken, lifeTime) = await _authService.RequestAccessTokenAsync(userSession.RefreshToken);
                if (!string.IsNullOrEmpty(newAccessToken) && lifeTime.HasValue)
                {
                    userSession.AccessToken = newAccessToken;
                    userSession.AccessTokenLifeTime = lifeTime.Value;
                    SessionServiceInstance.AssignUserSession(userSession);
                    return Json(RecheckInResult(errorCode, errorMsg, newAccessToken), JsonRequestBehavior.AllowGet);
                }
                return Json(RecheckInResult(ErrorType.AccessTokenInvalid, ViewResources.TokenWasExpired), JsonRequestBehavior.AllowGet);
            }
            else
            {
                //no thing
            }

            return Json(RecheckInResult(errorCode, errorMsg), JsonRequestBehavior.AllowGet);
        }

        [AllowAnonymous]
        public FileContentResult Captcha()
        {
            Response.Cache.SetCacheability(HttpCacheability.NoCache);
            Response.Cache.SetExpires(Cache.NoAbsoluteExpiration);
            Response.Cache.SetLastModifiedFromFileDependencies();

            var code = CreateRandomCaptchaCode();

            SessionServiceInstance.CaptchaCode = code;

            var img = CreateCaptcha(code);

            return File(img.FileContents, img.ContentType);
        }

        [HttpGet]
        [AllowAnonymous]
        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public string GetUserSalt(string userName)
        {
            var user = _userService.GetByUsername(userName, false);
            if (user != null)
            {
                return user.UserSalt;
            }

            return string.Empty;
        }

        [HttpGet]
        [AllowAnonymous]
        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public async Task<ActionResult> SignOut()
        {
            await _authService.SignOut(Response, Request);
            return RedirectToAction("LocationRestriction", "Utility");
        }

        [HttpGet]
        [AllowAnonymous]
        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public async Task<ActionResult> InternalSignOut()
        {
            await _authService.SignOut(Response, Request);
            return RedirectToAction("OneTokenRestriction", "Utility", new { Code = OneAuthorizationErrorCode.TokenWasExpired });
        }

        /// <summary>
        /// The changing password page.
        /// </summary>
        /// <returns>The changing password form.</returns>
        [HttpGet]
        public ActionResult ChangePassword()
        {
            ViewBag.PageData = new Dictionary<string, string>
            {
            { "alertInputOldPwd", ViewResources.AlertInputOldPwdMsg },
            { "alertPasswordEmpty", ViewResources.AlertPasswordEmptyMsg },
            { "alertErrorConfirm", ViewResources.PasswordConfirmErrorMsg },
            { "alertPasswordRequire", ViewResources.PasswordNoteMsg },
            { "alertPasswordSucc", ViewResources.PasswordChangedMsg }
            };
            return View("~/Views/Authorization/ChangePass.cshtml");
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public ActionResult ChangePassword(string oldPassword, string newPassword)
        {
            if (string.IsNullOrEmpty(oldPassword) || !Util.IsPasswordValid(newPassword))
            {
                return Json(new
                {
                    errCode = ErrorType.Unknown,
                    errMsg = ViewResources.PasswordNoteMsg
                });
            }

            var userSession = SessionServiceInstance.UserSession;
            if (userSession.IsInternal)
            {
                return Json(new
                {
                    errCode = ErrorType.AccessDenied,
                    errMsg = ViewResources.AccessDeniedMsg
                });
            }
            else
            {
                var result = _userService.ChangePassword(
                    userSession.UserName,
                    oldPassword,
                    newPassword,
                    Request.UserHostAddress);
                return Json(new
                {
                    errCode = result.Code,
                    errMsg = result.Message
                });
            }
        }

        private static dynamic RecheckInResult(ErrorType type, string msg, string accessToken = null)
        {
            return new
            {
                ErrCode = (int)type,
                ErrMsg = msg,
                AccessToken = accessToken
            };
        }

        private static string CreateToken()
        {
            return Guid.NewGuid().ToString("N", CultureInfo.CurrentCulture);
        }

        private static string CreateRandomCaptchaCode()
        {
            const int CapchaLength = 4;
            const int MaxValueOfCharacter = 9;
            var randomNumber = new StringBuilder();
            for (var i = 0; i < CapchaLength; i++)
            {
                randomNumber.Append(RandomNumber.GenerateRandomInt32(0, MaxValueOfCharacter));
            }

            return randomNumber.ToString();
        }

        private bool IsValidCaptcha(string inputCaptcha)
        {
            var isAllowAutomationCaptchaCode = AppSettingInstance.GetValue("AllowAutomationCaptchaCode") == "1";
            if (isAllowAutomationCaptchaCode ||
                inputCaptcha == SessionServiceInstance.CaptchaCode ||
                IsValidSecretCaptcha(inputCaptcha))
            {
                return true;
            }

            return false;
        }

        private bool IsValidSecretCaptcha(string inputCaptcha)
        {
            var secretCaptcha = AppSettingInstance.GetValue("SecretCaptcha");
            return !string.IsNullOrWhiteSpace(secretCaptcha) && inputCaptcha == secretCaptcha &&
                 Regex.IsMatch(Request.UserHostAddress, AppSettingInstance.GetValue("CompanyIP"));
        }

        private void SetErrorForView(int errorCode, string errorMsg)
        {
            ViewBag.errCode = errorCode;
            ViewBag.errMsg = errorMsg;
        }

        private FileContentResult CreateCaptcha(string code, int height = 25)
        {
            const int CharacterWidth = 12;
            const int MinPointX = 2;

            var brushColor = Color.Black;
            var backgroundColor = Color.LightGray;

            var iwidth = (code.Length * CharacterWidth) + 10;
            using (var mem = new MemoryStream())
            using (var bmp = new Bitmap(iwidth, height))
            using (var gfx = Graphics.FromImage((Image)bmp))
            {
                var random = new Random();

                var fonts = new[] { "Tahoma", "Arial" };

                var f = new Font(fonts[random.Next(0, fonts.Length - 1)], 11, FontStyle.Bold);
                Brush b = new SolidBrush(brushColor);
                gfx.Clear(backgroundColor);

                gfx.DrawString(code, f, b, random.Next(MinPointX, CharacterWidth), random.Next(-1, 1));

                const int NoisePoint = 50;

                for (int i = 0; i < NoisePoint; i++)
                {
                    int x = random.Next(iwidth);
                    int y = random.Next(height);
                    bmp.SetPixel(x, y, Color.FromArgb(random.Next()));
                }

                bmp.Save(mem, ImageFormat.Png);
                return this.File(mem.GetBuffer(), "image/png");
            }
        }
    }
}