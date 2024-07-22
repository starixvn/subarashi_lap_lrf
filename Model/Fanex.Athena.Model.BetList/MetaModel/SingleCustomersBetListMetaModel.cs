using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Model.BetList.MetaModel
{
    public class SingleCustomersBetListMetaModel : BaseBettingTicketMetaModel, IMetaModelValidation
    {
        public string Platform { get; set; }

        public string LiveStatus { get; set; }

        public string SportIds { get; set; }

        public string BetTypeIds { get; set; }

        public string SportListXML { get; set; }

        public override bool IsValid => base.IsValid && !string.IsNullOrWhiteSpace(UserName);
    }
}