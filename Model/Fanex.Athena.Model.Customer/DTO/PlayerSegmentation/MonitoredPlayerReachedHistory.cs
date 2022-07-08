using Fanex.Athena.Model.Core.DataDomain;
using Newtonsoft.Json;
using System;
using System.Globalization;

namespace Fanex.Athena.Model.Customer.DTO.PlayerSegmentation
{
    public class MonitoredPlayerReachedHistory
    {
        [JsonIgnore]
        public DateTime ReachedDate { get; set; }

        public string ReachedDateDisplay => ReachedDate.ToString(FormatKey.DateTimeFormatIn24H, CultureInfo.InvariantCulture);

        public decimal DailyWinningThreshold { get; set; }

        public decimal TotalWinningAmount { get; set; }
    }
}
