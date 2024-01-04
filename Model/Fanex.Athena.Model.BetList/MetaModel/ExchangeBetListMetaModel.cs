using System;
using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Model.BetList.MetaModel
{
    public class ExchangeBetListMetaModel : BaseExchangeBetListMetaModel, IMetaModelValidation
    {
        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public byte DateOptionType { get; set; }

        public bool IsViewResettledTicketOnly { get; set; }

        public override bool IsValid => base.IsValid && FromDate <= ToDate;
    }
}