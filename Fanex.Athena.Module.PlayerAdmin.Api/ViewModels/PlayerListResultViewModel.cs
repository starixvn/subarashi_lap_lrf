using Fanex.Athena.Module.PlayerAdmin.Api.DTO;
using System.Collections.Generic;

namespace Fanex.Athena.Module.PlayerAdmin.Api.ViewModels
{
    public class PlayerListResultViewModel
    {
        public IEnumerable<Player> DataList { get; set; }

        public int TotalItem { get; set; }
    }
}