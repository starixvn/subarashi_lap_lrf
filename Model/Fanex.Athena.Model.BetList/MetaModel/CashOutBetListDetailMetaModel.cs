using Fanex.Athena.Model.Core.Helper;
using Fanex.Athena.Model.Core.MetaModel;
using System.Collections.Generic;

namespace Fanex.Athena.Model.BetList.MetaModel
{
    public class CashOutBetListDetailMetaModel : IMetaModelValidation
    {
        public string BaseCurrency { get; set; }

        public long TransId { get; set; }

        public long RefNo { get; set; }

        public int BetType { get; set; }

        public long BetdaqId { get; set; }

        public string AgentListXml { get; set; }

        public bool IsCashOut { get; set; }

        public bool HasPlayerComm { get; set; }

        public bool IsValid => MetaModelValidationHelper.ValidateBaseCurrency(BaseCurrency);
    }
}