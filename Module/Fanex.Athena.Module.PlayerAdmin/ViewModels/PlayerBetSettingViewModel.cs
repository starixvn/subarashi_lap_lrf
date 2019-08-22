namespace Fanex.Athena.Module.PlayerAdmin.ViewModels
{
    using System.Collections.Generic;
    using Fanex.Athena.Module.PlayerAdmin.DTO;

    public class PlayerBetSettingViewModel<T> where T : PlayerBetLimit
    {
        public bool Editable { get; set; }

        public IEnumerable<T> Data { get; set; }
    }
}
