using System.Collections.Generic;
using System.Linq;
using System.Web;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Service.Core.Users.Interfaces;

namespace Fanex.Athena.Module.PlayerAdmin.MetaModel.PlayerBatchUpdate
{
    public class BasePlayerBatchUpdateQuery
    {
        public string SiteName { get; set; }

        public string CustIds { get; set; }

        public string CustNames { get; set; }

        public int LicenseeId { get; set; }

        public int UserId { get; set; }

        public string IP { get; set; }

        public string Language { get; set; }

        public string Username { get; set; }

        public IDictionary<int, int[]> CurrencyAgentList { get; set; }

        public virtual bool IsValid()
            => !string.IsNullOrWhiteSpace(CustIds) &&
            !CustIds.Split(new[] { ',' }).Any(s => !int.TryParse(s, out _));

        public void AssignSession(ISessionService session, HttpRequestBase request)
        {
            var licenseeSession = session.LicenseeSession;
            var userSession = session.UserSession;

            LicenseeId = licenseeSession.LicenseeId;
            SiteName = licenseeSession.LicenseeName;

            UserId = userSession.UserId;
            IP = request?.UserHostAddress ?? string.Empty;
            Language = userSession.Language;
            Username = userSession.UserName;
            CurrencyAgentList = session.UserSession.CurrencyAgentList;
        }

        public List<CustDTO> CustInfo()
        {
            var result = new List<CustDTO>();
            var ids = CustIds.Split(new[] { ',' });
            var names = CustNames.Split(new[] { ',' });
            for (var i = 0; i < ids.Length; i++)
            {
                var id = ids[i];
                var name = names[i];

                if (!int.TryParse(id, out _))
                {
                    continue;
                }

                result.Add(new CustDTO
                {
                    Id = int.Parse(id),
                    Name = name
                });
            }

            return result;
        }
    }
}
