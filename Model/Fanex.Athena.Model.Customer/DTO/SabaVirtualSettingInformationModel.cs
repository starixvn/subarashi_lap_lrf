namespace Fanex.Athena.Model.Customer.DTO
{
    public class SabaVirtualSettingInformationModel
    {
        private const string DefaultTextNull = "-";
        private const string DefaultTextNumberNull = "0";

        public int Id { get; set; }
        public string DangerLevel { get; set; }
        public string SportType { get; set; }
        public string SportTypeName { get; set; }

        public bool ApplyParlay { get; set; }

        public int LeagueGroupId { get; set; }
        public int LicLeagueGroupId { get; set; }
        public string LicLeagueGroupName { get; set; }

        private string betDelay;

        public string BetDelay
        {
            get => betDelay == DefaultTextNumberNull || string.IsNullOrEmpty(betDelay) ? DefaultTextNull : betDelay;
            set => betDelay = value;
        }

        private string nextBetInterval;

        public string NextBetInterval
        {
            get => nextBetInterval == DefaultTextNumberNull || string.IsNullOrEmpty(nextBetInterval) ? DefaultTextNull : nextBetInterval;
            set => nextBetInterval = value;
        }

        private string maxPerMatch;

        public string MaxPerMatch
        {
            get => maxPerMatch == DefaultTextNumberNull || string.IsNullOrEmpty(maxPerMatch) ? DefaultTextNull : maxPerMatch;
            set => maxPerMatch = value;
        }
    }
}