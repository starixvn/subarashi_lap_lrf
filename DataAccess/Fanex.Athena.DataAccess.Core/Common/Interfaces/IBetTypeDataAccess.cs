namespace Fanex.Athena.DataAccess.Core.Common.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.Athena.Model.Core.DTO.Common;

    public interface IBetTypeDataAccess
    {
        Task<IList<(string ProductPrefix, int BetTypeId)>> GetBettypes(string xmlSportList);

        Task<IList<CheckedItem>> GetBettypesByProduct(int licenseeId, string productCode, string languageCode, bool isHideSaba);

        Task<IEnumerable<(string ProductCode, int BetType)>> GetBetTypeForProducts(int licenseeId, string productCodes);
    }
}