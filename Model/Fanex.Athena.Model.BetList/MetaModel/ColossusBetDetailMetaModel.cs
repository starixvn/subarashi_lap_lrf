using Fanex.Athena.Model.Core.Helper;
using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Model.BetList.MetaModel
{
    public class ColossusBetDetailMetaModel : IMetaModelValidation
    {
        public int UserId { get; set; }

        public int CustId { get; set; }

        public long RefNo { get; set; }

        public string BaseCurrency { get; set; }

        public long BetCheck { get; set; }

        public string AgentListXml { get; set; }

        public bool IsValid => CustId > 0 && MetaModelHelper
            .ValidateBaseCurrency(BaseCurrency);
    }
}