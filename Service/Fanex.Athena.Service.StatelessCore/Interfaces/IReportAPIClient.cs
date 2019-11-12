namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    using System;
    using System.Threading.Tasks;
    using Fanex.Athena.Model.Core.DataDomain;

    public interface IReportAPIClient
    {
        Task<string> PostAsyncString(string path, object value, string language);

        Task<Tuple<byte[], string>> PostAsync(string path, object value, string language, MediaType mediaType = MediaType.Json);
    }
}