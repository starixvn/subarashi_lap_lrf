namespace Fanex.Athena.Module.PlayerAdmin.MetaModel
{
    using Fanex.Athena.Model.Core.MetaModel;

    public class PlayerBetLimitProductStatusUpdateMetaModel :
        IMetalModelCustomerIdentity, IMetaModelProduct, IMetaModelValidation, IMetaModelUserId, IMetaModelSiteName
        , IMetaModelIp, IMetaModelLanguage
    {
        public int CustId { get; set; }

        public string SiteName { get; set; }

        public int UserId { get; set; }

        public int CurrencyId { get; set; }

        public string Ip { get; set; }

        public string Language { get; set; }

        public int ProductId { get; set; }

        public int LicenseeCustId { get; set; }

        public bool Status { get; set; }

        public bool OldStatus { get; set; }

        public bool IsValid => true;
    }
}