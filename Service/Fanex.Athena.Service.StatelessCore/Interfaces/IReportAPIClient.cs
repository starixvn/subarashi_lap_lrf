namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    using System.IO;
    using System.Net.Http;
    using System.Threading.Tasks;
    using Fanex.Athena.Model.Core.DataDomain;

    public interface IReportAPIClient
    {
        Task<string> PostAsyncString(string path, object value, string language);

        Task<T> PostAsync<T>(string path, object value, string language, MediaType mediaType = MediaType.Json);
        Task<byte[]> PostByteContentAsync(string path, object value, string language, MediaType mediaType = MediaType.Json);
    }
}