namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    using System.IO;
    using System.Net.Http;
    using System.Threading.Tasks;
    using Fanex.Athena.Model.Core.DataDomain;

    public interface IReportAPIClient
    {
        Task<string> PostAsyncString(string path, object value, string language);
        Task<byte[]> PostByteContentAsync(string path, object value, string language, MediaType mediaType = MediaType.Json);
        Task<HttpResponseMessage> PostContentAsync(string path, object value, string language, MediaType mediaType = MediaType.Json);
    }
}