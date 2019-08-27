namespace Fanex.Athena.Module.PlayerAdmin.MetaModel
{
    using Fanex.Athena.Model.Core.MetaModel;

    public class PlayerBetLimitItemMetaModel
    {
        public string SportId { get; set; }

        public int BetType { get; set; }

        public decimal MinBet { get; set; }

        public decimal MaxBet { get; set; }

        public decimal MaxPerMatch { get; set; }

        public decimal MaxPerBall { get; set; }

        public bool IsUpdated { get; set; }
    }
}
