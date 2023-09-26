using System;
using Fanex.Athena.Extension.Helper;

namespace Fanex.Athena.Model.Customer.MetaModel
{
    public class VipPlayerListMetaModel : BasePlayerListMetaModel
    {
        private const int NumberOfVIPOptions = 2;

        public byte VipOption { get; set; }

        public byte IsCheckAll { get; set; }

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

#pragma warning disable S1067 // Expressions should not be too complex
        public override bool IsValid => base.IsValid && (VipOption >= 0 && VipOption <= NumberOfVIPOptions) && (IsCheckAll != 0 || FromDate <= ToDate);
#pragma warning restore S1067 // Expressions should not be too complex
    }
}