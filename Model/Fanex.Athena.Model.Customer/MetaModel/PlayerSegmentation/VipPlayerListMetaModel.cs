namespace Fanex.Athena.Model.Customer.MetaModel
{
    public class VipPlayerListMetaModel : BasePlayerListMetaModel
    {
        private const int NumberOfVIPOptions = 2;

        public byte VipOption { get; set; }

        public override bool IsValid => VipOption >= 0 && VipOption <= NumberOfVIPOptions;
    }
}