using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Module.PlayerAdmin.Api.MetaModel
{
    public class BaStatusUpdatingMetaModel : PlayerUpdatingBaseMetaModel, IMetaModelSiteName
    {
        public bool IsBa { get; set; }

        public string SiteName { get; set; }
    }
}