// -----------------------------------------------------------------------
// <copyright file="TurnoverDTO.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Service.Core.Attributes;

namespace Fanex.Athena.Model.Report.DTO
{
    /// <summary>
    /// TurnoverDTO class.
    /// </summary>
    public class TurnoverDTO
    {
        public int Index { get; set; }

        public string Date { get; set; }

        public decimal OpeningBalance { get; set; }

        public decimal Deposit { get; set; }

        public decimal Withdrawal { get; set; }

        public decimal Bonus { get; set; }

        public decimal Adjustment { get; set; }

        public decimal Promotion { get; set; }

        public decimal Turnover { get; set; }

        public decimal DrawGame { get; set; }

        public decimal NetTurnover { get; set; }

        public decimal PendingFunds { get; set; }

        [DataPermission(Permission = PermissionKeys.HidePlayerWL_WL_Comm_Total)]
        public decimal WinLoss { get; set; }

        public decimal ClosingBalance { get; set; }

        public decimal AffiliateTransfer { get; set; }

        public decimal Transfer3rd { get; set; }

        public decimal TurnoverBA { get; set; }

        public decimal CommBA { get; set; }

        public decimal AmountDueToBA { get; set; }

        [DataPermission(Permission = PermissionKeys.HidePlayerWL_WL_Comm_Total)]
        public decimal PlayerComm { get; set; }

        public decimal WinLossComm
        {
            get
            {
                return WinLoss + PlayerComm;
            }
        }
    }
}