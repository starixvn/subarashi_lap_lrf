namespace Fanex.Athena.Model.Core.MetaModel.Common
{
    using System;
    using Extension.Helper;

    public class GetMatchMetaModel : IMetaModelAgent
    {
        private DateTime _fromDate;

        private DateTime _toDate;

        public int SportId { get; set; }

        public int LeagueId { get; set; }

        public DateTime FromDate
        {
            get => _fromDate;

            set => _fromDate = DateTimeHelper.ToBeginOfTheDay(value);
        }

        public DateTime ToDate
        {
            get => _toDate;

            set => _toDate = DateTimeHelper.ToEndOfTheDay(value);
        }

        public string AgentListXml { get; set; }

        public bool IsExcludedTestData { get; set; }
    }
}