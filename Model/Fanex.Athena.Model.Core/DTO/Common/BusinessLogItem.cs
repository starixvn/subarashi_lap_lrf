namespace Fanex.Athena.Model.Core.DTO.Common
{
    public class BusinessLogItem
    {
        public int UserId { get; set; }

        public int ActionID { get; set; }

        public string LogData { get; set; }

        public byte Duration { get; set; }

        public byte TypeId { get; set; }
    }
}