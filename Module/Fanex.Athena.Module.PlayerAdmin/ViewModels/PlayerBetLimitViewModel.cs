namespace Fanex.Athena.Module.PlayerAdmin.ViewModels
{
    using System.Collections.Generic;
    using Fanex.Athena.Module.PlayerAdmin.DTO;

    public class PlayerBetLimitViewModel
    {
        public bool IsStatusEnable { get; set; }

        public bool StatusEnable { get; set; }

        public bool Editable { get; set; }

        public bool EnableCopy { get; set; }

        public string CopyId { get; set; }

        public IEnumerable<PlayerBetLimit> Data { get; set; }
    }
}