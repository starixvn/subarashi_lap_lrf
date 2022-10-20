using Fanex.Athena.Extension.Helper;
using Fanex.Athena.Model.Core.MetaModel;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;

namespace Fanex.Athena.Model.Customer.MetaModel
{
    public class BatchUpdateMonitoredPlayerMetaModel : IMetaModelValidation, IMetaModelAgent, IMetaModelUserId, IMetaModelIp
    {
        const int MaxBatchPlayer = 2000;

        public IEnumerable<UpdateMonitoredPlayerItem> BatchPlayer { get; set; }

        [JsonIgnore]
        public string BatchPlayerXml { get; set; }

        public string AgentListXml { get; set; }
        public bool IsExcludedTestData { get; set; }

        public int UserId { get; set; }
        public string Ip { get; set; }

        public bool IsValid => BatchPlayer.IsPresent() && BatchPlayer.Count() <= MaxBatchPlayer;
    }


    public class UpdateMonitoredPlayerItem
    {
        public string ExternalId { get; set; }
        public string SystemId { get; set; }
        public decimal WinningThreshold { get; set; }
    } 
}
