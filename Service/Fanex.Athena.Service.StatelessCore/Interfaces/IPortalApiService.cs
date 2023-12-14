using System.Collections.Generic;
using System.Threading.Tasks;
using Fanex.Athena.Model.Core.DTO.External;

namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    public interface IPortalApiService
    {
        Task<IEnumerable<int>> GetSpecialLeaguesAsync(string licenseeName);

        Task<IEnumerable<PortalApiLeagueResponse>> GetLimitLeaguesAsync(string licenseeName, int sportType, int leagueGroupId, string langCode);

        Task<IEnumerable<PortalApiLeagueGroupResponse>> GetLeagueGroupsAsync(int sportType, string langCode);
    }
}