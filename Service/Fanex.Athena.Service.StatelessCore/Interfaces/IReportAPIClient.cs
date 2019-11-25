namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    using System;
    using System.IO;
    using System.Threading.Tasks;
    using Fanex.Athena.Model.Core.DataDomain;

    public interface IReportAPIClient
    {
        Task<string> PostAsyncString(string path, object value, string language);

        Task<Tuple<MemoryStream, string>> PostAsync(string path, object value, string language, MediaType mediaType = MediaType.Json);
    }
}