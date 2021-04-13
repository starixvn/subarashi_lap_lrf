using System.Collections.Generic;

namespace Fanex.Athena.Module.PlayerAdmin.Api.MetaModel
{
    public class GetSubsidiariesMetaModel
    {
        public byte UserLevel { get; set; }
        public string OperatorId { get; set; }

        public byte ViewType { get; set; }
        public string LicenseeName { get; set; }
        public int? WhiteLabelId { get; set; }

        public IDictionary<int, int[]> CurrencyAgentList { get; set; }
    }
}
