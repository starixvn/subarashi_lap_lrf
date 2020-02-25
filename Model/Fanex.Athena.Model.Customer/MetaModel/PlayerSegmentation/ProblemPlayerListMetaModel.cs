namespace Fanex.Athena.Model.Customer.MetaModel
{
    using System;

    public class ProblemPlayerListMetaModel : BasePlayerListMetaModel
    {
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public bool IsGetAll { get; set; }

        public override bool IsValid => IsGetAll || FromDate <= ToDate;
    }
}