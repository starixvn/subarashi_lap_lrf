using System;
using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Module.PlayerAdmin.Api.MetaModel
{
    public class PlayerBettingStatisticsMetaModel : IMetaModelBalanceUpAndMoveBet, IMetalModelCustomerIdentity
    {
        public int CustId { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public DateTime MoveBetsDay { get; set; }

        public DateTime BalanceUpDay { get; set; }

        public int CurrencyId { get; set; }
    }
}