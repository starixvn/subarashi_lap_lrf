using System;

namespace Fanex.Athena.Model.Auth
{
    [Serializable]
    public class AuditCurrency
    {
        public string Name { get; set; }

        public string HardCodeName { get; set; }
    }
}