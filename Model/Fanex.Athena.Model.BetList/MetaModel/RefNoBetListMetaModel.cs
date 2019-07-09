using Fanex.Athena.Model.Core.Helper;
using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Model.BetList.MetaModel
{
    public class RefNoBetListMetaModel : BaseBettingTicketMetaModel, IMetaModelValidation
    {
        public long RefNo { get; set; }

        public override bool IsValid => RefNo > 0 && MetaModelValidationHelper.ValidateBaseCurrency(BaseCurrency);
    }
}