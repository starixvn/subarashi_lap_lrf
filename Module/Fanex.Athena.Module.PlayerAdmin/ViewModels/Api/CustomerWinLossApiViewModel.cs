using System.Collections.Generic;
using Fanex.Athena.Module.PlayerAdmin.DTO;

namespace Fanex.Athena.Module.PlayerAdmin.ViewModels.Api
{
    public class CustomerWinLossApiViewModel
    {
        public IEnumerable<PlayerWinLoss> DataList { get; set; }
    }
}