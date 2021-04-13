using Fanex.Athena.Module.PlayerAdmin.MetaModel.PlayerBatchUpdate;

namespace Fanex.Athena.Module.PlayerAdmin.ViewModels.PlayerBatchUpdate
{
    public class UpdateOddsGroupViewModel : BasePlayerBatchUpdateViewModel
    {
        public UpdateOddsGroupViewModel(BasePlayerBatchUpdateQuery query) : base(query)
        {
        }

        public string[] OddsGroupList { get; } = new[] { "A", "B", "C", "D", "E", "F" };
    }
}
