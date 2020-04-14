using Newtonsoft.Json;
using System.Collections.Generic;

namespace Fanex.Athena.Model.Customer.DTO.PlayerSegmentation
{
    public class PlayerInfo
    {
        public int CustId { get; set; }
        public string ExternalId { get; set; }
        public string SystemId { get; set; }
        public decimal? ReducedMaxPerEvent { get; set; }
        public decimal? ReducedMaxPerBet { get; set; }

        [JsonIgnore]
        public string Reason { get; set; }

        public IEnumerable<string> ReasonList => string.IsNullOrEmpty(Reason) ? new string[] { } : Reason.Trim().Split('#');

        public string MarkDate { get; set; }
        public bool IsVip { get; set; }
        public bool IsMarkVoid { get; set; }
    }
}