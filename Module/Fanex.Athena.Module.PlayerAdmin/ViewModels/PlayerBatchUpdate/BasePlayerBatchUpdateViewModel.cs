using Fanex.Athena.Module.PlayerAdmin.MetaModel.PlayerBatchUpdate;

namespace Fanex.Athena.Module.PlayerAdmin.ViewModels.PlayerBatchUpdate
{
    public class BasePlayerBatchUpdateViewModel
    {
        public BasePlayerBatchUpdateViewModel(BasePlayerBatchUpdateQuery query)
        {
            CustIdsStr = query.CustIds ?? string.Empty;
            CustNamesStr = query.CustNames ?? string.Empty;
            CustIds = CustIdsStr.Split(',');
            CustNames = CustNamesStr.Split(',');
        }

        public string[] CustIds { get; set; }

        public string[] CustNames { get; set; }

        public string CustIdsStr { get; set; }

        public string CustNamesStr { get; set; }
    }
}
