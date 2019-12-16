using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Model.BetList.MetaModel
{
    public class AdvancedSearchBetListMetaModel : BaseBettingTicketMetaModel, IMetaModelValidation
    {
        public string LiveStatus { get; set; }

        public int SportId { get; set; }

        public int BetTypeId { get; set; }

        public int LeagueId { get; set; }

        public int MatchId { get; set; }

        public override bool IsValid
        {
            get
            {
                if (FromDate.Date != ToDate.Date && (BetTypeId == 0 || LeagueId != 0 || MatchId != 0))
                {
                    return false;
                }

                return base.IsValid;
            }
        }
    }
}