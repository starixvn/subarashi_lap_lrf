// --------------------------------------------------------------------------------------------------------------------
// <copyright file="ISessionService.cs" company="">
// The  session service.
// </copyright>
// <summary>
//   The  session service.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace Fanex.Athena.Service.Core.Users.Interfaces
{
    using System.Collections.Generic;

    using Fanex.Athena.Model.Auth;

    public interface ISessionService
    {
        string CaptchaCode { get; set; }

        LicenseeAuthInfo LicenseeSession { get; }

        UserAuthInfo UserSession { get; }

        void AssignSessions(UserAuthInfo userSession, LicenseeAuthInfo licenseeSession);

        void CreateNewSession(
            int userId,
            int onuserId,
            string userName,
            bool isInternal,
            int licenseeId = 0,
            string language = "en-US");

        void UpdateLiceseeSession(int licenseeId);

        bool UpdateLanguage(string languageCode);

        void AssignCurrenciesToUserSession(UserAuthInfo userSession, int licenseeId, IEnumerable<CurrencyUser> currencyUserList = null);
    }
}