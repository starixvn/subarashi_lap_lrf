namespace Fanex.Athena.Module.PlayerAdmin.DTO
{
    using System.Collections.Generic;
    using Fanex.Athena.Module.PlayerAdmin.DTO.BetLimits;

    public class AgCasinoGame
    {
        public string GameType { get; set; }

        public string Name { get; set; }

        public IList<AgCasinoGroup> Groups { get; set; }
    }
}
