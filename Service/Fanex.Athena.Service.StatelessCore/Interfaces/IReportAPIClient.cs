namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    using System;
    using System.IO;
    using System.Threading.Tasks;
    using Fanex.Athena.Model.Core.DataDomain;

    public interface IReportAPIClient
    {
        Task<string> PostStringAsync(string path, object value, string language, int timeOut = 100);

        Task<Tuple<Stream, string>> PostAsync(string path, object value, string language, MediaType mediaType = MediaType.Json, int timeOut = 100);
    }
}