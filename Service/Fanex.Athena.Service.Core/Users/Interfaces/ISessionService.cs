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
    using System.Threading.Tasks;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Core.DTO.Users;

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

        string GenerateAgentListXml(int currencyId = 0, bool isExcludeTestData = false);

        string GenerateAgentListXml(IEnumerable<int> currencyIdList, bool isExcludeTestData = false);

        string GenerateAgentListXml(IDictionary<int, IEnumerable<int>> currencyAgentList);

        void AssignCurrenciesToUserSession(UserAuthInfo userSession, int licenseeId, IEnumerable<CurrencyUser> currencyUserList = null);
    }
}