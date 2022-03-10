using Fanex.Athena.Model.Core.DTO.Common;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    public interface ISportService
    {
        Task<IEnumerable<SportGame>> GetSportForProductAsync(string siteName, string productCode);
        
        Task<IDictionary<int, string>> GetAllSports();

        Task<IEnumerable<SportProductItem>> GetSportsAndProducts(int licenseeId, string languageCode, string productCodes = "", bool includeSabaSport = false);

        IEnumerable<SabaSport> GetSabaSports();

        SabaSport GetSabaSport(int id);
    }
}
