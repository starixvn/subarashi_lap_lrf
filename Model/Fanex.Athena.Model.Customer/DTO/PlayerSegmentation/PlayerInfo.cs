using System.Collections.Generic;
using Newtonsoft.Json;

namespace Fanex.Athena.Model.Customer.DTO.PlayerSegmentation
{
    public class PlayerInfo
    {
        public int CustId { get; set; }
        public string ExternalId { get; set; }
        public string SystemId { get; set; }

        [JsonIgnore]
        public int AgentId { get; set; }

        public string Subsidiary { get; set; }
        public string CustomerClass { get; set; }

        [JsonIgnore]
        public string Reason { get; set; }

        public IEnumerable<string> ReasonList => string.IsNullOrEmpty(Reason) ? new string[] { } : Reason.Trim().Split('#');

        public string MarkDate { get; set; }
        public bool IsVip { get; set; }
        public bool IsBA { get; set; }
    }
}
