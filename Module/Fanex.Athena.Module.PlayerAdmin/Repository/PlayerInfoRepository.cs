namespace Fanex.Athena.Module.PlayerAdmin.Repository
{
    using System.Threading.Tasks;
    using Fanex.Athena.DataAccess.Core;
    using Fanex.Athena.Module.PlayerAdmin.DTO;
    using Fanex.Athena.Module.PlayerAdmin.Repository.Interfaces;

    public class PlayerInfoRepository: BaseDataAccess, IPlayerInfoRepository
    {
        public async Task<PlayerInfo> GetPlayerInfoAsync(int custId)
        {
            using (var db = this.GetObjectDb("Lrf_PlayerAdmin_GetPlayerInfo"))
            {
                db.SetParameterValue("custid", custId);

                return await db.QueryEntityAsync<PlayerInfo>();
            }
        }
    }
}
