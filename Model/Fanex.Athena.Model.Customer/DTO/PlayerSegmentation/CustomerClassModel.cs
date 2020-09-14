namespace Fanex.Athena.Model.Customer.DTO.PlayerSegmentation
{
    public class CustomerClassModel
    {
        public string CustomerClass { get; set; }
        public int LiveType { get; set; }

        public string SportType { get; set; }
        public string SportTypeName { get; set; }

        public string LeagueGroupId { get; set; }
        public string BetDelay { get; set; }
        public string BetInterval { get; set; }
        public string MaxBet { get; set; }
        public string MaxPerMatch { get; set; }
    }
}
