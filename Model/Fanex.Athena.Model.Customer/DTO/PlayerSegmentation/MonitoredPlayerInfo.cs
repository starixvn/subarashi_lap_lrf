using System;
using System.Globalization;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.DTO.Common;
using Newtonsoft.Json;

namespace Fanex.Athena.Model.Customer.DTO.PlayerSegmentation
{
    public class MonitoredPlayerInfo : ISubsidiaryInfo, ICurrencyInfo
    {
        public int CustId { get; set; }

        public string ExternalId { get; set; }

        public string SystemId { get; set; }

        [JsonIgnore]
        public int AgentId { get; set; }

        public string Subsidiary { get; set; }

        [JsonIgnore]
        public int CurrencyId { get; set; }

        public string Currency { get; set; }

        public decimal CurrentWinningThreshold { get; set; }

        public int? NoOfReached { get; set; }

        [JsonIgnore]
        public DateTime? LastReachedDate { get; set; }

        public string LastReachedDateDisplay => LastReachedDate?.ToString(FormatKey.DateTimeFormatIn24H, CultureInfo.InvariantCulture);

        public bool ProblemPlayer { get; set; }

        public bool VipPlayer { get; set; }
    }
}