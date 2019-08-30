using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Module.PlayerAdmin.Api.MetaModel
{
    public class PlayerActivityRecordMetaModel : IMetaModelSiteName
    {
        public int IbcCustId { get; set; }

        public string SiteName { get; set; }
    }
}