// -----------------------------------------------------------------------
namespace Fanex.Athena.Model.Report.ViewModel
{
    public class SpecialLicenseeWinLossGridViewModel : LicenseeWinLossGridViewModel
    {
        public decimal LicenseeWLLC { get; set; }

        public decimal TurnOverLC { get; set; }

        public override decimal TotalLicenseeWL => base.TotalLicenseeWL + LicenseeWLLC;

        public override decimal TotalTurnOver => base.TotalTurnOver + TurnOverLC;

        public long Ticks
        {
            get
            {
                return Date.Ticks;
            }
        }
    }
}