namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    using System.Net.Http;
    using System.Threading.Tasks;

    public interface IReportAPIClient
    {
        Task<HttpResponseMessage> PostAsync(string path, object value, string language);
    }
}
