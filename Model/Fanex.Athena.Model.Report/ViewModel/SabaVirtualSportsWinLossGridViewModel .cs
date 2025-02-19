namespace Fanex.Athena.Model.Report.ViewModel
{
    using System;

    public class SabaVirtualSportsWinLossGridViewModel
    {
        public int Index { get; set; }

        public DateTime Date { get; set; }

        public int RowSpan { get; set; }

        public string ExternalId { get; set; }

        public string SystemId { get; set; }

        public int CustomerId { get; set; }

        public string CurrencyName { get; set; }

        public int CurrencyId { get; set; }

        public decimal TotalTransaction { get; set; }

        public decimal CashOutCommission { get; set; }

        #region ICustomerWinLoss Members

        public decimal CustomerWinLoss { get; set; }

        public decimal CustomerComm { get; set; }

        public decimal CustomerTotal
        {
            get
            {
                return CustomerWinLoss + CustomerComm;
            }
        }

        #endregion ICustomerWinLoss Members

        #region ILicenseeWL Members

        public decimal LicenseeWLSB { get; set; }

        public decimal LicenseeWLCO { get; set; }

        public virtual decimal TotalLicenseeWL
        {
            get
            {
                return LicenseeWLSB + LicenseeWLCO;
            }
        }

        public decimal TotalLicenseeWLSingle
        {
            get { return TotalLicenseeWL; }
        }

        #endregion ILicenseeWL Members

        #region ITurnOver Members

        public decimal TurnOverSB { get; set; }

        public virtual decimal TotalTurnOver
        {
            get
            {
                return TurnOverSB;
            }
        }

        public decimal TotalTurnOverSingle
        {
            get { return TotalTurnOver; }
        }

        #endregion ITurnOver Members
    }
}