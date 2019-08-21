namespace Fanex.Athena.Module.PlayerAdmin.DTO
{
    public class PlayerBetSetting
    {
        public string Id { get; set; }

        public decimal MinBet { get; set; }

        public decimal MaxBet { get; set; }

        public decimal MaxPerMatch { get; set; }

        public decimal MaxPerMatchMax { get; set; }

        public decimal MaxPerMatchMin { get; set; }

        public decimal BetValueMax { get; set; }

        public decimal BetValueMin { get; set; }
    }
}
