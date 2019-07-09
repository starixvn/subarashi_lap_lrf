using Fanex.Athena.Module.PlayerAdmin.DTO;
using System.Collections.Generic;

namespace Fanex.Athena.Module.PlayerAdmin.ViewModels
{
    public class PlayerQueryResultViewModel
    {
        public IEnumerable<Player> DataList { get; set; }

        public int TotalItem { get; set; }
    }
}