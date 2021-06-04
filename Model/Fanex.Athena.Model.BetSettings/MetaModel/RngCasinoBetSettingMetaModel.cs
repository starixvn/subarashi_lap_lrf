namespace Fanex.Athena.Model.BetSettings.MetaModel
{
    using System.Collections.Generic;
    using Customer.MetaModel;

    public class RngCasinoBetSettingMetaModel : CustomerStatusMetaModel
    {
        public IDictionary<string, string> StackLevelParam { get; set; }

        public string CustIds { get; set; }
    }
}
