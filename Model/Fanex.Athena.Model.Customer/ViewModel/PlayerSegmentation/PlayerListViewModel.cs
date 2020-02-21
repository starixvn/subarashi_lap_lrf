namespace Fanex.Athena.Model.Customer.ViewModel
{
    using System.Collections.Generic;

    public class PlayerListViewModel<T>
        where T : PlayerViewModel
    {
        public IEnumerable<T> Data { get; set; }
        public int TotalItems { get; set; }
        public int PageSize { get; set; }
        public int PageIndex { get; set; }
    }
}