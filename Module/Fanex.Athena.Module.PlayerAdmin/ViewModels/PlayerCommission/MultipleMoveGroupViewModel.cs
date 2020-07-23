using System.Collections.Generic;
using System.Linq;
using Fanex.Athena.Module.PlayerAdmin.MetaModel.PlayerCommission;

namespace Fanex.Athena.Module.PlayerAdmin.ViewModels.PlayerCommission
{
    public class MultipleMoveGroupViewModel : BaseUpdateGroupViewModel
    {
        public MultipleMoveGroupViewModel(MultipleMoveGroupQuery query, IEnumerable<PlayerCommissionViewModel> groups) : base(query)
        {
            Groups = groups.ToList();
        }

        public IList<PlayerCommissionViewModel> Groups { get; set; }
    }
}
