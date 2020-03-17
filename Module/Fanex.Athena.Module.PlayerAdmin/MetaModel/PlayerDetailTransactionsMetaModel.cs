namespace Fanex.Athena.Module.PlayerAdmin.MetaModel
{
    using System;
    using Fanex.Athena.Model.Core.MetaModel;
    using Fanex.Data;

    public class PlayerDetailTransactionsMetaModel : IMetalModelCustomerIdentity, IMetaModelValidation
    {
        private const int MaximumMonth = 3;

        public int CustId { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public int CurrencyId { get; set; }

        public int? PageSize { get; set; }

        public int? PageIndex { get; set; }

        public DateTime MinDate => DateTime.Now.AddMonths(-MaximumMonth);

        public bool IsValid => ToDate >= FromDate
            && FromDate >= ToDate.AddMonths(-MaximumMonth);

        public string GetSPName() => "LAP_Rpt_DetailTransaction_Mem";

        public void SetParameterValues(IObjectDb db)
        {
            db.SetParameterValue("CustId", CustId);
            db.SetParameterValue("FromDate", FromDate);
            db.SetParameterValue("ToDate", ToDate);
            db.SetParameterValue("PageSize", PageSize);
            db.SetParameterValue("PageIndex", PageIndex);
            db.SetParameterValue("TotalRow", 0);
        }
    }
}
