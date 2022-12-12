namespace Fanex.Athena.Model.Customer.MetaModel
{
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Model.Core.MetaModel;
    using System;

    public class SabaVirtualPlayerListMetaModel : BasePlayerListMetaModel, IMetaModelLanguage
    {
        private const int MaxPageSize = 3000;

        public SabaVirtualPlayerListMetaModel() : base(MaxPageSize)
        {
        }

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

        public string Language { get; set; }

        public string SportIdList { get; set; }

        public string LevelIdList { get; set; }

        public override bool IsValid => base.IsValid && (IsGetAll || FromDate <= ToDate);
    }
}