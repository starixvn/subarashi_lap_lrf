// -----------------------------------------------------------------------
// <copyright file="IBetTypeService.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Fanex.Athena.Model.Core.DTO.Common;

    public interface IBetTypeService
    {
        Task<IList<BettypeProductItem>> GetBettypes(IList<SportProductItem> sports, string languageCode);

        Task<IList<CheckedItem>> GetBettypesByProduct(int licenseeId, string productCode, string languageCode, bool isHideSaba = false);

        Task<IEnumerable<CheckedItem>> GetBetTypeForProducts(int licenseeId, string lang, string productCodes, bool isHideSaba = false);
    }
}