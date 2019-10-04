namespace Fanex.Athena.Module.PlayerAdmin.Api.Repository.Interfaces
{
    public interface IPlayerLogRepository
    {
        void Write(int custId, int userId, int actionId, string content);
    }
}