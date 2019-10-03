namespace Fanex.Athena.Module.PlayerAdmin.MetaModel
{
    public class PlayerBetLimitMetaModel
    {
        public string Id { get; set; }

        public int BetType { get; set; }

        public decimal MinBet { get; set; }

        public decimal MaxBet { get; set; }

        public decimal MaxPerMatch { get; set; }

        public decimal MaxPerBall { get; set; }

        public bool IsUpdated { get; set; }
    }
}
