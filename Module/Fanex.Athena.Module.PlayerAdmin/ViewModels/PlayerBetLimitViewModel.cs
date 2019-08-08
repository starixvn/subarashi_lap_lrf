namespace Fanex.Athena.Module.PlayerAdmin.ViewModels
{
    using System.Collections.Generic;

    public class PlayerBetLimitViewModel
    {
        public int CustId { get; set; }

        public int ProductId { get; set; }

        public IDictionary<int, string> ProductList { get; set; }
    }
}
