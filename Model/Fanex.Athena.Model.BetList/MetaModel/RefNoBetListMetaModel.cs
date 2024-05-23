using Fanex.Athena.Model.Core.Helper;
using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Model.BetList.MetaModel
{
    public class RefNoBetListMetaModel : BaseBettingTicketMetaModel, IMetaModelValidation
    {
        public string RefNo { get; set; }

        public string TxId { get; set; }

        public bool ViewSabaCoins { get; set; }

        public override bool IsValid => (!string.IsNullOrEmpty(RefNo) || !string.IsNullOrEmpty(TxId)) && MetaModelHelper.ValidateBaseCurrency(BaseCurrency);
    }
}