using System.Threading.Tasks;
using Fanex.Athena.Model.Report.MetaModel;
using Fanex.Athena.Model.Report.ViewModel;

namespace Fanex.Athena.Service.Report.Interfaces
{
    public interface IExchangeVoidedService
    {
        Task<ExchangeVoidedViewModel> GetData(ExchangeVoidedMetaModel metaModel);
    }
}