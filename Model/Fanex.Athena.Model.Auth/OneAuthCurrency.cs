namespace Fanex.Athena.Model.Auth
{
    using System;

    [Serializable]
    public class OneAuthCurrency
    {
        public int[] AgentId { get; set; }

        public string Currency { get; set; }

        public int CurrencyId { get; set; }
    }
}