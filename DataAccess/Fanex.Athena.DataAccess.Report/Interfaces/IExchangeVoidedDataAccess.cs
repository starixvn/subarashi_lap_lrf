using System.Threading.Tasks;

namespace Fanex.Athena.DataAccess.Report.Interfaces
{
    public interface IExchangeVoidedDataAccess
    {
        Task<int> GetCustIdAsync(string userName, string agentList);
    }
}