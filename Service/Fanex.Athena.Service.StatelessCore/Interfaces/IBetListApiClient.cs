using System.IO;
using System.Net.Http;
using System.Threading.Tasks;

namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    public interface IBetListApiClient
    {
        Task<HttpResponseMessage> PostAsync(string path, object value, string language);

        Task<T> PostAsync<T>(string path, object value, string language) where T : class;

        Task<MemoryStream> PostAsyncStream(string path, object value, string language);

        Task<string> PostStringAsync(string path, object value, string language);
    }
}