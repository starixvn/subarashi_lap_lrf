using System.Collections.Generic;
using Fanex.Athena.Model.Customer.MetaModel;

namespace Fanex.Athena.Model.Customer.ViewModel.CommissionGroupList
{
    public class CommissionGroupListViewModel
    {
        public CommissionGroupListViewModel(IList<GroupCommMetaModel> groups, IEnumerable<string> productList)
        {
            Groups = groups;
            ProductList = productList;
        }

        public IList<GroupCommMetaModel> Groups { get; set; }

        public IEnumerable<string> ProductList { get; set; }
    }
}