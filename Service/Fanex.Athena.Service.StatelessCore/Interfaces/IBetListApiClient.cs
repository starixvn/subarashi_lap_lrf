using System.IO;
using System.Net.Http;
using System.Threading.Tasks;

namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    public interface IBetListApiClient
    {
        Task<HttpResponseMessage> PostAsync(string path, object value, string language, int timeOut = 100);

        Task<T> PostAsync<T>(string path, object value, string language) where T : class;

        Task<Stream> PostStreamAsync(string path, object value, string language, int timeOut = 100);

        Task<string> PostStringAsync(string path, object value, string language, int timeOut = 100);
    }
}