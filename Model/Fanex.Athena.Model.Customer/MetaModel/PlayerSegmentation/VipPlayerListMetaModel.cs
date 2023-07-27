using System;

namespace Fanex.Athena.Model.Customer.MetaModel
{
    public class VipPlayerListMetaModel : BasePlayerListMetaModel
    {
        private const int NumberOfVIPOptions = 2;

        public byte VipOption { get; set; }

        public byte IsCheckAll { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public override bool IsValid => base.IsValid && (VipOption >= 0 && VipOption <= NumberOfVIPOptions);
    }
}