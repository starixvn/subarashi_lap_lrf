using System.Collections.Generic;
using System.Threading.Tasks;
using Fanex.Athena.Model.Core.DTO.Common;

namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    public interface ISportService
    {
        Task<IEnumerable<SportGame>> GetSportForProductAsync(string siteName, string productCode);

        Task<IDictionary<int, string>> GetAllSports();

        Task<IEnumerable<SportProductItem>> GetSportsAndProducts(int licenseeId, string languageCode, string productCodes = "");

        Task<IEnumerable<SportProductItem>> GetSportAndProductAndSabaSport(int licenseeId, string languageCode, string productCodes = "", bool isHideSaba = false);

        Task<IEnumerable<CheckedItem>> GetSportsForTreeView(int licenseeId, string languageCode, string productCodes = "", bool isHideSaba = false);

        IEnumerable<SabaSport> GetSabaSports(bool isHideSaba = false);

        SabaSport GetSabaSport(int id, bool isHideSaba = false);
    }
}