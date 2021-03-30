namespace Fanex.Athena.Model.Customer.DTO
{
    public class CustomerClassLimitPolicyModel
    {
        public string Id { get; set; }
        public int LiveType { get; set; }

        public string SportType { get; set; }
        public string SportTypeName { get; set; }

        public string LeagueGroupId { get; set; }
        public string BetDelay { get; set; }
        public string BetInterval { get; set; }
        public string MaxBet { get; set; }
        public string MaxPerMatch { get; set; }

        public string RepeatedBets { get; set; }

        public string MinBet { get; set; }
        public string Platform { get; set; }

        public string AgentBetInterval { get; set; }
        public int CurrencyId { get; set; }
        public string Currency { get; set; }
        public string OddsGroup { get; set; }
    }
}
