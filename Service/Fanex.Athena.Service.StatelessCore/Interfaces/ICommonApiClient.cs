using System.Threading.Tasks;

namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    public interface ICommonApiClient
    {
        Task<T> GetAsync<T>(string path, string languageCode = "en-US", object value = null, int timeOut = 100);
    }
}