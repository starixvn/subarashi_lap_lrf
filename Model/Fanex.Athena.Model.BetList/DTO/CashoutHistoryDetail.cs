namespace Fanex.Athena.Model.BetList.DTO
{
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Resources;
    using System;
    using System.Collections.Generic;

    public class CashoutHistoryDetail
    {
        public CashoutHistoryDetail(DateTime changeTime, decimal amount, string actionId)
        {
            ChangeTime = changeTime;
            CashoutAmount = amount;
            ActionId = actionId;
        }

        public DateTime ChangeTime { get; set; }

        public string ChangeTimeText => ChangeTime.ToString(FormatKey.ShortDateTimeFormat);

        public decimal CashoutAmount { get; set; }

        public string CashoutAmountText => CashoutAmount.ToString(FormatKey.DecimalFormat);

        public string ActionId { get; set; }

        public string ActionName

        {
            get
            {
                var actionList = new Dictionary<string, string>
                {
                    { "1", ViewResources.ProductCO },
                    { "6", ViewResources.CashOutCancelled },
                    { "8", ViewResources.CashOutRecovered }
                };

                return actionList.ContainsKey(ActionId) ? actionList[ActionId] : ActionId;
            }
        }
    }
}