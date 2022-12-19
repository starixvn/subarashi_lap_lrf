using System.Collections.Generic;
using Fanex.Athena.Model.Core.DTO.Common;
using Newtonsoft.Json;

namespace Fanex.Athena.Model.Customer.DTO.PlayerSegmentation
{
    public class SabaVirtualPlayer : PlayerInfo
    {
        public int SoccerLevel { get; set; }

        public int BasketballLevel { get; set; }
    }
}