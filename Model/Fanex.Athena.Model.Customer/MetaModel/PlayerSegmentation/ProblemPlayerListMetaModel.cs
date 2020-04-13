namespace Fanex.Athena.Model.Customer.MetaModel
{
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Model.Core.MetaModel;
    using System;

    public class ProblemPlayerListMetaModel : BasePlayerListMetaModel, IMetaModelLanguage
    {
        private DateTime _fromDate;

        public DateTime FromDate
        {
            get
            {
                return _fromDate;
            }
            set
            {
                _fromDate = DateTimeHelper.ToBeginOfTheDay(value);
            }
        }

        private DateTime _toDate;

        public DateTime ToDate
        {
            get
            {
                return _toDate;
            }
            set
            {
                _toDate = DateTimeHelper.ToEndOfTheDay(value);
            }
        }

        public bool IsGetAll { get; set; }

        private string _baseCurrency;

        public string BaseCurrency
        {
            get
            {
                return _baseCurrency ?? string.Empty;
            }

            set
            {
                _baseCurrency = value == null
                    ? string.Empty
                    : value.ToLowerInvariant();
            }
        }

        public string Language { get; set; }

        public string ReasonGroupIdList { get; set; }

        public override bool IsValid => IsGetAll || FromDate <= ToDate;
    }
}