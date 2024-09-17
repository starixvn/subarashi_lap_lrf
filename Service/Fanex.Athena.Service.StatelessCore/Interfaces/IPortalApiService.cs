namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Model.Core.DTO.External;

    public interface IPortalApiService
    {
        Task<IEnumerable<int>> GetSpecialLeaguesAsync(string licenseeName);

        Task<IEnumerable<PortalApiLeagueResponse>> GetLimitLeaguesAsync(
            string licenseeName,
            int sportType,
            int leagueGroupId,
            string langCode,
            bool isHideSaba);

        Task<IEnumerable<PortalApiLeagueGroupResponse>> GetLeagueGroupsAsync(int sportType, string langCode, bool isHideSaba);
    }
}