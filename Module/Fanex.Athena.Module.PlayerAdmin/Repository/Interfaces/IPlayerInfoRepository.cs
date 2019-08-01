namespace Fanex.Athena.Module.PlayerAdmin.Repository.Interfaces
{
    using System.Threading.Tasks;
    using Fanex.Athena.Module.PlayerAdmin.DTO;

    public interface IPlayerInfoRepository
    {
        Task<PlayerInfo> GetPlayerInfoAsync(int custId);
    }
}
