namespace Fanex.Athena.Model.Customer.DTO.PlayerSegmentation
{
    using System;

    public class PlayerInfo
    {
        public int CustId { get; set; }
        public string ExternalId { get; set; }
        public string SystemId { get; set; }
        public string MarkDate { get; set; }
        public bool IsVip { get; set; }
        public bool IsMarkVoid { get; set; }
    }
}