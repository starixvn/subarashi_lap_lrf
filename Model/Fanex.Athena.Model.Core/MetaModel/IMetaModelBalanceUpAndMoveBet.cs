using System;

namespace Fanex.Athena.Model.Core.MetaModel
{
    public interface IMetaModelBalanceUpAndMoveBet
    {
        DateTime MoveBetsDay { get; set; }

        DateTime BalanceUpDay { get; set; }
    }
}