namespace Fanex.Athena.Module.PlayerAdmin.Api.MetaModel
{
    public class GetSubsidiaryViewTypeMetaModel
    {
        public byte UserLevel { get; set; }
        public byte ViewType { get; set; }
        public int? WhiteLabelID { get; set; }
        public bool HasSubsidiary { get; set; }
    }
}
