namespace Fanex.Athena.Model.Customer.MetaModel
{
    public class VipPlayerListMetaModel : BasePlayerListMetaModel
    {
        public byte VipOption { get; set; }

        public override bool IsValid => VipOption >= 0 && VipOption <= 2;
    }
}