using Fanex.Athena.Model.Customer.MetaModel;
using System.Collections.Generic;

namespace Fanex.Athena.Model.Customer.ViewModel.CommissionGroupList
{
    public class CommissionGroupListViewModel
    {
        public CommissionGroupListViewModel(
            IList<GroupCommMetaModel> groups,
            IDictionary<string, string> productList)
        {
            Groups = groups;
            ProductList = productList;
        }

        public IList<GroupCommMetaModel> Groups { get; set; }

        public IDictionary<string, string> ProductList { get; set; }
    }
}