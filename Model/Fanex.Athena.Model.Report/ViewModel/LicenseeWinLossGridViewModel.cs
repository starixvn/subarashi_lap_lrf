// -----------------------------------------------------------------------
// <copyright file="LicenseeWinLossGridViewModel.cs" company="">
// LicenseeWinLossGridViewModel copyright.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Model.Report.ViewModel
{
    using System;

    public class LicenseeWinLossGridViewModel
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

        public decimal BACommission { get; set; }

        public decimal BetTradeCommission { get; set; }

        public decimal AmtDueToBA { get; set; }

        public decimal AmtDueToBetTrade { get; set; }

        public decimal BuyBackAmountSB { get; set; }

        public decimal BuyBackAmountBA { get; set; }

        public decimal TotalBuyBackAmount { get; set; }

        public decimal TotalBuyBackAmountSingle
        {
            get
            {
                return TotalBuyBackAmount;
            }
        }

        public decimal ActualStake { get; set; }

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

        public decimal LicenseeWLNG { get; set; }

        public decimal LicenseeWLBA { get; set; }

        public decimal LicenseeWLVS { get; set; }

        public decimal LicenseeWLCS { get; set; }

        public decimal LicenseeWLKN { get; set; }

        public decimal LicenseeWLBT { get; set; }

        public decimal LicenseeWLAGC { get; set; }

        public decimal LicenseeWLVB { get; set; }

        public decimal LicenseeWLAB { get; set; }

        public decimal LicenseeWLFW { get; set; }

        public decimal LicenseeWLCO { get; set; }

        public decimal LicenseeWLVS2 { get; set; }

        public decimal LicenseeWLLT { get; set; }

        public decimal LicenseeWLPP { get; set; }

        public decimal LicenseeWLCC { get; set; }

        public decimal LicenseeWLSG { get; set; }

        public decimal LicenseeWLVRG { get; set; }

        public decimal LicenseeWLSAG { get; set; }

        public decimal LicenseeWLTG { get; set; }

        public decimal LicenseeWLI4D { get; set; }

        public decimal LicenseeWLSXG { get; set; }

        public decimal LicenseeWLSBC { get; set; }

        public decimal LicenseeWLPGS { get; set; }

        public decimal LicenseeWLJK { get; set; }

        public decimal LicenseeWLGDG { get; set; }

        public decimal LicenseeWLBGG { get; set; }

        public decimal LicenseeWLHB { get; set; }

        public decimal LicenseeWLWM { get; set; }

        public decimal LicenseeWLVGA { get; set; }

        public decimal LicenseeWLCG { get; set; }

        public decimal LicenseeWLAP { get; set; }

        public decimal LicenseeWLAPM { get; set; }

        public decimal LicenseeWLVS3 { get; set; }

        public decimal LicenseeWLFGGL { get; set; }
        
        public decimal LicenseeWLMXG { get; set; }

        public virtual decimal TotalLicenseeWL
        {
            get
            {
                return LicenseeWLBA + LicenseeWLNG + LicenseeWLSB + LicenseeWLVS + LicenseeWLCS +
                    LicenseeWLKN + LicenseeWLBT + LicenseeWLAGC + LicenseeWLVB + LicenseeWLAB +
                    LicenseeWLFW + LicenseeWLCO + LicenseeWLVS2 + LicenseeWLLT + LicenseeWLPP +
                    LicenseeWLCC + LicenseeWLSG + LicenseeWLVRG + LicenseeWLTG + LicenseeWLI4D +
                    LicenseeWLSXG + LicenseeWLSBC + LicenseeWLSAG + LicenseeWLPGS + LicenseeWLJK +
                    LicenseeWLGDG + LicenseeWLHB + LicenseeWLWM + LicenseeWLBGG + LicenseeWLVGA +
                    LicenseeWLCG + LicenseeWLAP + LicenseeWLAPM + LicenseeWLVS3 + LicenseeWLFGGL +
                    LicenseeWLMXG;
            }
        }

        public decimal TotalLicenseeWLSingle
        {
            get { return TotalLicenseeWL; }
        }

        #endregion ILicenseeWL Members

        #region ITurnOver Members

        public decimal TurnOverSB { get; set; }

        public decimal TurnOverNG { get; set; }

        public decimal TurnOverBA { get; set; }

        public decimal TurnOverVS { get; set; }

        public decimal TurnOverCS { get; set; }

        public decimal TurnOverKN { get; set; }

        public decimal TurnOverBT { get; set; }

        public decimal TurnOverAGC { get; set; }

        public decimal TurnOverVB { get; set; }

        public decimal TurnOverAB { get; set; }

        public decimal TurnOverFW { get; set; }

        public decimal TurnOverVS2 { get; set; }

        public decimal TurnOverLT { get; set; }

        public decimal TurnOverPP { get; set; }

        public decimal TurnOverCC { get; set; }

        public decimal TurnOverSG { get; set; }

        public decimal TurnOverVRG { get; set; }

        public decimal TurnOverTG { get; set; }

        public decimal TurnOverSAG { get; set; }

        public decimal TurnOverI4D { get; set; }

        public decimal TurnOverSXG { get; set; }

        public decimal TurnOverSBC { get; set; }

        public decimal TurnOverPGS { get; set; }

        public decimal TurnOverJK { get; set; }

        public decimal TurnOverGDG { get; set; }

        public decimal TurnOverBGG { get; set; }

        public decimal TurnOverHB { get; set; }

        public decimal TurnOverWM { get; set; }

        public decimal TurnOverVGA { get; set; }

        public decimal TurnOverCG { get; set; }

        public decimal TurnOverAP { get; set; }

        public decimal TurnOverAPM { get; set; }

        public decimal TurnOverVS3 { get; set; }

        public decimal TurnOverFGGL { get; set; }
        
        public decimal TurnOverMXG { get; set; }

        public virtual decimal TotalTurnOver
        {
            get
            {
                return TurnOverBA + TurnOverNG + TurnOverSB + TurnOverVS + TurnOverCS +
                    TurnOverKN + TurnOverBT + TurnOverAGC + TurnOverVB + TurnOverAB +
                    TurnOverFW + TurnOverVS2 + TurnOverLT + TurnOverPP + TurnOverCC +
                    TurnOverSG + TurnOverVRG + TurnOverTG + TurnOverI4D + TurnOverSXG +
                    TurnOverSBC + TurnOverSAG + TurnOverPGS + TurnOverJK + TurnOverGDG +
                    TurnOverHB + TurnOverWM + TurnOverBGG + TurnOverVGA + TurnOverCG +
                    TurnOverAP + TurnOverAPM + TurnOverVS3 + TurnOverFGGL + TurnOverMXG;
            }
        }

        public decimal TotalTurnOverSingle
        {
            get { return TotalTurnOver; }
        }

        #endregion ITurnOver Members
    }
}