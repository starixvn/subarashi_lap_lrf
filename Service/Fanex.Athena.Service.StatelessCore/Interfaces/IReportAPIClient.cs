namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    using System.IO;
    using System.Net.Http;
    using System.Threading.Tasks;

    public interface IReportAPIClient
    {
        Task<T> PostAsync<T>(string path, object value, string language);

        Task<HttpResponseMessage> PostFileAsync(string path, object value, string fileName, string language);

        Task<Stream> PostAsyncStream(string path, object value, string language);
    }
}