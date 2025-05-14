using System.Collections.Generic;
using Fanex.Athena.Model.Customer.MetaModel;
using Fanex.Athena.Model.Core.Helper;

namespace Fanex.Athena.Model.Customer.ViewModel.CommissionGroupList
{
    public class CommissionGroupListViewModel
    {
        public CommissionGroupListViewModel(IList<GroupCommMetaModel> groups, IEnumerable<string> productList)
        {
            Groups = groups;

            ProductList = new Dictionary<string, string>();
            foreach (var product in productList)
            {
                ProductList[product] = ProductHelper.GetProductName(product);
            }
        }

        public IList<GroupCommMetaModel> Groups { get; set; }

        public IDictionary<string, string> ProductList { get; set; }
    }
}