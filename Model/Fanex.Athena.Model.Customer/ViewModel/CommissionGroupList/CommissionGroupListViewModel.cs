using System.Collections.Generic;
using Fanex.Athena.Model.Customer.MetaModel;

namespace Fanex.Athena.Model.Customer.ViewModel.CommissionGroupList
{
    public class CommissionGroupListViewModel
    {
        public CommissionGroupListViewModel(IList<GroupCommMetaModel> groups, IDictionary<string, bool> productPermissions)
        {
            Groups = groups;
            ProductPermissions = productPermissions;
        }

        public IList<GroupCommMetaModel> Groups { get; set; }

        public IDictionary<string, bool> ProductPermissions { get; }
    }
}