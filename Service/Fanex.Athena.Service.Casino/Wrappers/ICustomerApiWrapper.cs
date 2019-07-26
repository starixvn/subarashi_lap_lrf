namespace Fanex.Athena.Service.Casino.Wrappers
{
    using System.Data;
    using Fanex.Athena.Model.BetSettings.MetaModel;
    using Fanex.Athena.Model.Casino.MetaModel;
    using Fanex.Athena.Model.Customer.MetaModel;

    public interface ICustomerApiWrapper
    {
        bool UpdateCustEnableCasino(BetSettingCasinoStatusMetaModel metaModel);

        bool UpdateCustSuspend(CustomerStatusMetaModel metaModel);

        bool UpdateCustClosed(CustomerStatusMetaModel metaModel);

        bool UpdateComm(RNGCasinoUpdateMemberComMetaModel metaModel);
    }
}