using System.Threading.Tasks;

namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    public interface IMoveBetService
    {
        Task<string> GetMoveBetNotificationAsync(string language);
    }
}