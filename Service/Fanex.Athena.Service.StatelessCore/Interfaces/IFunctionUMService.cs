using Fanex.Athena.Model.Core.Enum;

namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    public interface IFunctionUMService
    {
        (bool isUM, string timeFrom, string timeTo) GetUnderMaintenanceInfo(FunctionUMType functionUMType);
    }
}
