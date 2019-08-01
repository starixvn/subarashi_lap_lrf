using System.Collections.Generic;

namespace Fanex.Athena.Model.BetSettings.MetaModel
{
    public class BetSettingCasinoStatusMetaModel : CoreCasinoStatusMetaModel
    {
        public IDictionary<int, int[]> currencyAgents { get; set; }

        public string UserName { get; set; }

        public bool IsSyncCasino { get; set; }
    }
}