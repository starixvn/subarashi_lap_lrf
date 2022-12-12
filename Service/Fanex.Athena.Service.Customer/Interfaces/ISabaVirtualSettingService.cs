namespace Fanex.Athena.Service.Customer.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.Athena.Model.Customer.DTO;
    using Fanex.Athena.Model.Customer.MetaModel;

    public interface ISabaVirtualSettingService
    {
        Task<IEnumerable<SabaVirtualSettingInformationModel>> GetSabaVirtualSetting(SabaVirtuaSettingInformationMetaModel metaModel);
    }
}