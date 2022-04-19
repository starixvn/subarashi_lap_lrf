using Fanex.Athena.Model.Core.Enum;

namespace Fanex.Athena.Model.Core.DTO.Configuration
{
    public class FunctionUMSetting
    {
        public FunctionUMType Type { get; set; }
        public bool IsUM { get; set; }
        public string TimeFrom { get; set; }
        public string TimeTo { get; set; }
    }
}
