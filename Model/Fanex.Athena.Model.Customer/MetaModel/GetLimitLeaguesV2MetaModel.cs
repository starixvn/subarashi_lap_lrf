namespace Fanex.Athena.Model.Customer.MetaModel
{
    public class GetLimitLeaguesV2MetaModel
    {
        public int SportType { get; set; }

        public string LeagueGroupId { get; set; }

        public string LeagueGroupName { get; set; }

        public bool IsHideSaba { get; set; }

        public string LangCode { get; set; }
    }
}