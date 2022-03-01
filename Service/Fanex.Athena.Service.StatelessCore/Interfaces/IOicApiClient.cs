namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    using System.Threading.Tasks;

    public interface IOicApiClient
    {
        Task<string> PostStringAsync(string path, object value, string language, int timeOut = 100);
    }
}