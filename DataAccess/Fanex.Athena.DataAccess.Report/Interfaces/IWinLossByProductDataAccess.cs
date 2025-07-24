// -----------------------------------------------------------------------
// <copyright file="IWinLossByProductDataAccess.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.DataAccess.Report.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Report.MetaModel;
    using Model.Report.ResultModel;

    public interface IWinLossByProductDataAccess
    {
        Task<WinLossByProductResultModel> GetWinlossByProducts(WinLossByProductMetaModel metaModel, IDictionary<int, string> currencyList, ProductAccess productAccess);

        Task<WinLossByProductResultModel> GetWinlossByProductAgents(WinLossByProductMetaModel metaModel, IDictionary<int, string> currencyList, ProductAccess productAccess);

        Task<WinLossByProductResultModel> GetWinlossByProductCustomers(WinLossByProductMetaModel metaModel, IDictionary<int, string> currencyList, ProductAccess productAccess);
    }
}