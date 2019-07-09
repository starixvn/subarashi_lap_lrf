using Fanex.Athena.Model.Core.MetaModel;
using System;

namespace Fanex.Athena.Model.BetList.MetaModel
{
    public class ExchangeBetListMetaModel : BaseExchangeBetListMetaModel, IMetaModelValidation
    {
        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public override bool IsValid => base.IsValid && FromDate <= ToDate;
    }
}