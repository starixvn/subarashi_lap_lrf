using System;

namespace Fanex.Athena.Model.Core.DTO.Users
{
    public class UserLog
    {
        public int CustID { get; set; }

        public int UserID { get; set; }

        public int TypeID { get; set; }

        public int ActionID { get; set; }

        public string Doing { get; set; }

        public int Duration { get; set; }

        public int LogID { get; set; }

        public DateTime LogDate { get; set; }
    }
}