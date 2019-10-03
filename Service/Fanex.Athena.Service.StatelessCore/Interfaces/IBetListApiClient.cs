using System.IO;
using System.Net.Http;
using System.Threading.Tasks;

namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    public interface IBetListApiClient
    {
        Task<HttpResponseMessage> PostAsync(string path, object value, string language, int timeout = 0);

        Task<T> PostAsync<T>(string path, object value, string language, int timeout = 0);

        Task<Stream> PostAsyncStream(string path, object value, string language, int timeout = 0);

        Task<string> PostAsyncString(string path, object value, string language, int timeout = 0);
    }
}