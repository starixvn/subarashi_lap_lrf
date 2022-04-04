namespace Fanex.Athena.Model.Auth
{
    using System;
    using System.Runtime.Serialization;

    [DataContract]
    [Serializable]
    public class AuthCurrency
    {
        [DataMember]
        public int[] AgentId { get; set; }

        [DataMember]
        public string Currency { get; set; }

        [DataMember]
        public int CurrencyId { get; set; }
    }
}