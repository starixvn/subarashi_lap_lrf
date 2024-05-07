using Fanex.Athena.Model.Core.Helper;
using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Model.BetList.MetaModel
{
    public class BookedBetBetListMetaModel : BaseBettingTicketMetaModel, IMetaModelValidation
    {
        public string Platform { get; set; }

        public string SearchText { get; set; }

        public int SearchOption { get; set; }

        public override bool IsValid => FromDate <= ToDate && !string.IsNullOrWhiteSpace(SearchText) && MetaModelHelper.ValidateBaseCurrency(BaseCurrency);
    }
}