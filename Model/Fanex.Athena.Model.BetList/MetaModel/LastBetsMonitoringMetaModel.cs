using System.Collections.Generic;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Core.Helper;
using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Model.Customer.DTO;

namespace Fanex.Athena.Model.BetList.MetaModel
{
    public class LastBetsMonitoringMetaModel : IMetaModelValidation, IMetaModelShowBetFromIP, IMetaModelProductCodeList
    {
        private const int DefaultPageSize = 10;

        public LastBetsMonitoringMetaModel()
        {
            PageSize = DefaultPageSize;
        }

        public long TransLogId { get; set; }

        public string SportIds { get; set; }

        public string SportTypeList { get; set; }

        public string LeagueList { get; set; }

        public string CustomerClass { get; set; }

        public int MatchId { get; set; }

        public string BetType { get; set; }

        public string Level { get; set; }

        public int LiveStatus { get; set; }

        public string OddsType { get; set; }

        public int TimeZone { get; set; }

        public string Currency { get; set; }

        public string BasedCurrency { get; set; }

        public int StakeFrom { get; set; }

        public int StakeTo { get; set; }

        public int PageSize { get; set; }

        public long TransId { get; set; }

        public string BetFrom { get; set; }

        public string AgentListXml { get; set; }

        public bool IsShowIpvn { get; set; }

        public bool IsShowIp { get; set; }

        public int SpecialPlatform { get; set; }

        public string ProductCodeList { get; set; } = Product.SB;

        public string OriginalProductCodeList { get; set; }

        public IEnumerable<RiskLevel> RiskLevels { get; set; }

        public bool IsValid => MetaModelHelper.ValidateBaseCurrency(BasedCurrency);
    }
}